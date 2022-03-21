import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    width: 160,
  },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'birthDate', headerName: 'BirthDate', width: 130 },
  { field: 'sex', headerName: 'Sex', width: 130 },
  { field: 'adress', headerName: 'Adress', width: 130 },

 
];



export default function Users() {
  const [role, setRole] = React.useState('');
  const [rows, setRows] = React.useState([  ]);

  
  React.useEffect(() => {
    async function fetchData() {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      console.log(accessToken)
      const response = await axios.get("http://localhost:3001/users") ;
      console.log(response.data)
      setRows(response.data)
    }
    fetchData();
  }, []); 
  

  const handleChange = (event) => {
    setRole(event.target.value);
  };



  return (
    <>
      <TextField id="filled-basic" label="Search" variant="outlined" sx={{ m: 5 }} style={{ width: '80%', textAlign: "center" }} placeholder='Search' />
      <FormControl sx={{ my: 5 }} style={{ width: '10%' }}>
        <InputLabel id="demo-simple-select-label">role</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Admin</MenuItem>
          <MenuItem value={20}>Patient</MenuItem>
          <MenuItem value={30}>Doctor</MenuItem>
        </Select>
      </FormControl>
      <div style={{ height: 400, width: '99%' }} >
        <DataGrid
          sx={{ mx: 4 }}
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
}
