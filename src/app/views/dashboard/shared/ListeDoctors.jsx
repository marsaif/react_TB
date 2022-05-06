import * as React from 'react';
import  { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import Typography from '@mui/material/Typography';

export default function ListDoctors() {


    const [data , setData] = useState([])
    useEffect(() => {
        // Update the document title using the browser API
        axios.get("http://localhost:3001/users/medtn/Chirurgie Plastique").then((res) => {
           setData(res.data)
        })
      },[]);

  return (
      <>
    {data.map((row) => (
    <List sx={{ width: '100%',  maxWidth: '60%', bgcolor: 'background.paper', marginInline:'20%',marginTop:'2%'}}>
    
    
      <ListItem alignItems="flex-start">
        
        <ListItemText
          primary={row.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {row.Adress}
                <br/>
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              {row.telephone}
                <br/>
              </Typography>
              {row.Map}
            </React.Fragment>
          }
        />
        
      </ListItem>
      <Divider variant="inset" component="li" />
   
    
 
    </List> ))}</>
  );
}
