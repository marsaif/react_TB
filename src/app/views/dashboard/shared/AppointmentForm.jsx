import React, {useState} from 'react';
import {Slide, toast, ToastContainer} from 'react-toastify';
import isWeekend from 'date-fns/isWeekend';
import './appointment.css';
import 'react-toastify/dist/ReactToastify.css';

import {Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField,} from '@mui/material';


import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';


export default function AppointmentForm(props) {
	//open and close time
	const openTime = [9, 0];
	const closeTime = [16, 31];
	const testNumber = /^[+0]{0,2}(91)?[0-9]{8}$/gi;
	const testAge = /^[1-9][0-9]?$|^100$/gi;
	const testName = /^[a-zA-Z]{3,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/g;
	const testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	//date error
	const [errorDate, setErrorDate] = useState('');
	const currentDateError = errorDate;
	const toShowDateError = Boolean(currentDateError);

	//date error
	// const [errorEmail, setErrorEmail] = useState('');
	// const currentEmailError = errorEmail;
	// const toShowEmailError = Boolean(errorEmail);

	let errorEmail = false;
	let nameError = false;


	const navigate = useNavigate();

	const [appointmentData, setAppointmentData] = useState({
		DateAppointment: null,
		patientPhone: null,
		patientName: '',
		patientEmail: '',
		patientAge: null,
		gender: 'male',
	});

	const [disableBtn, setDisableBtn] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			appointmentData.DateAppointment &&
			appointmentData.patientName &&
			appointmentData.patientAge &&
			appointmentData.patientPhone &&
			appointmentData.gender && appointmentData.patientEmail
		) {


			axios
				.post('http://127.0.0.1:3001/appointments', appointmentData)
				.then((res) => {

					if (res.status === 201) {
						setDisableBtn(true);
						console.log(res.data);
						notify();
						setTimeout(() => {
							navigate('/apointments');
						}, 2800);
					} else if (res.status === 204) {
						console.log(appointmentData);
						notifyExistError();
						setTimeout(()=>{
							window.location.reload()
						},1200)


					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			notifyerror();
		}
	};

// 	const updateApp = (e) => {
// 		const id = appointmentModify._id
// // e.preventDefault()
// 		axios.put(`http://127.0.0.1:3001/appointments/${id}`,appointmentData).then((res) => {
// 			console.log(res.status)
// 			if(res.status === 200){
// 				notifyupdate();
// 				axios.get('http://127.0.0.1:3001/appointments').then((res) => {
// 					setAppointments(res.data);
// 				});
// 				setTimeout(()=>{
// 					setOpen(false)
// 				},1500)
// 			}
//
// 			else
// 			if(res.status === 204){
//
// 				notifyExistError()
// 			}
//
// 		})
// 			.catch(err=>console.log(err.message))
// 	};
	const notify = () => {
		toast.success('appointment added 👌', {
			position: 'top-right',
			autoClose: 1800,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			draggablePercent: 60,
		});
	};
	const notifyerror = () => {
		toast.error('all fields are required', {
			position: 'top-center',
			autoClose: 1800,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			draggablePercent: 60,
		});
	};
	const notifyExistError = () => {
		toast.error("can't choose that date ", {
			position: 'top-center',
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			draggablePercent: 60,
		});
	};

	const handleFieldChange = (e) => {
		setAppointmentData({
			...appointmentData,
			[e.target.name]: e.target.value,
		});

	};

	const validatePhoneNumber = (phonenumber) => {
		if (!testNumber.test(phonenumber) && (phonenumber !== null && phonenumber !== ''))
			return true;
		else return false;
	};

	const validateAge = (age) => {
		if (!testAge.test(age) && (age !== null && age !== ''))
			return true;
		else return false;
	};
	const validateName = (name) => {
		if (name === '' || testName.test(name)) {
			nameError = false;
			return false;
		} else {
			nameError = true;
			return true;
		}
	};

	const validateEmail = (email) => {
		if (!email || email === '' || testEmail.test(email)) {
			errorEmail = false;
			return false;
		} else {
			errorEmail = true;
			return true;
		}
	};
	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				'& .MuiTextField-root': {m: 2.5, width: '35ch'},
			}}
			noValidate
			autoComplete="off"
		>
			<Grid
				container
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Grid item>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateTimePicker
							clearable
							shouldDisableDate={isWeekend}
							label="Date"
							value={appointmentData.DateAppointment}
							name="date"
							onChange={(newValue) => {

								setAppointmentData({
									DateAppointment: newValue
								});

								console.log('date change', appointmentData);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									error={toShowDateError}
									helperText={
										toShowDateError
											? currentDateError ??
											params.helperText
											: undefined
									}
									focused
								/>
							)}
							minTime={new Date(0, 0, 0, ...openTime)}
							maxTime={new Date(0, 0, 0, ...closeTime)}
							// minDateTime={new Date()}
							minDate={new Date()}
							ampm={false}
							// ampmInClock
							hideTabs={false}
							minutesStep={30}
							onError={(reason, value) => {
								switch (reason) {
									case 'invalidDate':
										setErrorDate('Invalid date format');
										break;
									case 'minDate':
										setErrorDate(
											'Values in the past are not allowed'
										);
										break;
									case 'minTime':
										setErrorDate(
											"can't take appointment before 09.00"
										);
										break;
									case 'maxTime':
										setErrorDate(
											"can't take appointment after 16.30 "
										);
										break;

									case 'shouldDisableDate':
										setErrorDate(
											"can't make appointment at weeckends"
										);
										break;

									default:
										setErrorDate('');
								}
							}}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item>
					<TextField

						label="Nom & prénom"
						variant="outlined"
						name="patientName"
						onChange={handleFieldChange}
						required
						error={validateName(appointmentData.patientName)}
						helperText={nameError ? 'not a valid name' : ''}
					/>
				</Grid>
				<Grid item>
					<TextField

						label="Email"
						variant="outlined"
						name="patientEmail"
						onChange={handleFieldChange}
						required
						error={validateEmail(appointmentData.patientEmail)}
						helperText={errorEmail ? 'not a valid email' : ''}

					/>
				</Grid>
				<Grid item>
					<TextField

						label="phone"
						id="outlined-start-adornment"
						sx={{m: 1, width: '25ch'}}
						InputProps={{
							inputMode: 'numeric',
							pattern: '[0-9]*',
							startAdornment: <InputAdornment position="start">+216</InputAdornment>,
						}}
						name="patientPhone"
						onChange={handleFieldChange}
						type="number"
						error={
							(appointmentData.patientPhone !== null && appointmentData.patientPhone !== '' &&
								(appointmentData.patientPhone < 20000000 ||
									appointmentData.patientPhone > 99999999))

						}
						helperText={
							(appointmentData.patientPhone !== null && appointmentData.patientPhone !== '' &&
								(appointmentData.patientPhone < 20000000 ||
									appointmentData.patientPhone > 99999999))

								? 'not a valid number'
								: ''

						}
					/>

				</Grid>

				<Grid item>
					<FormControl>
						{/* <FormLabel>Gender</FormLabel> */}
						<RadioGroup

							name="gender"

							onChange={handleFieldChange}
						>
							<div
								style={{
									display: 'flex',
								}}
							>
								<FormControlLabel
									value="male"
									control={<Radio/>}
									label="Male"
								/>
								<FormControlLabel
									value="female"
									control={<Radio/>}
									label="Female"
								/>
							</div>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item>
					<TextField

						label="age"
						variant="outlined"
						inputProps={{
							inputMode: 'numeric',
							pattern: '[0-9]*',

						}}
						name="patientAge"
						onChange={handleFieldChange}
						type="number"
						error={appointmentData.patientAge < 0 ||
							appointmentData.patientAge > 120

						}
						helperText={
							appointmentData.patientAge < 0 ||
							appointmentData.patientAge > 120
								? 'not a valid age'
								: ''
						}
					/>
				</Grid>

				<Grid item>
					<Button
						variant="contained"
						type="submit"
						style={{marginTop: '50%'}}

						disabled={(disableBtn || toShowDateError || (validatePhoneNumber(appointmentData.patientPhone) && appointmentData.patientPhone !== ('' || null)) || (validateAge(appointmentData.patientAge) && appointmentData.patientAge !== ('' || null)) || nameError || errorEmail)}
					>
						Save
					</Button>
				</Grid>
			</Grid>
			<ToastContainer
				transition={Slide}
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				draggablePercent={60}
			/>
		</Box>
	);
}