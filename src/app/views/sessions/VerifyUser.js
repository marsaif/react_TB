import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function VerifyUser() {
    const { token } = useParams();

    const navigate = useNavigate()
    React.useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.post("http://localhost:3001/users/active", { token: token })
                navigate("/session/signin")
            } catch (error) {
                navigate("/session/404")
            }


        }
        verifyToken()


    }, []);

    return (
        <div>VerifyUser</div>
    )
}

