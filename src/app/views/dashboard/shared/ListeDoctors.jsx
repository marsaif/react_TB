import * as React from 'react';
import  { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import {useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Avatar, Button, ButtonBase, Grid, Paper } from '@mui/material';
import ContactPhone from '@mui/icons-material/ContactPhoneOutlined'

import LocationIcon from '@mui/icons-material/AddLocationAltTwoTone'

export default function ListDoctors() {


    const {sp}=useParams()
    const [loding , setLoding] = useState(true)

    const [data , setData] = useState([])
    useEffect(() => {
        // Update the document title using the browser API
        axios.get("http://localhost:3001/users/medtn/"+sp).then((res) => {
           setData(res.data)
           setLoding(false)
        })
      },[]);


      function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        }
    }
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

  return (
      <>
      {loding && (
          <Box sx={{ display: 'flex' , margin:'30%'}}>
          <CircularProgress />
        </Box>
      )}
       
    {data.map((row) => (
    // <List sx={{ width: '100%',  maxWidth: '60%', bgcolor: 'background.paper', marginInline:'20%',marginTop:'2%'}}>
    
    
    //   <ListItem alignItems="flex-start">
        
    //     <ListItemText
    //       primary={row.name}
    //       secondary={
    //         <React.Fragment>
    //           <Typography
    //             sx={{ display: 'inline' }}
    //             component="span"
    //             variant="body2"
    //             color="text.primary"
    //           >
    //           {row.telephone}
    //             <br/>
    //           </Typography>
    //           <a href={row.Map}>
    //             {row.Adress}
    //           </a>
              
    //         </React.Fragment>
    //       }
    //     />
        
    //   </ListItem>
    //   <Divider variant="inset" component="li" />
   
    
 
    // </List> 
    <Grid 
    direction="row"
    justifyContent="center"
    alignItems="center"
    rowSpacing={4}>
      <Grid item xs={8} key={row.name} sx={{marginTop:10}}>
  
      <Paper
          elevation={6}
          sx={{
              p: 4,
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
                              row.name
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
                              {row.name}
                          </Typography>
                          
                          <Typography
                              variant="body2"
                              color="text.secondary"
                          >
                              <LocationIcon
                                  color="secondary"
                                  fontSize={'small'}
                              />
                              <a href={row.Map}>{row.Adress}</a> 
                          </Typography>
                          <Typography
                              variant="body2"
                              color="text.secondary"
                          >
                              <ContactPhone
                                  color="success"
                                  fontSize={'small'}
                              />{' '}
                              
                              <a
                                  href={`tel:${row.telephone}`}
                              >
                                  {row.telephone}
                              </a>
                          </Typography>
                      </Grid>
                      
                  </Grid>
                
              </Grid>
          </Grid>
      </Paper>
  </Grid>
</Grid>
    ))}
    
    
    
    </>
  );
}
