import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import { useParams } from 'react-router-dom'

export default function VideoChat() {
    const userVideo = useRef()
    const partnerVideo = useRef()
    const socket = useRef()
    const [signal, setSignal] = useState()
    const { partnerId, myId } = useParams()

    const callPeer = (stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        })

        peer.on('signal', (data) => {
            socket.current.on('callAccepted', (s) => {
                socket.current.emit('sendSignal', {
                    signal: data,
                })
            })
        })
        socket.current.emit('callUser', {
            userToCall: partnerId,
            from: myId,
        })

        socket.current.on('receiveResponseSignal', (data) => {
            peer.signal(data)
        })
        peer.on('stream', (stream) => {
            partnerVideo.current.srcObject = stream
        })
    }

    useEffect(() => {
        socket.current = io.connect('http://localhost:3002')

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                callPeer(stream)
                userVideo.current.srcObject = stream
            })
    }, [])

    return (
        <div>
            <video playsInline ref={userVideo} autoPlay />
            <video playsInline autoPlay ref={partnerVideo} />
        </div>
    )
}
