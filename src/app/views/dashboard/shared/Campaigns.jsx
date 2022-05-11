import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/system'
import axios from 'axios'
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextareaAutosize,
    TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import LocationIcon from '@mui/icons-material/AddLocationAltTwoTone'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import Button from '@material-ui/core/Button'
import CalendarIcon from '@mui/icons-material/CalendarMonthSharp'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Modals from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import ContactPhone from '@mui/icons-material/ContactPhoneOutlined'
import SendIcon from '@mui/icons-material/Send'
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import InputAdornment from '@mui/material/InputAdornment'
import StarIcon from '@mui/icons-material/Star'
import isWeekend from 'date-fns/isWeekend'
import InfiniteScroll from 'react-infinite-scroller';

import './appointment.css'


function stringToColor(string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
}

const getRating = (max) => {
    return Math.floor(Math.random() * max)
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#FFEEEE',
    // border: '0  #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
}

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
}

const labels = {
    0.5: 'Useless',
    1: 'Useless',
    1.5: 'Poor',
    2: 'Poor',
    2.5: 'Ok',
    3: 'Ok',
    3.5: 'Good',
    4: 'Good',
    4.5: 'Excellent',
    5: 'Excellent',
}

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

const Campaigns = () => {
    const [dr, setDr] = useState('')
    const [open1, setOpen1] = React.useState(false)
    const handleOpen1 = (item) => {
        setOpen1(true)
        setDr(item)
        console.log(item)
    }
    const handleClose1 = () => setOpen1(false)
    const handleFieldChange = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value,
        })
        console.log(appointmentData.DateAppointment)
    }
    const [searchTerm, setSearchTerm] = useState('')

    const [doctorID, setDoctorID] = useState(null)

    const [doctorRat, setDoctor] = React.useState('')

    const [open, setOpen] = React.useState(false)
    const handleOpen = (item) => {
        console.log('item id', item._id)
        setDoctorID(item._id)
        setValue(item.ratings)
        setHover(item.ratings)
        setDoctor(item)
        setOpen(true)
    }
    const handleClose = () => {
        setValue(2.5)
        setOpen(false)
    }
    const [date, setDate] = useState(null)
    const [value, setValue] = React.useState(2)
    const [hover, setHover] = React.useState(-1)
    const theme = useTheme()
    const secondary = theme.palette.text.secondary
    const [doctors, setDoctors] = useState(null)
    const [reviewNum, setReviewNum] = useState(null)

    const [appointmentData, setAppointmentData] = useState({
        DateAppointment: null,
        // patientPhone: null,
        // patientName: '',
        // patientEmail: '',
        // patientAge: null,
        // gender: 'male',
    })

    const addApp = () => {
        const id = dr._id
        if (
            appointmentData.DateAppointment
            // appointmentData.patientName &&
            // appointmentData.patientAge &&
            // appointmentData.patientPhone &&
            // appointmentData.gender && appointmentData.patientEmail
        ) {
            axios
                .post(
                    `http://127.0.0.1:3001/appointments/${id}`,
                    appointmentData
                )
                .then((res) => {
                    if (res.status === 201) {
                        // alert('appointmlent added')
                        setTimeout(() => {
                            setOpen1(false)
                        }, 400)
                    } else {
                        alert('appointment not added')
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }
   const [rev,setRev]=useState('')
const handlerev=(e)=>{
      setRev(e.target.value)

}
    const updateRating = () => {
        const id = doctorID

        const rating = { value: value, rev : rev }


        axios
            .put(`http://127.0.0.1:3001/users/rating/${id}`, rating)
            .then((res) => {
                if (res.status === 200) {
                    axios
                        .get('http://127.0.0.1:3001/users/lstDoctor')
                        .then((res) => {
                            setRev('')
                            setDoctors(res.data.data)

                            setReviewNum(res.data.revArr)
                        })
                    setTimeout(() => {
                        setOpen(false)
                    }, 400)
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:3001/users/lstDoctor').then((res) => {
            setDoctors(res.data.data)
            console.log(res.data.data)
            setReviewNum(res.data.revArr)
        })
    }, [])

    return (
        <div>
            <br />
            <br />

            <TextField
                id="filled-basic"
                label="Search"
                variant="outlined"
                sx={{ m: 3 }}
                placeholder="Search by name | speciality"
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
                style={{ width: '50%', marginLeft: '25%' }}
            />

            {!doctors || doctors.length === 0 ? (
                <h1>no result</h1>
            ) : (
                <Grid
                    container={true}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    rowSpacing={4}
                >
                    {doctors.filter((doctor) => {
                        if (searchTerm === '') {
                        return doctor
                    } else if (
                            doctor.firstName
                        .toLowerCase()
                        .includes(
                        searchTerm.toLowerCase()
                        ) ||
                            doctor.speciality.toLowerCase().includes(
                        searchTerm.toLowerCase()
                        )
                        ) {
                        return doctor
                    }
                    })
                        .map((doctor) => (
                        <Grid item xs={8} key={doctor._id}>
                            {/*<Paper elevation={6}>*/}
                            {/*    <h1><strong>Dr </strong>{doctor.firstName}</h1>*/}
                            {/*/!*<img src={doctor.image} width={'50%'}/>*!/*/}
                            {/*    <Avatar {...stringAvatar(doctor.firstName)}  style={{width:68,height:68}}/>*/}

                            {/*</Paper>*/}
                            <Paper
                                elevation={6}
                                sx={{
                                    p: 2,
                                    margin: 'auto',
                                    maxWidth: 500,
                                    flexGrow: 1,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? '#1A2027'
                                            : '#fff',
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase
                                            sx={{ width: 128, height: 128 }}
                                        >
                                            {/*<Img alt="complex" src="/static/images/grid/complex.jpg" />*/}
                                            <Avatar
                                                {...stringAvatar(
                                                    doctor.firstName
                                                )}
                                                style={{
                                                    width: 90,
                                                    height: 90,
                                                }}
                                            />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid
                                            item
                                            xs
                                            container
                                            direction="column"
                                            spacing={2}
                                        >
                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle1"
                                                    component="div"
                                                >
                                                    <strong>Dr </strong>
                                                    {doctor.firstName}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    gutterBottom
                                                >
                                                    {doctor.speciality}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    <LocationIcon
                                                        color="secondary"
                                                        fontSize={'small'}
                                                    />
                                                    : {doctor.adress}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    <ContactPhone
                                                        color="success"
                                                        fontSize={'small'}
                                                    />{' '}
                                                    : +216{' '}
                                                    <a
                                                        href={`tel:${doctor.phone}`}
                                                    >
                                                        {doctor.phone}
                                                    </a>
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                {/*<Typography sx={{ cursor: 'pointer' }} variant="body2">*/}
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() =>
                                                        handleOpen1(doctor)
                                                    }
                                                    startIcon={<CalendarIcon />}
                                                >
                                                    Make an appointment
                                                </Button>
                                                {/*</Typography>*/}
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="subtitle1"
                                                component="div"
                                                onClick={() => {
                                                    handleOpen(doctor)
                                                }}
                                            >
                                                <Rating
                                                    name="read-only"
                                                    value={Number(
                                                        doctor.ratings
                                                    )}
                                                    readOnly
                                                    size="small"
                                                    precision={0.5}
                                                />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {reviewNum
                                                    ? reviewNum[
                                                        doctors.indexOf(
                                                            doctor
                                                        )
                                                        ]
                                                    : null}{' '}
                                                reviews
                                            </Typography>
                                           <Typography  variant="body2" maxHeight={10}>
                                               {doctor.reviews.length === 0?null:(
                                               <div className="scrollDiv" style={{height:80,overflowY:'scroll'}}>

                                                   {doctor.reviews.filter(review=>{
                                                       if(review !== ''){
                                                           return review
                                                       }
                                                   }).map(review=>(

                                                    <h5>{review}</h5>
                                                   ))}

                                               </div>
                                               )}
                                           </Typography>


                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>
                    ))}

                    {/*<Grid item xs={8}>*/}
                    {/*    <h1>doctor component</h1>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={8}>*/}
                    {/*    <h1>doctor component</h1>*/}
                    {/*</Grid>*/}
                </Grid>
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
                    <Box sx={style} justifyContent="center">
                        <Grid
                            rowSpacing={1}
                            container
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Grid item>
                                <Typography
                                    id="transition-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Add review
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    id="transition-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    <Rating
                                        name="size-large"
                                        defaultValue={2}
                                        size="large"
                                        // onChange={(event, newHover) => {
                                        //     // setHover(newHover);
                                        //     console.log(newHover)
                                        // }}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue(newValue)
                                            console.log('value', value)
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover)
                                        }}
                                        emptyIcon={
                                            <StarIcon
                                                style={{ opacity: 0.55 }}
                                                fontSize="inherit"
                                            />
                                        }
                                    />
                                    {value !== null && (
                                        <Box sx={{ ml: 2 }}>
                                            {
                                                labels[
                                                    hover !== -1 ? hover : value
                                                    ]
                                            }
                                        </Box>
                                    )}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography id="transition-modal-description">
                                    <TextareaAutosize
                                        maxLength={15}
                                        aria-label="minimum height"
                                        minRows={3}
                                        placeholder="give review"
                                        style={{ width: 150 }}
                                        onChange={handlerev}


                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        endIcon={<SendIcon />}
                                        style={{ marginLeft: 20 }}
                                        onClick={() => {
                                            updateRating()
                                            // reviewNum[doctors.indexOf(doctorRat)]++
                                        }}
                                    >
                                        Send
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>

            <Modals
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open1}
                onClose={handleClose1}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open1}>
                    <Box sx={style1} component="form">
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
                                <h1> choose a date</h1>
                            </Grid>

                            <Grid item>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DateTimePicker
                                        shouldDisableDate={isWeekend}
                                        name="date"
                                        clearable
                                        label="Date"
                                        value={appointmentData.DateAppointment}
                                        onChange={(newValue) => {
                                            setAppointmentData({
                                                DateAppointment: newValue,
                                            })
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} focused />
                                        )}
                                        minTime={new Date(0, 0, 0, 9, 0)}
                                        maxTime={new Date(0, 0, 0, 16, 30)}
                                        // minDateTime={new Date()}
                                        minDate={new Date()}
                                        ampm={false}
                                        // ampmInClock
                                        hideTabs={false}
                                        minutesStep={30}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item>
                                <TextField
                                    variant="filled"
                                    id="outlined-read-only-input"
                                    label="Doctor"
                                    value={dr.firstName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/*<Grid item>*/}
                            {/*    <TextField*/}

                            {/*        onChange={handleFieldChange}*/}
                            {/*        label="Nom & prénom"*/}
                            {/*        variant="outlined"*/}
                            {/*        name="patientName"*/}

                            {/*        required*/}
                            {/*    />*/}
                            {/*</Grid>*/}

                            {/*<Grid item>*/}
                            {/*    <TextField*/}
                            {/*        label="Email"*/}
                            {/*        variant="outlined"*/}
                            {/*        name="patientEmail"*/}
                            {/*        onChange={handleFieldChange}*/}

                            {/*        required*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            {/*<Grid item>*/}
                            {/*    <TextField*/}
                            {/*        onChange={handleFieldChange}*/}
                            {/*        label="phone"*/}
                            {/*        id="outlined-start-adornment"*/}
                            {/*        sx={{m: 1, width: '25ch'}}*/}
                            {/*        InputProps={{*/}
                            {/*            inputMode: 'numeric',*/}
                            {/*            pattern: '[0-9]*',*/}
                            {/*            startAdornment: (*/}
                            {/*                <InputAdornment position="start">*/}
                            {/*                    +216*/}
                            {/*                </InputAdornment>*/}
                            {/*            ),*/}
                            {/*        }}*/}
                            {/*        name="patientPhone"*/}
                            {/*        type="number"*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            {/*<Grid item>*/}
                            {/*    <FormControl>*/}
                            {/*        /!* <FormLabel>Gender</FormLabel> *!/*/}
                            {/*        <RadioGroup*/}
                            {/*            name="gender"*/}
                            {/*            onChange={handleFieldChange}*/}
                            {/*        >*/}
                            {/*            <div*/}
                            {/*                style={{*/}
                            {/*                    display: 'flex',*/}
                            {/*                }}*/}
                            {/*            >*/}
                            {/*                <FormControlLabel*/}
                            {/*                    value="male"*/}
                            {/*                    control={<Radio/>}*/}
                            {/*                    label="Male"*/}
                            {/*                />*/}
                            {/*                <FormControlLabel*/}
                            {/*                    value="female"*/}
                            {/*                    control={<Radio/>}*/}
                            {/*                    label="Female"*/}
                            {/*                />*/}
                            {/*            </div>*/}
                            {/*        </RadioGroup>*/}
                            {/*    </FormControl>*/}
                            {/*</Grid>*/}
                            {/*<Grid item>*/}
                            {/*    <TextField*/}
                            {/*        onChange={handleFieldChange}*/}
                            {/*        label="age"*/}
                            {/*        variant="outlined"*/}
                            {/*        inputProps={{*/}
                            {/*            inputMode: 'numeric',*/}
                            {/*            pattern: '[0-9]*',*/}
                            {/*        }}*/}
                            {/*        name="patientAge"*/}
                            {/*        type="number"*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<SendIcon />}
                                    onClick={() => addApp()}
                                >
                                    add
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modals>
        </div>
    )
}

export default Campaigns