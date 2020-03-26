import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Job from '../Job/Job';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import JobModal from '../JobModal/JobModal';

export default function Jobs({ workerJobs }) {
	const [ activeStep, setActiveStep ] = useState(0);
	const [ selectedJob, setSelectedJob ] = useState({});
	const numJobs = workerJobs.length;
	const numPages = Math.ceil(numJobs / 50);
	const jobsOnPage = workerJobs.slice(activeStep * 50, activeStep * 50 + 50);
	// console.log('jobsss', jobsOnPage);
	const filteredJobs = jobsOnPage.map((item) => {
		return { title: item.title.split(' ') };
	});
	console.log('filtered jobs', filteredJobs);
	const theme = useTheme();

	React.useEffect(() => {
		const welcomeItem = document.querySelectorAll('.welcome-item');
		let delay = 0;
		welcomeItem.forEach((item) => {
			setTimeout(() => (item.style.opacity = 1), delay);
			delay += 500;
		});
	}, []);

	function scrollToTop() {
		const c = document.documentElement.scrollTop || document.body.scrollTop;
		if (c > 0) {
			window.requestAnimationFrame(scrollToTop);
			window.scrollTo(0, c - c / 8);
		}
	}

	//pagination
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		scrollToTop();
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		scrollToTop();
	};
	const [ open, setOpen ] = React.useState(false);
	//Modal
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={'body'}>
			<JobModal open={open} job={selectedJob} handleClose={handleClose} />
			<Typography
				variant="h4"
				style={{ justifyContent: 'center', alignItems: 'center' }}
				component="h1"
				className={'font'}
			>
				Entry Level Software Jobs
			</Typography>
			<Typography className={'font'} variant="h6" component="h2">
				Found {numJobs} Jobs
			</Typography>
			{jobsOnPage.map((item, i) => {
				return (
					<Job
						key={i}
						jobList={item}
						onClick={() => {
							handleClickOpen();
							setSelectedJob(item);
						}}
					/>
				);
			})}
			<div>
				Pages {activeStep + 1} of {numPages}
			</div>
			<div style={{ width: '81.5%' }}>
				<MobileStepper
					style={{ borderRadius: 5 }}
					variant="progress"
					steps={numPages}
					position="static"
					activeStep={activeStep}
					nextButton={
						<Button size="small" onClick={handleNext} disabled={activeStep === 5}>
							Next
							{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
						</Button>
					}
					backButton={
						<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
							{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
							Back
						</Button>
					}
				/>
			</div>
		</div>
	);
}
