import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
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
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AppointmentForm(props) {
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

        axios
            .post('http://127.0.0.1:3001/appointments', appointmentData)
            .then(() => {
                setTimeout(() => {
                    navigate('/apointments')
                }, 2800)
            })
            .catch((err) => {
                console.log(err)
            })
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
        })
    }

    const handleFieldChange = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value,
        })
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
                        <DatePicker
                            label="Date"
                            value={appointmentData.DateAppointment}
                            name="date"
                            onChange={(newValue) => {
                                setAppointmentData({
                                    DateAppointment: newValue,
                                })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <TextField
                        label="Nom & prénom"
                        variant="outlined"
                        name="patientName"
                        onChange={handleFieldChange}
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
                    />
                </Grid>

                <Grid item>
                    <Button
                        onClick={notify}
                        variant="contained"
                        type="submit"
                        style={{ marginTop: '50%' }}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
            <ToastContainer
                transition={Flip}
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Box>
    )
}
