import React, { useEffect, useState } from 'react'
import { Flip, toast, ToastContainer } from 'react-toastify'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
    FormControl,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material'
import Button from '@material-ui/core/Button'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import noAppointment from './undraw_online_calendar_re_wk3t.svg.svg'
import './appointment.css'
import { pink } from '@mui/material/colors'
import UpdateIcon from '@mui/icons-material/SystemUpdateAltRounded'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import InputAdornment from '@mui/material/InputAdornment'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import SendIcon from '@mui/icons-material/Send'
import isWeekend from 'date-fns/isWeekend'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }, // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    backgroundColor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
}

export default function CustomizedTables() {
    const openTime = [9, 0]
    const closeTime = [16, 31]
    const testNumber = /^[+0]{0,2}(91)?[0-9]{8}$/gi
    const testAge = /^[1-9][0-9]?$|^100$/gi
    const testName = /^[a-zA-Z]{3,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/g
    const testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    //date error
    const [errorDate, setErrorDate] = useState('')
    const currentDateError = errorDate
    const toShowDateError = Boolean(currentDateError)

    let errorEmail = false
    let nameError = false

    const [open, setOpen] = React.useState(false)
    const handleOpen = (data) => {
        console.log('data', data)

        const dataapp = {
            DateAppointment: data.DateAppointment,
            patientName: data.patientName,
            patientPhone: data.patientPhone,
            patientEmail: data.patientEmail,
            gender: data.gender,
            patientAge: data.patientAge,
        }
        console.log('dataapp', dataapp)
        setAppointmentData(dataapp)
        setAppointmentModify(data)
        console.log(appointmentModify)
        setOpen(true)
    }
    const handleClose = () => setOpen(false)

    const [appointmentData, setAppointmentData] = useState({
        DateAppointment: null,
        patientPhone: null,
        patientName: '',
        patientEmail: '',
        patientAge: null,
        gender: 'male',
    })
    const notifyupdate = () => {
        toast.success('appointment updated 👌', {
            position: 'top-right',
            autoClose: 800,
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
        })
    }

    const handleFieldChange = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value,
        })
        console.log(appointmentData.DateAppointment)
    }

    const validatePhoneNumber = (phonenumber) => {
        if (
            !testNumber.test(phonenumber) &&
            phonenumber !== null &&
            phonenumber !== ''
        )
            return true
        else return false
    }

    const validateAge = (age) => {
        if (!testAge.test(age) && age !== null && age !== '') return true
        else return false
    }
    const validateName = (name) => {
        if (name === '' || testName.test(name)) {
            nameError = false
            return false
        } else {
            nameError = true
            return true
        }
    }

    const validateEmail = (name) => {
        if (!name || name === '' || testEmail.test(name)) {
            errorEmail = false
            return false
        } else {
            errorEmail = true
            return true
        }
    }

    const notify = () => {
        toast.error(' appointment deleted ', {
            position: 'top-center',
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            draggablePercent: 60,
        })
    }

    const [appointments, setAppointments] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [appointmentModify, setAppointmentModify] = useState('')

    const deleteApp = (id) => {
        axios.delete(`http://127.0.0.1:3001/appointments/${id}`).then((res) => {
            notify()
            setAppointments(
                appointments.filter((appointment) => appointment._id !== id)
            )
            // setAppointments(res.data)
        })
    }

    const updateApp = (e) => {
        const id = appointmentModify._id
        // e.preventDefault()
        axios
            .put(`http://127.0.0.1:3001/appointments/${id}`, appointmentData)
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    notifyupdate()
                    axios
                        .get('http://127.0.0.1:3001/appointments')
                        .then((res) => {
                            setAppointments(res.data)
                        })
                    setTimeout(() => {
                        setOpen(false)
                    }, 1500)
                } else if (res.status === 204) {
                    notifyExistError()
                }
            })
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:3001/appointments').then((res) => {
            setAppointments(res.data)
            console.log('appointment data', res.data)
        })
    }, [])

    return (
        <>
            <br />
            <br />

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    item
                    xs={6}
                    md={6}
                    style={{
                        width: '50%',
                        display:
                            !appointments || appointments.length === 0
                                ? 'none'
                                : 'contents',
                    }}
                >
                    <TextField
                        id="filled-basic"
                        label="Search"
                        variant="outlined"
                        // sx={{m: 0}}

                        placeholder="Search by name | phone | date"
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                    />
                </Grid>
            </Grid>

            <div style={{ height: 400, width: '90%' }}>
                <Grid
                    container
                    spacing={1}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '10px',
                        maxHeight: 'fitContent',
                    }}
                >
                    <Grid item>
                        <Link to="add">
                            <Button variant="contained">add appointment</Button>
                        </Link>
                    </Grid>
                </Grid>
                {!appointments || appointments.length === 0 ? (
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <h2 dataText="there is no appointment">
                                there is no appointment
                            </h2>
                        </Grid>
                        <Grid item xs={12}>
                            <img
                                src={noAppointment}
                                alt="noappointment"
                                width={'75%'}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <TableContainer component={Paper} sx={{ mx: 5 }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{ mx: 1 }}>
                                    <StyledTableCell
                                        align="center"
                                        style={{ backgroundColor: '#5856d6' }}
                                    >
                                        Name
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ backgroundColor: '#5856d6' }}
                                    >
                                        Email
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ backgroundColor: '#5856d6' }}
                                    >
                                        Number
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ backgroundColor: '#5856d6' }}
                                    >
                                        Date
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ backgroundColor: '#5856d6' }}
                                    >
                                        Modify
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments
                                    .filter((row) => {
                                        if (searchTerm === '') {
                                            return row
                                        } else if (
                                            row.patientName
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.toLowerCase()
                                                ) ||
                                            row.DateAppointment.toLowerCase().includes(
                                                searchTerm.toLowerCase()
                                            ) ||
                                            row.patientPhone.includes(
                                                searchTerm
                                            )
                                        ) {
                                            return row
                                        }
                                    })
                                    .map((row) => (
                                        <StyledTableRow key={row._id}>
                                            <StyledTableCell
                                                align="center"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleOpen(row)}
                                            >
                                                {row.patientName}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleOpen(row)}
                                            >
                                                {row.patientEmail}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleOpen(row)}
                                            >
                                                {row.patientPhone}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleOpen(row)}
                                            >
                                                {row.DateAppointment.replace(
                                                    'T',
                                                    ' '
                                                ).slice(0, 16)}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {/*<Button*/}
                                                {/*	variant="outlined"*/}
                                                {/*	startIcon={<DeleteIcon/>}*/}
                                                {/*	color="secondary"*/}
                                                {/*	onClick={() => deleteApp(row._id)}*/}
                                                {/*	style={{borderRadius: '10px'}}*/}
                                                {/*>*/}
                                                {/*	Delete*/}
                                                {/*</Button>*/}
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() =>
                                                        deleteApp(row._id)
                                                    }
                                                    size="large"
                                                >
                                                    <DeleteIcon
                                                        fontSize="inherit"
                                                        sx={{
                                                            color: pink[500],
                                                        }}
                                                    />
                                                </IconButton>
                                                {/*<IconButton aria-label="update">*/}
                                                {/*	<UpdateIcon/>*/}
                                                {/*</IconButton>*/}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style} component="form">
                            <Grid
                                rowSpacing={4}
                                container
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid item>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DateTimePicker
                                            name="date"
                                            clearable
                                            shouldDisableDate={isWeekend}
                                            label="Date"
                                            value={
                                                appointmentData.DateAppointment
                                            }
                                            onChange={(newValue) => {
                                                setAppointmentData({
                                                    DateAppointment: newValue,
                                                })
                                                console.log(
                                                    'date appointment',
                                                    appointmentData
                                                )
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
                                            minTime={
                                                new Date(0, 0, 0, ...openTime)
                                            }
                                            maxTime={
                                                new Date(0, 0, 0, ...closeTime)
                                            }
                                            // minDateTime={new Date()}
                                            minDate={new Date()}
                                            ampm={false}
                                            // ampmInClock
                                            hideTabs={false}
                                            minutesStep={30}
                                            onError={(reason, value) => {
                                                switch (reason) {
                                                    case 'invalidDate':
                                                        setErrorDate(
                                                            'Invalid date format'
                                                        )
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
                                        defaultValue={
                                            appointmentModify.patientName
                                        }
                                        label="Nom & prénom"
                                        variant="outlined"
                                        name="patientName"
                                        onChange={handleFieldChange}
                                        error={validateName(
                                            appointmentData.patientName
                                        )}
                                        helperText={
                                            nameError ? 'not a valid name' : ''
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        defaultValue={
                                            appointmentModify.patientEmail
                                        }
                                        label="Email"
                                        variant="outlined"
                                        name="patientEmail"
                                        onChange={handleFieldChange}
                                        error={validateEmail(
                                            appointmentData.patientEmail
                                        )}
                                        helperText={
                                            errorEmail
                                                ? 'not a valid email'
                                                : ''
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        defaultValue={
                                            appointmentModify.patientPhone
                                        }
                                        label="phone"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        InputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    +216
                                                </InputAdornment>
                                            ),
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
                                            defaultValue={
                                                appointmentModify.gender
                                            }
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
                                        defaultValue={
                                            appointmentModify.patientAge
                                        }
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
                                        variant="contained"
                                        onClick={() => updateApp()}
                                        color="primary"
                                        disabled={
                                            toShowDateError ||
                                            errorEmail ||
                                            nameError
                                        }
                                        endIcon={<SendIcon />}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
                <ToastContainer
                    transition={Flip}
                    position="top-center"
                    autoClose={1600}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    draggablePercent={60}
                    limit={2}
                />
            </div>
        </>
    )
}
