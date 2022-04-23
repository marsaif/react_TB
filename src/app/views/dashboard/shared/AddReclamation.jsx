
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

import { Card, Button } from '@mui/material'
import { styled } from '@mui/system'
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function AddReclamation() {
    const [role, setRole] = React.useState('');
    const [rows, setRows] = React.useState([]);

    const CardRoot = styled(Card)(({ theme }) => ({
        marginBottom: '24px',
        padding: '24px !important',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '16px !important',
        },
    }))

    const StyledCard = styled(Card)(({ theme }) => ({
        boxShadow: 'none',
        textAlign: 'center',
        position: 'relative',
        background: `rgb(${convertHexToRGB(
            theme.palette.primary.main
        )}, 0.15) !important`,
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
    
    const acceptDoctor = async (id) => {


        await axios.post("http://localhost:3001/users/accept-doctor", { id: id });
        fetchData()
    }
    async function fetchData() {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        const response = await axios.get("http://localhost:3001/users");
        setRows(response.data)
    }

    React.useEffect(() => {

        fetchData();
    }, []);



 

 
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
        <CardRoot   >
            <StyledCard elevation={0} >
                <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/claims-2021941-1705361.png" width="100px"
                    alt="upgrade"
                />
                <Paragraph>
                    If you have any problem please make a <b>claim</b>  

                </Paragraph>


                <Grid container spacing={2}>
                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Doctor Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age} 
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Details"
                            multiline
                            rows={4}
                            fullWidth 
                        />
                    </Grid>


                </Grid>
          
                <Button variant="contained">Submit</Button>

            </StyledCard>
        </CardRoot>
    );
}
