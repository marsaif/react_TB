import React from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import Peer from 'simple-peer'

function Video() {
    const { partnerId, myId } = useParams()

    const userVideo = React.useRef()
    const partnerVideo = React.useRef()
    const socket = React.useRef()

    const acceptCall = (stream) => {
        socket.current.emit('acceptCall', '')

        const peer = new Peer({
            initiator: false,
            stream: stream,
            config: {
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302',
                    },
                ],
            },
        })

        socket.current.on('recieveSignal', (data) => {
            peer.signal(data)
        })

        peer.on('signal', (sig) => {
            socket.current.emit('sendResponseSignal', {
                signal: sig,
            })
        })
        peer.on('stream', (str) => {
            partnerVideo.current.srcObject = str
        })
    }
    React.useEffect(() => {
        socket.current = io.connect('https://tbibi.herokuapp.com')

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                acceptCall(stream)
                if (userVideo.current) {
                    userVideo.current.srcObject = stream
                }
            })
    }, [])

    return (
        <div>
            <video playsInline ref={userVideo} autoPlay />
            <video playsInline autoPlay ref={partnerVideo} />
        </div>
    )
}

export default Video
