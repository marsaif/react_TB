import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { useNavigate } from 'react-router-dom'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import WorkIcon from '@mui/icons-material/Work'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import Divider from '@mui/material/Divider'
import Moment from 'moment'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Fab from '@material-ui/core/Fab'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NavigationIcon from '@mui/icons-material/Navigation'
import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone'
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone'
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function PatientsHistoryRecord() {
    let lst = []
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState(false)
    const [lstusers, setLstusers] = useState([lst])
    const [records, setRecords] = useState([])

    useEffect(() => {
        axios
            .get('https://tbibi.herokuapp.com/users/lstpatients')
            .then((res) => {
                console.log(res.data)
                lst = res.data
                setLstusers(res.data)
            })
    }, [])

    const handleClickOpen = (data) => {
        axios
            .get('https://tbibi.herokuapp.com/medicalrecord/' + data._id)
            .then((res) => {
                console.log(res.data)
                setRecords(res.data)
            })

        //  console.log(data)

        setData(data)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickRecord = (data) => {
        //  console.log(data)
        navigate('/medicalRecordDetails/' + data._id)
    }
    const handleClickNewRecord = (data) => {
        console.log(data)
        navigate('/medicalrecord/' + data._id)
    }
    const customColumnStyle = { maxWidth: '500px' }

    return (
        <TableContainer
            component={Paper}
            sx={{
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '5%',
                marginBottom: '5%',
            }}
        >
            <h1 style={{ textAlign: 'center' }}>
                Patients medical Records History
            </h1>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">firstName</TableCell>
                        <TableCell align="right">email</TableCell>
                        <TableCell align="right">phone</TableCell>
                        <TableCell align="right">adress</TableCell>
                        <TableCell align="center" style={customColumnStyle}>
                            Medical Record details
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lstusers.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="right">{row.firstName}</TableCell>

                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.adress}</TableCell>
                            <TableCell align="center">
                                <Fab
                                    sx={{ mr: 3 }}
                                    color="primary"
                                    aria-label="add"
                                    size="small"
                                    onClick={() => {
                                        handleClickOpen(row)
                                    }}
                                >
                                    <ChromeReaderModeTwoToneIcon />
                                </Fab>
                                <Fab
                                    size="small"
                                    color="secondary"
                                    aria-label="edit"
                                    onClick={() => {
                                        handleClickNewRecord(row)
                                    }}
                                >
                                    <CreateTwoToneIcon />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {data.firstName} {'Medical Record History '}
                </DialogTitle>
                <DialogContent>
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                        }}
                    >
                        {records.map((row) => (
                            <ListItem
                                button
                                onClick={() => {
                                    handleClickRecord(row)
                                }}
                            >
                                <ListItemAvatar sx={{ marginBottom: '2%' }}>
                                    <Avatar>
                                        <AssignmentIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={Moment(
                                        row.data.DateCreation
                                    ).format('dddd MMM YYYY HH:mm ')}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Exit</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    )
}
