var fetch = require('node-fetch');
var redis = require('redis');
client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json?description=javascript&location=noida';

async function fetchGithub() {
	let resultCount = 1,
		onPage = 0;
	const allJobs = [];
	//fetch all pages
	while (resultCount > 0) {
		const response = await fetch(`${baseUrl}?page=${onPage}`);
		const jobs = await response.json();
		allJobs.push(...jobs);
		resultCount = jobs.length;

		onPage++;
	}
	//Filter algo
	const jrJobs = allJobs.filter((job) => {
		const jobTitle = job.title.toLowerCase();
		if (
			jobTitle.includes('senior') ||
			jobTitle.includes('manager') ||
			jobTitle.includes('sr.') ||
			jobTitle.includes('architect')
		) {
			return false;
		}
		return true;
	});
	console.log('Jr Jobs', allJobs.length);
	//set in redis
	const success = await setAsync('github', JSON.stringify(allJobs));
	console.log('success', success);
}
module.exports = fetchGithub;
