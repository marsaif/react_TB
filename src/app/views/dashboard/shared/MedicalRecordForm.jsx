import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import ChipInput from 'material-ui-chip-input'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function MedicalRecordForm() {

  const { idpatient } = useParams();

  const [patient, setpatient] = useState([])
  useEffect(() => {
    // Update the document title using the browser API
    axios.get("http://localhost:3001/users/" + idpatient).then((res) => {

      setpatient(res.data)

    })
  }, []);

  let lst = []
  const handleChange = (newValue) => {
    lst = newValue
    setMeds(newValue)
    console.log(lst)
  };



  const [meds, setMeds] = useState({
    lst
  });
  const [formData, setFormData] = useState({
    medsList: meds,
    allergies: "",
    CurrentMedicalConditions: "",
    familyhistory: ""
  });
  const [errors, setErrors] = useState({ visbile: false, message: "" });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(meds)
    // formData.medsList = []
    // formData.medsList.push(lst);
    formData.medsList = meds
    console.log(formData);

    axios.post('http://localhost:3001/medicalrecord', {
      data: formData,
      patient:patient
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  };


  const { title, medsList, price } = formData;

  return (
    <Box
      component="form" onSubmit={onSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1 style={{ width: '100%', textAlign: 'center' }}>Patient medical record</h1>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item >

          <TextField
            id="standard-required"
            label="Patient"
            value={patient.firstName + " " + patient.lastName}
            variant="standard"
            onChange={(e) => onChange(e)}

          />
        </Grid>
        <Grid item >

          <TextField
            value={patient.birthDate}
            id="standard-required"
            label="Date of Birth"
            variant="standard"
          />
        </Grid>

        <Grid item >

          <TextField

            id="standard-required"
            label="Age"
            variant="standard"
          />
        </Grid>

        <Grid item >

          <TextField
            value={patient.Adress}

            id="standard-required"
            label="Address"
            variant="standard"
          />
        </Grid>

      </Grid>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item>

          <TextField
            value={patient.phone+""}
            id="standard-required"
            label="Phone"
            variant="standard"
          />
        </Grid>
        <Grid item >

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" >Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female"               checked={patient.sex === "female"}
 />
              <FormControlLabel value="male" control={<Radio />} label="Male"               checked={patient.sex === "male"}
 />

            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item >

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" >Marital Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="married" control={<Radio />} label="Married" />
              <FormControlLabel value="single" control={<Radio />} label="Single" />
              <FormControlLabel value="divorced" control={<Radio />} label="Divorced" />
              <FormControlLabel value="widowed" control={<Radio />} label="Widowed" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={8} >

          <TextField style={{ width: '100%' }}
            id="outlined-multiline-static"
            label="Current Medical Conditions"
            multiline
            rows={4}
            name="CurrentMedicalConditions"
            onChange={(e) => onChange(e)}

          />
        </Grid>

      </Grid>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={8} >

          <TextField style={{ width: '100%' }}

            name="familyhistory"
            id="outlined-multiline-static"
            label="Family history"
            multiline
            rows={4}
            onChange={(e) => onChange(e)}

          />

        </Grid>


      </Grid>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={8} >

          <ChipInput label="Current Medications "
            id="outlined-multiline-static"
            name="medsList"

            onChange={(chips) => handleChange(chips)}
          />
        </Grid>

      </Grid>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={8} >

          <TextField style={{ width: '100%' }}

            name="allergies"
            id="outlined-multiline-static"
            label="Allergies Reactions to Treatment"
            multiline
            rows={4}
            onChange={(e) => onChange(e)}

          />

        </Grid>


      </Grid>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item >

          <Button variant="contained" type="submit">Save Medical Record</Button>

        </Grid>


      </Grid>
    </Box>
  );
}
