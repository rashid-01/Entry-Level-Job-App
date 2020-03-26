import React, { useEffect, useState } from 'react';
import './App.css';
import Jobs from './Jobs/Jobs';
import Header from './Components/Header';

const JOB_API_URL = 'http://localhost:3001/jobs';

async function fetchJobs(updateCallBack) {
	try {
		const res = await fetch(JOB_API_URL);
		const jsonRes = await res.json();
		updateCallBack(jsonRes);
	} catch (error) {
		console.log('eeer', error);
	}
}

function App() {
	const [ jobList, updateJobs ] = useState([]);
	useEffect(() => {
		fetchJobs(updateJobs);
	}, []);
	return (
		<div className="App">
			<Jobs workerJobs={jobList} />
		</div>
	);
}

export default App;
