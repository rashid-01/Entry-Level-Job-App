import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import images from '../Assets';

const ONE_DAY_MS = 24 * 3600 * 1000;

function getMDY(ts) {
	return ts.toDateString().split(' ').slice(0, 3).join(' ');
}

function makeDate(timestamp) {
	const date = new Date(timestamp);
	const dateStr = getMDY(date);
	const todayStr = getMDY(new Date());
	const yesterdayStr = getMDY(new Date(Date.now() - ONE_DAY_MS));
	if (dateStr === todayStr) {
		return 'today';
	} else if (dateStr === yesterdayStr) {
		return 'yesterday';
	} else {
		return dateStr;
	}
}

export default function Job({ jobList, onClick }) {
	return (
		<Paper onClick={onClick} className={'job'}>
			<div style={{ padding: 20 }}>
				<img style={{ height: 40, width: 40 }} src={images.reactjs} />
			</div>
			<div className={'flex8'}>
				<Typography variant="h6">{jobList.title}</Typography>
				<Typography variant="h5">{jobList.company}</Typography>
				<Typography>{jobList.location}</Typography>
			</div>
			<div className={'flex1'}>
				<Typography>{makeDate(jobList.created_at)}</Typography>
			</div>
		</Paper>
	);
}
