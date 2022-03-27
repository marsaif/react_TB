import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

function Profile() {

    const [user, setUser] = React.useState({ sex: "man" })



    React.useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    const handleChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value,
        })


    }

    const handleFormSubmit = (event) => {
        updateProfile()

    }

    const updateProfile = async () => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        try {
            await axios.put("http://localhost:3001/users/profile", user);
            toast("Profile updated!");

        } catch (error) {
            toast.error("Email exist!");
        }
    }

    const getUser = async () => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        const response = await axios.get("http://localhost:3001/users/getUser");
        response.data.user.birthDate = getDate(response.data.user.birthDate)
        setUser(response.data.user)


    }

    const getDate = (birthDate) => {

        var date = new Date(birthDate);

        const currentMonth = date.getMonth() + 1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${date.getFullYear()}-${monthString}-${dateString}`;


    }




  

    let { firstName, email, phone, birthDate, adress, sex, speciality, role } = user

    return (

        <Card className="card">
            <Grid container>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                  
                </Grid>
                <Grid item lg={7} md={7} sm={7} xs={12}>
                    <Box p={4} height="100%">
                        <ValidatorForm onSubmit={handleFormSubmit}>
                            <TextValidator
                                sx={{ mb: 3, width: '100%' }}
                                variant="outlined"
                                size="small"
                                label="firstName"
                                onChange={handleChange}
                                type="text"
                                name="firstName"
                                value={firstName || ''}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                sx={{ mb: 3, width: '100%' }}
                                variant="outlined"
                                size="small"
                                label="Email"
                                onChange={handleChange}
                                type="email"
                                name="email"
                                value={email || ''}
                                validators={['required', 'isEmail']}
                                errorMessages={[
                                    'this field is required',
                                    'email is not valid',
                                ]}
                            />


                            <TextValidator
                                sx={{ mb: '16px', width: '100%' }}
                                label="Phone"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                name="phone"
                                type="number"
                                value={phone || ''}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                sx={{ mb: 3, width: '100%' }}
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                type="date"
                                name="birthDate"
                                value={birthDate || ''}
                                validators={['required']}
                                errorMessages={['this field is required']}

                            />
                            <TextValidator
                                sx={{ mb: 3, width: '100%' }}
                                variant="outlined"
                                size="small"
                                label="Adress"
                                onChange={handleChange}
                                type="text"
                                name="adress"
                                value={adress || ''}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />

                            {
                                role === "DOCTOR" ? (
                                    <TextValidator
                                        sx={{ mb: 3, width: '100%' }}
                                        variant="outlined"
                                        size="small"
                                        label="Speciality"
                                        onChange={handleChange}
                                        type="text"
                                        name="speciality"
                                        value={speciality || ''}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                ) : ""
                            }
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="sex"
                                onChange={handleChange}
                                value={sex}
                            >
                                <FormControlLabel value="woman" control={<Radio />} label="Woman" />
                                <FormControlLabel value="man" control={<Radio />} label="Man" />
                            </RadioGroup>

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


                            <FlexBox>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    Save
                                </Button>


                            </FlexBox>



                        </ValidatorForm>
                    </Box>
                </Grid>

            </Grid>
        </Card>
    );
}



export default Profile