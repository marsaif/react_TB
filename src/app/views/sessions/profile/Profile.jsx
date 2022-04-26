import * as React from 'react'
import Box from '@mui/material/Box'
import {
    Button,
    Card,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Divider,
    CardActions,
} from '@mui/material'
import axios from 'axios'
import { TextValidator } from 'react-material-ui-form-validator'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { styled } from '@mui/system'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

function Profile() {
    const [user, setUser] = React.useState({ sex: 'man' })

    const [photo, setPhoto] = React.useState(null)
    const [status, setStatus] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState(null)

    React.useEffect(() => {
        if (photo) {
            setImageUrl(URL.createObjectURL(photo))
        }
    }, [photo])

    const onSubmit = async () => {
        if (photo) {
            const formData = new FormData()
            console.log(photo)
            formData.append('photo', photo)
            formData.append('id', user._id)
            const genericErrorMessage =
                'Something went wrong! Please try again later.'

            try {
                const response = await fetch(
                    'https://tbibi.herokuapp.com/users/upload-photo',
                    {
                        method: 'POST',
                        body: formData,
                    }
                )
                const data = await response.json()
                if (response.status === 200) {
                    setStatus({
                        type: 'success',
                        message: 'Image updated succesfully',
                    })
                    setUser({
                        ...user,
                        image: `https://tbibi.herokuapp.com/${data}`,
                    })
                    setPhoto(null)
                } else {
                    setStatus({
                        type: 'error',
                        message: data?.message || genericErrorMessage,
                    })
                }
            } catch (error) {
                setStatus({ type: 'error', message: genericErrorMessage })
                console.log(error)
            }
        }
    }

    React.useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(user)

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
            await axios.put('https://tbibi.herokuapp.com/users/profile', user)
            toast('Profile updated!')
        } catch (error) {
            toast.error('Email exist!')
        }
    }

    const getUser = async () => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        const response = await axios.get(
            'https://tbibi.herokuapp.com/users/getUser'
        )
        response.data.user.image = `https://tbibi.herokuapp.com/${response.data.user.image}`
        response.data.user.birthDate = getDate(response.data.user.birthDate)
        setUser(response.data.user)
    }

    const getDate = (birthDate) => {
        var date = new Date(birthDate)

        const currentMonth = date.getMonth() + 1
        const monthString =
            currentMonth >= 10 ? currentMonth : `0${currentMonth}`
        const currentDate = date.getDate()
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`
        return `${date.getFullYear()}-${monthString}-${dateString}`
    }

    let {
        firstName,
        email,
        phone,
        birthDate,
        adress,
        sex,
        speciality,
        role,
        image,
    } = user

    return (
        <>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <img
                            src={image}
                            width="300px"
                            height="200px"
                            style={{ margin: 100 }}
                        ></img>
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

                                {role === 'DOCTOR' ? (
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
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    />
                                ) : (
                                    ''
                                )}
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Gender
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="sex"
                                    onChange={handleChange}
                                    value={sex}
                                >
                                    <FormControlLabel
                                        value="woman"
                                        control={<Radio />}
                                        label="Woman"
                                    />
                                    <FormControlLabel
                                        value="man"
                                        control={<Radio />}
                                        label="Man"
                                    />
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

            {imageUrl && photo && (
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    textAlign="center"
                >
                    <div>New Image Preview:</div>
                    <img src={imageUrl} alt={photo.name} height="100px" />
                </Box>
            )}

            <Divider />
            <CardActions>
                <Button fullWidth component="label">
                    Choose an image
                    <input
                        type="file"
                        hidden
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </Button>
                <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    disabled={!photo}
                    onClick={onSubmit}
                >
                    Upload picture
                </Button>
            </CardActions>
        </>
    )
}

export default Profile
