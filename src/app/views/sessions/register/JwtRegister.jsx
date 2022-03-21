import useAuth from 'app/hooks/useAuth'
import React, { useState } from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Paragraph, Span } from 'app/components/Typography'
import { Card, FormControlLabel, Grid, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRegister = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const JwtRegister = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({role:"PATIENT",sex:"man"})
    const { register } = useAuth()
    const [message, setMessage] = useState('')

    
    const { palette } = useTheme()
    const textError = palette.error.main

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })

    }


    const handleFormSubmit = async (event) => {
        try {

            if(state.role === "PATIENT")
            {
                state.speciality=''
            }
            await register(state.email, state.firstName, state.password, state.confirm, state.phone, state.birthDate, state.adress, state.sex, state.role ,state.speciality)
            navigate('/check-email')
        } catch (e) {
            console.log(e)
            setMessage(e.message)

        }
    }

    let { firstName, email, password, confirm, phone, birthDate, adress,role ,sex,speciality} = state

    return (
        <JWTRegister>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <ContentBox>
                            <IMG
                                src="/assets/images/illustrations/posting_photo.svg"
                                alt=""
                            />
                        </ContentBox>
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
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Confirm Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="confirm"
                                    type="password"
                                    value={confirm || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
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
                                <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="role"
                                    value={role}
                                    label="Role"
                                    onChange={handleChange}
                                    sx={{ mb: 3, width: '100%' }}
                                >
                                    <MenuItem value="PATIENT">Patient</MenuItem>
                                    <MenuItem value="DOCTOR">Doctor</MenuItem>
                                </Select>
                                </FormControl>
                                {
                                    state.role === "DOCTOR" ? (
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
                                    ): ""
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

                                {message && (
                                    <Paragraph sx={{ color: textError }}>
                                        {message}
                                    </Paragraph>
                                )}


                                <FlexBox>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        sx={{ textTransform: 'capitalize' }}
                                    >
                                        Sign up
                                    </Button>
                                    <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/session/signin")}
                                    >
                                        Sign in
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </JWTRegister>
    )
}

export default JwtRegister
