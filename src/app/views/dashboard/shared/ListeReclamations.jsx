import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Moment from 'moment'
import { TextField } from '@mui/material'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded'

export default function ListeReclamations() {
    const [expanded, setExpanded] = React.useState(false)
    const [reclamations, setReclamations] = React.useState([])
    const [SearchField, setSearchField] = React.useState()

    const [lst, setLst] = React.useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const fetchreclamation = (data) => {
        axios.get('https://tbibi.herokuapp.com/reclamations').then((res) => {
            setReclamations(res.data)
        })
    }

    React.useEffect(() => {
        fetchreclamation()
    }, [])

    const handleClick = (data) => {
        console.log(data)
        axios
            .put('https://tbibi.herokuapp.com/reclamations/' + data._id)
            .then((res) => {
                fetchreclamation()

                console.log(res)
            })
    }

    const handleChangeSearch = (newValue) => {
        setLst([])
        console.log(newValue.target.value)
        setSearchField(newValue.target.value)
        if (newValue.target.value.length > 0) {
            reclamations.forEach((element) => {
                if (element.doctor.firstName.includes(SearchField)) {
                    console.log(element)
                    lst.push(element)
                    setReclamations(lst)
                }
            })
        } else {
            fetchreclamation()
        }
    }

    return (
        <>
            <TextField
                id="input-with-icon-textfield"
                label="Search by Doctor Name"
                variant="standard"
                onChange={handleChangeSearch}
                value={SearchField}
            />

            <Grid container spacing={2}>
                {reclamations.map((row) => (
                    <Grid
                        item
                        xs={4}
                        key={Math.random().toString(36).substr(2, 9)}
                    >
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{ bgcolor: red[500] }}
                                        aria-label="recipe"
                                    >
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton
                                        aria-label="settings"
                                        onClick={() => {
                                            handleClick(row)
                                        }}
                                    >
                                        <MarkEmailReadRoundedIcon />
                                    </IconButton>
                                }
                                title={row.patient.firstName}
                                subheader={Moment(row.date).format(
                                    'd MMM YYYY'
                                )}
                            />

                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    About Doctor : {row.doctor.firstName} <br />
                                    Doctor's email : {row.doctor.email} <br />
                                    Description : {row.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
