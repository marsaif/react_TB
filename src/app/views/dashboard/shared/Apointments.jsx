import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Button from '@material-ui/core/Button'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
}

export default function CustomizedTables() {
    const [value, setValue] = useState(new Date('2014-08-18T21:11:54'))

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

    const handleChange = (newValue) => {
        setValue(newValue)
    }
    const [appointments, setAppointments] = useState(null)

    const deleteApp = (id) => {
        axios.delete(`http://127.0.0.1:3001/appointments/${id}`).then((res) => {
            notify()
            setAppointments(
                appointments.filter((appointment) => appointment._id != id)
            )
            // setAppointments(res.data)
        })
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:3001/appointments').then((res) => {
            setAppointments(res.data)
            console.log(res.data)
        })
    }, [])

    return (
        <>
            <div>
                <br />
                <br />
                <TextField
                    id="filled-basic"
                    label="Search"
                    variant="outlined"
                    sx={{ m: 5 }}
                    style={{ width: '60%', textAlign: 'center' }}
                    placeholder="Search"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        style={{ margin: '100px' }}
                        label="Date desktop"
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

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
                    <h1 style={{ textAlign: 'center' }}>
                        there is no appointment
                    </h1>
                ) : (
                    <TableContainer component={Paper} sx={{ mx: 5 }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{ mx: 1 }}>
                                    <StyledTableCell align="center">
                                        Name
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Number
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Date
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Delete
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell align="center">
                                            {row.patientName}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.patientPhone}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.DateAppointment.slice(0, 16)}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                variant="outlined"
                                                startIcon={<DeleteIcon />}
                                                color="secondary"
                                                onClick={() =>
                                                    deleteApp(row._id)
                                                }
                                                style={{ borderRadius: '10px' }}
                                            >
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
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
