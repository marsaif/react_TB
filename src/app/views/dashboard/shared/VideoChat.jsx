import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client";
import Peer from "simple-peer";
import ReactHowler from "react-howler";

export default function VideoChat() {
    
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [partnerId, setpartnerId] = useState("")
    const [playing, setPlaying] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef() ; 

    const handleChange = (e) => {
        setpartnerId(e.target.value);
    }

    const callPeer = () => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", { userToCall: partnerId, signalData: data, from: socket.current.id })
        })

        socket.current.on("callAccepted", signal => {
            peer.signal(signal);
        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });
    }


    const acceptCall = () => {
        setReceivingCall(false);
        pauseSound() ; 
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });
        peer.on("signal", data => {
          socket.current.emit("acceptCall", { signal: data, to: caller })
        })
    
        peer.on("stream", stream => {
          partnerVideo.current.srcObject = stream;
        });
    
        peer.signal(callerSignal);
      }

      const playSound = () => {
        setPlaying(true);
      };
    
      const pauseSound = () => {
        setPlaying(false);
      };
    

    useEffect(() => {

        socket.current = io.connect("http://localhost:3002");

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })
        socket.current.on("hey", (data) => {
            playSound() ; 
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })

    }, []);
    
    return (
        <div>

            {receivingCall ? (
                <div>
                    <ReactHowler autoPlay playing={playing} src='https://assets.mixkit.co/sfx/download/mixkit-marimba-waiting-ringtone-1360.wav'/>
                    <h1>{caller} is calling you</h1>
                    <button onClick={acceptCall}>Accept</button>
                </div>
            ) : ""}
            <video playsInline ref={userVideo} autoPlay />
            <video playsInline autoPlay ref={partnerVideo} />
            <button onClick={callPeer} >call</button>
            <input type="text" value={partnerId} onChange={handleChange}/>

        </div>
    )
}
