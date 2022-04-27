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
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded'
const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

export default function ListeReclamations() {
    let lst = []
    const [expanded, setExpanded] = React.useState(false)
    const [reclamations, setReclamations] = React.useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const fetchreclamation = (data) => {
        axios.get('https://tbibi.herokuapp.com/reclamations').then((res) => {
            lst = res.data
            console.log(res.data)

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
    return (
        <Grid container spacing={2}>
            {reclamations.map((row) => (
                <Grid item xs={4} key={Math.random().toString(36).substr(2, 9)}>
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
                            subheader={Moment(row.date).format('d MMM YYYY')}
                        />

                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                About Doctor : {row.doctor.firstName} <br />
                                Doctor's email : {row.doctor.email} <br />
                                Description : {row.description}
                            </Typography>
                        </CardContent>

                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until
                                    simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or
                                    a large, deep skillet over medium-high heat.
                                    Add chicken, shrimp and chorizo, and cook,
                                    stirring occasionally until lightly browned,
                                    6 to 8 minutes. Transfer shrimp to a large
                                    plate and set aside, leaving chicken and
                                    chorizo in the pan. Add pimentón, bay
                                    leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until
                                    thickened and fragrant, about 10 minutes.
                                    Add saffron broth and remaining 4 1/2 cups
                                    chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute.
                                    Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid
                                    is absorbed, 15 to 18 minutes. Reduce heat
                                    to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice,
                                    and cook again without stirring, until
                                    mussels have opened and rice is just tender,
                                    5 to 7 minutes more. (Discard any mussels
                                    that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10
                                    minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
