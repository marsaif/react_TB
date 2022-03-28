import {
    Card,
    Grid,
    Button,
    
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Paragraph, } from 'app/components/Typography'
import axios from 'axios'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))



const ChangePassword = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        password: '',
        confirmPassword: '',
    })
    const [message, setMessage] = useState('')
    const [id, setId] = useState('')

    const { resetpassword } = useParams()

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const { palette } = useTheme()
    const textError = palette.error.main


    const handleFormSubmit = async (event) => {

        if (userInfo.password !== userInfo.confirmPassword) {
            setMessage("Password and Confirm Password must be the same")
        }
        else {
            await axios.post("http://localhost:3001/users/update-password", { id: id, password: userInfo.password })
            navigate("/session/signin")
        }

    }
    
    React.useEffect(() => {
        const getUserId = async () => {
            try {
                const data = await axios.post("http://localhost:3001/users/verify-resetpassword", { resetpassword: resetpassword })
                setId(data.data.id)
            } catch (error) {
                navigate("/session/404")
            }


        }
        getUserId()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="New Password"
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    value={userInfo.password}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required',
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    label="Confirm password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    type="password"
                                    value={userInfo.confirmPassword}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />


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
                                        Change
                                    </Button>

                                </FlexBox>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default ChangePassword

