import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import isWeekend from 'date-fns/isWeekend'
import format from 'date-fns/format'
import './appointment.css'
import Stack from '@mui/material/Stack'
import 'react-toastify/dist/ReactToastify.css'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'

import {
    Grid,
    Box,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AppointmentForm(props) {
    //open and close time
    const openTime = [9, 0]
    const closeTime = [16, 31]
    const testNumber = /^[+0]{0,2}(91)?[0-9]{8}$/g
    const testAge = /^100|[1-9]?\d$/g
    //date error
    const [errorDate, setErrorDate] = useState('')
    const currentDateError = errorDate
    const toShowDateError = Boolean(currentDateError)

    //patient name error
    // const [errorNom, setErrorNom] = useState('')
    // const currentNomError = errorNom
    // const toShowNomError = Boolean(currentNomError)

    //patient number error
    // const [errorNumber, setErrorNumber] = useState('')
    // const currentNumberError = errorNumber
    // const toShowNumberError = Boolean(currentNumberError)

    //patient age error
    // const [errorAge, setErrorAge] = useState('')
    // const currentAgeError = errorAge
    // const toShowAgeError = Boolean(currentAgeError)

    const navigate = useNavigate()
    const [appointmentData, setAppointmentData] = useState({
        DateAppointment: null,
        patientPhone: null,
        patientName: '',
        patientAge: 0,
        gender: 'male',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (
            appointmentData.DateAppointment &&
            appointmentData.patientName &&
            appointmentData.patientAge &&
            appointmentData.patientPhone &&
            appointmentData.gender
        ) {
            // const appointDate = new Date(appointmentData.DateAppointment)
            // appointDate.setSeconds(0)
            // appointmentData.DateAppointment = appointDate.toString
            // setAppointmentData(DateAppointment=appointDate.toDateString)
            // appointmentData.DateAppointment.replaceAt(16, ':00.000+01:00')
            const appData = appointmentData
            axios
                .post('http://127.0.0.1:3001/appointments', appointmentData)
                .then((res) => {
                    if (res.status === 201) {
                        console.log(res.data)
                        notify()
                        setTimeout(() => {
                            navigate('/apointments')
                        }, 2800)
                    } else {
                        notifyexisterror()
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            notifyerror()
        }
    }
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
        })
    }
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
        })
    }
    const notifyexisterror = () => {
        toast.error("can't choose that date ", {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            draggablePercent: 60,
        })
    }

    const handleFieldChange = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value,
        })
        console.log(appointmentData.DateAppointment)
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 2.5, width: '35ch' },
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
                                    DateAppointment: newValue,
                                })
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
                            ampm={true}
                            ampmInClock
                            hideTabs={false}
                            minutesStep={30}
                            onError={(reason, value) => {
                                switch (reason) {
                                    case 'invalidDate':
                                        setErrorDate('Invalid date format')
                                        break
                                    case 'minDate':
                                        setErrorDate(
                                            'Values in the past are not allowed'
                                        )
                                        break
                                    case 'minTime':
                                        setErrorDate(
                                            "can't take appointment before 09.00"
                                        )
                                        break
                                    case 'maxTime':
                                        setErrorDate(
                                            "can't take appointment after 16.30 "
                                        )
                                        break

                                    case 'shouldDisableDate':
                                        setErrorDate(
                                            "can't make appointment at weeckends"
                                        )
                                        break

                                    default:
                                        setErrorDate('')
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
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="phone"
                        variant="outlined"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                        }}
                        name="patientPhone"
                        onChange={handleFieldChange}
                        type="number"
                        error={
                            appointmentData.patientPhone !== null &&
                            appointmentData.patientPhone !== '' &&
                            (appointmentData.patientPhone < 20000000 ||
                                appointmentData.patientPhone > 99999999)
                                ? true
                                : false
                        }
                        helperText={
                            appointmentData.patientPhone !== null &&
                            appointmentData.patientPhone !== '' &&
                            (appointmentData.patientPhone < 20000000 ||
                                appointmentData.patientPhone > 99999999)
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
                            value={appointmentData.gender}
                            onChange={handleFieldChange}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
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
                        error={
                            appointmentData.patientAge < 0 ||
                            appointmentData.patientAge > 120
                                ? true
                                : false
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
                        style={{ marginTop: '50%' }}
                        disabled={toShowDateError}
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
    )
}
