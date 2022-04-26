import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function VerifyUser() {
    const { token } = useParams()

    const navigate = useNavigate()
    React.useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.post('https://tbibi.herokuapp.com/users/active', {
                    token: token,
                })
                navigate('/session/signin')
            } catch (error) {
                navigate('/session/404')
            }
        }
        verifyToken()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>VerifyUser</div>
}
