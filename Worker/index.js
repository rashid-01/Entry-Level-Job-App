var CronJob = require('cron').CronJob;
const fetchGithub = require('./Tasks/fetch-github');
new CronJob('* * * * *', fetchGithub, null, true, 'India');
