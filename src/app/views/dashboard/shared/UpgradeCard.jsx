import React, { useState, useEffect } from 'react'
import { Card, Button } from '@mui/material'
import { styled } from '@mui/system'
import { convertHexToRGB } from 'app/utils/utils'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const CardRoot = styled(Card)(({ theme }) => ({
    marginBottom: '24px',
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    position: 'relative',
    background: `rgb(${convertHexToRGB(
        theme.palette.primary.main
    )}, 0.15) !important`,
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    paddingTop: '24px',
    paddingBottom: '24px',
    color: theme.palette.text.secondary,
}))

const UpgradeCard = () => {
    const [meUser, setMeUser] = useState()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        axios
            .get('https://tbibi.herokuapp.com/users/getUser')
            .then((response) => {
                setMeUser(response.data.user)
            })
    }, [])

    console.log(meUser)

    const [subs] = useState({
        name: 'subscription to tbibi platform',
        price: 20,
    })
    const makePayment = (token) => {
        const body = {
            token,
            subs,
            meUser,
        }
        axios
            .post(
                'https://tbibi.herokuapp.com/payments/create-checkout-session',
                {
                    body: body,
                }
            )
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const handleClick = (event) => {}

    return (
        <CardRoot>
            <StyledCard elevation={0}>
                <img
                    src="/assets/images/illustrations/upgrade.svg"
                    alt="upgrade"
                />
                <Paragraph>
                    Upgrade to <b>Prenium</b> for <br /> for more services
                </Paragraph>
                <StripeCheckout
                    stripeKey="pk_test_51KeJ0kJ2m5v52NCmQOY87D88SkU0dryWio8WvM11q71WtJAraGzWuostHCekl8rr0ziJTmIcr7I6r7cd2gqf3nJX00BU5oCNna"
                    token={makePayment}
                    name="subscription to tbibi"
                    amount={subs.price * 100}
                >
                    <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        sx={{ textTransform: 'uppercase' }}
                        onClick={handleClick}
                    >
                        upgrade now
                    </Button>
                </StripeCheckout>
            </StyledCard>
        </CardRoot>
    )
}

export default UpgradeCard
