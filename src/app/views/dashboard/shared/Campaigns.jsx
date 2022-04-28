import React from 'react'
import { Small } from 'app/components/Typography'
import { Box, useTheme } from '@mui/system'
import { SimpleCard, MatxProgressBar } from 'app/components'
import {Grid, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';


import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const doctors=[
    {
        id:0,
        firstName:'mohamed',
        lastName:'ben Ali',
        specialite:'anesthésiologie',
        description:'Diplomée en échographie cardiaque de la Faculté de Médecine d\'Amiens Ancienne Résidente de l\'institut de Cardiologie de Montréal et de l\'institut de Cardiologie de Québec Doctorat en recherche médicale de l\'Université Laval Expert en Echographie de Stress et d\'Effort',
        address:' Bizerte Nord Bizerte Tunisie ',
        rating:3

    },
    {
        id:1,
        firstName:'Wafa',
        lastName:'Boughanmi',
        specialite:'cardiologue',
        description:'Diplomée en échographie cardiaque de la Faculté de Médecine d\'Amiens Ancienne Résidente de l\'institut de Cardiologie de Montréal et de l\'institut de Cardiologie de Québec Doctorat en recherche médicale de l\'Université Laval Expert en Echographie de Stress et d\'Effort',
        address:' Bizerte Nord Bizerte Tunisie ',
        rating:5

    },
    {
        id:2,
        firstName:'ahmed',
        lastName:'mechergui',
        specialite:'andrologie',
        description:'Diplomée en échographie cardiaque de la Faculté de Médecine d\'Amiens Ancienne Résidente de l\'institut de Cardiologie de Montréal et de l\'institut de Cardiologie de Québec Doctorat en recherche médicale de l\'Université Laval Expert en Echographie de Stress et d\'Effort',
        address:' Bizerte Nord Bizerte Tunisie ',
        rating:2

    },
]

const Campaigns = () => {

    const theme = useTheme()
    const secondary = theme.palette.text.secondary


        const [value,setValue] = React.useState(doctors[0].rating);
    const [hover, setHover] = React.useState(-1);
    const [value1,setValue1] = React.useState(doctors[1].rating);
    const [hover1, setHover1] = React.useState(-1);
    const [value2,setValue2] = React.useState(doctors[2].rating);
    const [hover2, setHover2] = React.useState(-1);

    return (
        <div>
            <br/><br/>
            <Grid container={true} direction="row"
                  justifyContent="center"
                  alignItems="center"
            rowSpacing={4}>
                <Grid item xs={6}>
                    <TextField

                        id="filled-basic"
                        label="Search"
                        variant="outlined"
                         sx={{m: 3}}

                        placeholder="Search for symptoms"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={10}>

                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 1000,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                    <Avatar src="/broken-image.jpg"  sx={{ width: 160, height: 160 }} style={{margin:'20px'}}/>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={4}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            <h1>DR {doctors[0].firstName} {doctors[0].lastName}</h1>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <h4>{doctors[0].description}</h4>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <h3>{doctors[0].address}</h3>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                            review
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        <Box
                                            sx={{
                                                width: 200,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Rating
                                                name="hover-feedback"
                                                value={value}
                                                precision={0.5}
                                                getLabelText={getLabelText}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            {value !== null && (
                                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                            )}
                                        </Box>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>



                </Grid>

                <Grid item xs={10}>

                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 1000,
                                flexGrow: 1,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase sx={{ width: 128, height: 128 }}>
                                        <Avatar src="/broken-image.jpg"  sx={{ width: 160, height: 160 }} style={{margin:'20px'}}/>
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                <h1>DR {doctors[1].firstName} {doctors[1].lastName}</h1>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                <h4>{doctors[1].description}</h4>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <h3>{doctors[1].address}</h3>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                                review
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div">
                                            <Box
                                                sx={{
                                                    width: 200,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Rating
                                                    name="hover-feedback"
                                                    value={value1}
                                                    precision={0.5}
                                                    getLabelText={getLabelText}
                                                    onChange={(event, newValue) => {
                                                        setValue1(newValue);
                                                    }}
                                                    onChangeActive={(event, newHover) => {
                                                        setHover1(newHover);
                                                    }}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />
                                                {value1 !== null && (
                                                    <Box sx={{ ml: 2 }}>{labels[hover1 !== -1 ? hover1 : value1]}</Box>
                                                )}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>




                </Grid>

                <Grid item xs={10}>
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 1000,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                    <Avatar src="/broken-image.jpg"  sx={{ width: 160, height: 160 }} style={{margin:'20px'}}/>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            <h1>DR {doctors[2].firstName} {doctors[2].lastName}</h1>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            <h4>{doctors[2].description}</h4>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <h3>{doctors[2].address}</h3>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                            review
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        <Box
                                            sx={{
                                                width: 200,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Rating
                                                name="hover-feedback"
                                                value={value2}
                                                precision={0.5}
                                                getLabelText={getLabelText}
                                                onChange={(event, newValue) => {
                                                    setValue2(newValue);
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover2(newHover);
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            {value2 !== null && (
                                                <Box sx={{ ml: 2 }}>{labels[hover2 !== -1 ? hover2 : value2]}</Box>
                                            )}
                                        </Box>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>



                </Grid>

            </Grid>

        </div>
    )
}

export default Campaigns
