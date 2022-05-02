import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Moment from 'moment';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import UpdateReclamationComponent from './UpdateReclamationComponent';
import { ToastContainer, toast } from 'react-toastify';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PatientReclamations() {

    const [expanded, setExpanded] = React.useState(false);
    const [reclamations, setReclamations] = React.useState([]);
    const [patient, setPatient] = React.useState();
    const [doctor, setDoctor] = React.useState();
    const [selectedRow, setSelectedRow] = React.useState();
    const [selectedId, setSelectedId] = React.useState();
    const [input, setInput] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [SearchField, setSearchField] = React.useState();

    const [lst, setLst] = React.useState([]);


    const handleClose = () => setOpen(false);


    React.useEffect(() => {
        console.log(open)
        fetchreclamation()
    }, []);

    React.useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        axios.get("http://localhost:3001/users/getUser").then((response) => {
            setPatient(response.data.user)
            console.log(response)
        })
    }, []);

    const handleChangeSearch = (newValue) => {
        
        setLst([])
        console.log(newValue.target.value)
        setSearchField(newValue.target.value)
        if(newValue.target.value.length>0){
            reclamations.forEach(element => {
                if (element.doctor.firstName.includes(SearchField)){
                    console.log(element)
                    lst.push(element)
                    setReclamations(lst)
    
                }
               
    
            });
        }
        else {
            fetchreclamation()

        }

    }

    const fetchreclamation = (data) => {
        axios.get("http://localhost:3001/reclamations").then((res) => {
            //    lst = res.data
            setReclamations(res.data)


        })
    }
    const handleClick = (data) => {
        console.log(data)
        axios.put("http://localhost:3001/reclamations/" + data._id).then((res) => {
            fetchreclamation()

        })
    };

    const handleDeleteClick = (data) => {
        console.log(data)
        axios.delete("http://localhost:3001/reclamations/" + data._id).then((res) => {
            fetchreclamation()

        })

        toast("Reclamation deleted successfully")
    };

    const handleOpen = (row) => {
        console.log(row)
        setSelectedRow(row.description)
        setSelectedId(row._id)
        setOpen(true);
    }

    const handleUpdateClick = () => {
        console.log("clickedddddddd")
        console.log(input)
        axios.put("http://localhost:3001/reclamations/updateReclamationDescription/" + selectedId, {
            description: input,
        }).then((res) => {
            fetchreclamation()
            setOpen(false)
        })
    };
    const pull_data = (data) => {
        handleUpdateClick()

    }

    return (
       
            <Grid container spacing={2}>

                {reclamations.map((row) => (

                    <Grid item xs={4} key={Math.random().toString(36).substr(2, 9)}>

                        {(() => {
                            if (row.read == false && row.patient._id === patient._id) {
                                return (
                                    <Card sx={{ maxWidth: 345 }} >
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    R
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings" onClick={() => { handleClick(row); }}>

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

                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites" onClick={() => { handleOpen(row); }}>
                                                <UpdateIcon />
                                            </IconButton>
                                            <IconButton aria-label="share" onClick={() => { handleDeleteClick(row); }}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >

                                                <UpdateReclamationComponent idrecla={selectedId} func={pull_data}  ></UpdateReclamationComponent>

                                            </Modal>
                                        </CardActions>
                                    </Card>

                                )
                            }

                            return null;
                        })()}

                    </Grid>
                ))}
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
      

    );
}
