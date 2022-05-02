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
import PatientReclamations from './PatientReclamations';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


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


export default function UpdateReclamationComponent(props) {
    let lst = []
    const navigate = useNavigate();

    const [input, setInput] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [reclamations, setReclamations] = React.useState([]);

    const handleClose = () => setOpen(false);

    const fetchreclamation = (data) => {
        axios.get("http://localhost:3001/reclamations").then((res) => {
            lst = res.data
            console.log(res.data)
            setReclamations(res.data)
        })
    }

    const handleUpdateClick = () => {
        console.log("clickedddddddCHILD")

        console.log(props.idrecla)

        axios.put("http://localhost:3001/reclamations/updateReclamationDescription/" + props.idrecla, {
            description: input,

        }).then((res) => {
            props.func('My name is Dean Winchester & this is my brother Sammie');
            fetchreclamation()
            toast("Reclamation updated successfully")

        })

    };

    return (

        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h4">
                Update Details :
            </Typography>
            <TextField style={{ width: '100%' }}
                name="details"
                id="outlined-multiline-static"
                label="Details"
                multiline
                rows={4}
                onInput={e => setInput(e.target.value)}
            />
            <Button variant="contained" style={{ marginTop: '20px' }} onClick={() => { handleUpdateClick(); }} type="submit">Update</Button>
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
        </Box>

    );
}
