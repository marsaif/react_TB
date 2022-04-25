import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ChipInput from 'material-ui-chip-input'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import  MyDocument  from './pdfMedicalRecordFile';
import { jsPDF } from "jspdf";

export default function MedicalRecordDetail() {

  const { idrecord } = useParams();

  const [patient, setpatient] = useState({})
  const [medRecord, setmedRecord] = useState([])


  useEffect(() => {
    // Update the document title using the browser API
    axios.get("http://localhost:3001/users/" + "555").then((res) => {
      setpatient(res.data)

    })
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    axios.get("http://localhost:3001/medicalrecord/medicalrecorddetail/" + idrecord).then((res) => {
      console.log(res.data)
      setmedRecord(res.data.data)
      axios.get("http://localhost:3001/users/" + res.data.data.patient).then((res) => {
        setpatient(res.data)

      })


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

    formData.medsList = meds
    console.log(formData);
    toast("Medical record saved succesfully!");

    axios.post('http://localhost:3001/medicalrecord', {
      data: formData,
      patient: patient,
    })
      .then(function (response) {
        console.log("+++++++++++++");

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  const clickpdf = () => {
            console.log(medRecord.familyHistory);

    const doc = new jsPDF();
    doc.setFont('Helvertica','bold')
    doc.text('family History', 60, 60);
    doc.text('Current Medical Conditions', 60, 80);
    doc.text('Allergies Reactions to Treatment', 60, 100);
    doc.text('current Medications', 60, 120);

    doc.setFont('Helvertica','Normal')

    doc.text(medRecord.familyHistory, 150, 60);
    doc.text(medRecord.CurrentMedicalConditions, 150, 80);
    doc.text(medRecord.AllergiesReactionstoTreatment, 150, 100);
    doc.text(medRecord.currentMedications, 150, 120);

    doc.save("MedicalRecordDetail.pdf");

  };


  return (
    <Box
      component="form" onSubmit={onSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <h1 style={{ width: '100%', textAlign: 'center' }}>Medical Record detail</h1>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item >

          <TextField
            id="standard-required"
            label="Patient"
            value={patient.firstName || ""}
            variant="standard"
            onChange={(e) => onChange(e)}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item >

          <TextField
            value={Moment(patient.birthDate).format('d MMM YYYY')}
            InputProps={{
              readOnly: true,
            }}
            label="Date of Birth"
            variant="standard"
          />
        </Grid>

        <Grid item >
          <TextField
            InputProps={{
              readOnly: true,
            }}
            value={'2022' - Moment(patient.birthDate).format('YYYY')}

            label="Age"
            variant="standard"
          />
        </Grid>

        <Grid item >

          <TextField
            value={patient.adress || ""}
            InputProps={{
              readOnly: true,
            }}
            label="Address"
            variant="standard"
          />
        </Grid>

      </Grid>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item>

          <TextField
            value={patient.phone + ""}
            label="Phone"
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
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
              <FormControlLabel value="female" control={<Radio />} label="Female" checked={patient.sex === "woman"}
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" checked={patient.sex === "man"}
              />

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
            InputProps={{
              readOnly: true,
            }} value={medRecord.CurrentMedicalConditions || ""}
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
            value={medRecord.familyHistory || ""}
            onChange={(e) => onChange(e)}
            InputProps={{
              readOnly: true,
            }}
          />

        </Grid>


      </Grid>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={8} >

          <ChipInput label="Current Medications "
            id="outlined-multiline-static"
            name="medsList"
            defaultValue={medRecord.currentMedications}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

      </Grid>
      <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={8} >

          <TextField style={{ width: '100%' }}
            InputProps={{
              readOnly: true,
            }}
            name="allergies"
            id="outlined-multiline-static"
            label="Allergies Reactions to Treatment"
            multiline
            rows={4}
            onChange={(e) => onChange(e)}
            value={medRecord.AllergiesReactionstoTreatment || ""}

          />
      
  

        </Grid>
        <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item >

        <Button variant="contained" onClick={() => {
            clickpdf();
          }}>print pdf</Button>
  
        </Grid>


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

    </Box>
  );
}
