import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import ChipInput from 'material-ui-chip-input'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Moment from 'moment'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import NavigationIcon from '@mui/icons-material/Navigation'
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function MedicalRecordForm() {
    const navigate = useNavigate()

    const { idpatient } = useParams()

    const [patient, setpatient] = useState([])
    const [patientid, setpatientid] = useState([])

    useEffect(() => {
        // Update the document title using the browser API
        axios
            .get('https://tbibi.herokuapp.com/users/' + idpatient)
            .then((res) => {
                console.log(res.data.email)
                setpatient(res.data)
                setpatientid(res.data.email)
            })
    }, [])

    let lst = []
    const handleChange = (newValue) => {
        lst = newValue
        setMeds(newValue)
        console.log(lst)
    }

    const [meds, setMeds] = useState({
        lst,
    })
    const [formData, setFormData] = useState({
        medsList: meds,
        allergies: '',
        CurrentMedicalConditions: '',
        familyhistory: '',
    })
    const [errors, setErrors] = useState({ visbile: false, message: '' })
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        formData.medsList = meds

        axios
            .post('https://tbibi.herokuapp.com/medicalrecord', {
                data: formData,
                patient: patient,
                emailpatient: patientid,
            })
            .then(function (response) {
                console.log('+++++++++++++')

                console.log(response)
            })
            .catch(function (error) {
                console.log('-----------')

                console.log(error)
            })
        navigate('/patientsHistoryRecord/')
    }

    const { title, medsList, price } = formData

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h1 style={{ width: '100%', textAlign: 'center' }}>
                Patient medical record
            </h1>
            <Grid
                container
                spacing={1}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Grid item>
                    <TextField
                        id="standard-required"
                        label="Patient"
                        value={patient.firstName || ''}
                        variant="standard"
                        onChange={(e) => onChange(e)}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        value={Moment(patient.birthDate).format('d MMM YYYY')}
                        label="Date of Birth"
                        variant="standard"
                    />
                </Grid>

                <Grid item>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        value={
                            '2022' - Moment(patient.birthDate).format('YYYY')
                        }
                        label="Age"
                        variant="standard"
                    />
                </Grid>

                <Grid item>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        value={patient.adress || ''}
                        label="Address"
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Grid item>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        value={patient.phone || ''}
                        label="Phone"
                        variant="standard"
                    />
                </Grid>
                <Grid item>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            Gender
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                                checked={patient.sex === 'woman'}
                            />
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                                checked={patient.sex === 'man'}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={1}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Grid item xs={8}>
                    <TextField
                        style={{ width: '100%' }}
                        id="outlined-multiline-static"
                        label="Current Medical Conditions"
                        multiline
                        rows={4}
                        name="CurrentMedicalConditions"
                        onChange={(e) => onChange(e)}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Grid item xs={8}>
                    <TextField
                        style={{ width: '100%' }}
                        name="familyhistory"
                        id="outlined-multiline-static"
                        label="Family history"
                        multiline
                        rows={4}
                        onChange={(e) => onChange(e)}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Grid item xs={8}>
                    <ChipInput
                        label="Current Medications "
                        id="outlined-multiline-static"
                        name="medsList"
                        onChange={(chips) => handleChange(chips)}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Grid item xs={8}>
                    <TextField
                        style={{ width: '100%' }}
                        name="allergies"
                        id="outlined-multiline-static"
                        label="Allergies Reactions to Treatment"
                        multiline
                        rows={4}
                        onChange={(e) => onChange(e)}
                    />
                </Grid>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Grid>
            <Grid
                container
                spacing={1}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Grid item>
                    <Button variant="contained" type="submit">
                        Save Medical Record
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
