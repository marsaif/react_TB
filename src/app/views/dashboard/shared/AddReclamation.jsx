
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { convertHexToRGB } from 'app/utils/utils'
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";

import { Card, Button } from '@mui/material'
import { styled } from '@mui/system'
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Moment from 'moment';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ChipInput from 'material-ui-chip-input'


const CardRoot = styled(Card)(({ theme }) => ({
    //  marginBottom: '24px',
    margin: '30px',
    boxShadow:
        '-1px 1px 9px -2px rgba(0,0,0,0.95) !important',
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({

    textAlign: 'center',
    position: 'relative',
    boxShadow:
        'none',
    /*   background: `rgb(${convertHexToRGB(
          theme.palette.primary.main
      )}, 0.15) !important`, */
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    paddingTop: '24px',
    paddingBottom: '24px',
    color: theme.palette.text.secondary,
}))

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function AddReclamation() {

    let lst = []

    const [role, setRole] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [lstusers, setLstusers] = React.useState([lst]);
    const [doctor, setDoctor] = React.useState('');
    const [patient, setPatient] = useState([])

    const sendReclamation = async () => {
        console.log("wow")
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        axios.get("http://localhost:3001/users/getUser").then((response) => {
            setPatient(response.data.user._id)
        })
    }, []);




    React.useEffect(() => {
        axios.get("http://localhost:3001/users/lstdoctors").then((res) => {

            // lst = res.data
            setLstusers(res.data)
        })
    }, []);

    const handleChange = (event) => {
        setDoctor(event.target.value);
        console.log(event.target.value)
    };

    const [formData, setFormData] = useState({
        details: "",
        doctor: "",
        patient: ""
    });

    const onChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        formData.doctor = doctor
        formData.patient = patient

        e.preventDefault();
        axios.post('http://localhost:3001/reclamations', {
            data: formData,

        })
            .then(function (response) {

                console.log(response);
            })
            .catch(function (error) {

                console.log(error);
            });


    };

    return (

        <CardRoot
            component="form" onSubmit={onSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .demo-simple-select-label': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
        >

            <StyledCard elevation={0} >
                <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/claims-2021941-1705361.png" width="100px"
                    alt="upgrade"
                />
                <Paragraph>

                    <h3>  If you have any problem please make a <b>claim</b></h3>
                </Paragraph>


                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8} >

                        <TextField
                            id="input-with-icon-textfield"
                            label="TextField"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"


                        />
                    </Grid>

                </Grid>

                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8} >

                        <FormControl fullWidth style={{ marginTop: '0.8rem' }}>
                            <InputLabel id="demo-simple-select-label"  >Doctor Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={doctor}
                                label="Age"
                                onChange={handleChange}

                            >
                                <MenuItem  >----</MenuItem>
                                {lstusers.map((row) => (<MenuItem key={Math.random().toString(36).substr(2, 9)} value={row._id} >{row.firstName}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8} >

                        <TextField style={{ width: '100%' }}

                            name="details"
                            id="outlined-multiline-static"
                            label="Details"
                            multiline
                            rows={4}
                            onChange={(e) => onChange(e)}

                        />

                    </Grid>


                </Grid>
                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item >

                        <Button style={{ marginTop: '0.8rem' }} variant="contained" type="submit">Send Claim</Button>

                    </Grid>


                </Grid>
            </StyledCard>
        </CardRoot>


    );
}
