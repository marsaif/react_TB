import React, { useState, useEffect } from 'react'
import './styleChat.scss'
import io from 'socket.io-client'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const socket = io.connect('http://localhost:3002')
socket.emit('join_room', 'chat')

function Chat() {
    const navigate = useNavigate()
    const [messageList, setMessageList] = useState([])
    const [currentMessage, setCurrentMessage] = useState('')
    const [userTyping, setUserTyping] = useState(false)
    const [lastConversations, setLastConversations] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [meUser, setMeUser] = useState()

    const getUser = async () => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        const response = await axios.get('http://localhost:3001/users/getUser')
        setMeUser(response.data.user)
    }

    const saveMessage = (e) => {
        setCurrentMessage(e.target.value)
    }

    const refreshMessages = () => {
        console.log('test')
    }

    const sendData = async () => {
        if (currentMessage != '') {
            const data = {
                room: 'chat',
                content: currentMessage,
                receiverId: currentUser,
                sender: meUser._id,
            }
            await socket.emit('send_message', data)
            setMessageList((list) => [...list, data])
            setCurrentMessage('')
        }
    }

    const getLastConversations = async () => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        const response = await axios.get(
            'http://localhost:3001/conversation/lastconv'
        )
        setLastConversations(response.data.result)
        console.log(response.data.result)
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMessageList((list) => [...list, data])
        })

        socket.on('receive_typing', (data) => {
            setUserTyping(data.typing)
        })
        getUser()
        getLastConversations()
    }, [socket])

    useEffect(() => {
        const data = {
            room: 'chat',
            typing: currentMessage != '',
        }
        socket.emit('user_typing', data)
    }, [currentMessage])

    const getConversation = async (val) => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        const response = await axios.get(
            'http://localhost:3001/conversation/conv/' + val
        )
        setMessageList(response.data.conversation.messages)
    }

    const handleClick = (val) => {
        setCurrentUser(val)
        getConversation(val)
    }

    return (
        <div className="container">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                crossorigin="anonymous"
            />
            <div className="row no-gutters">
                <div className="col-md-4 border-right">
                    <div className="settings-tray">
                        <img
                            className="profile-image"
                            src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg"
                            alt="Profile img"
                        />
                        <span className="settings-tray--right">
                            <i className="material-icons">cached</i>
                            <i className="material-icons">message</i>
                            <i className="material-icons">menu</i>
                        </span>
                    </div>
                    <div className="search-box">
                        <div className="input-wrapper">
                            <i className="material-icons">search</i>
                            <input placeholder="Search here" type="text" />
                        </div>
                    </div>

                    {lastConversations?.map((conversation) => {
                        return (
                            <div
                                className="friend-drawer friend-drawer--onhover"
                                onClick={() =>
                                    handleClick(conversation.user._id)
                                }
                            >
                                <img
                                    className="profile-image"
                                    src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg"
                                    alt=""
                                />
                                <div className="text">
                                    <h6>{conversation.user.firstName}</h6>
                                    <p className="text-muted">
                                        {conversation.lastConversation.content}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-md-8">
                    <div className="settings-tray">
                        <div className="friend-drawer no-gutters friend-drawer--grey">
                            <img
                                className="profile-image"
                                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                                alt=""
                            />
                            <div className="text">
                                <h6> Conversation </h6>
                            </div>
                            <span className="settings-tray--right">
                                <i
                                    className="material-icons"
                                    onClick={refreshMessages}
                                >
                                    cached
                                </i>
                                <i
                                    className="material-icons"
                                    onClick={() =>
                                        navigate('/video-chat/' + currentUser)
                                    }
                                >
                                    ondemand_video
                                </i>
                                <i className="material-icons">message</i>
                                <i className="material-icons">menu</i>
                            </span>
                        </div>
                    </div>
                    <div className="chat-panel">
                        {messageList.map((msg) => {
                            return (
                                <div className="row no-gutters">
                                    <div
                                        className={
                                            'col-md-3 ' +
                                            (meUser._id == msg.sender
                                                ? 'offset-md-9'
                                                : '')
                                        }
                                    >
                                        <div
                                            className={
                                                'chat-bubble ' +
                                                (meUser._id == msg.sender
                                                    ? 'chat-bubble--right'
                                                    : 'chat-bubble--left')
                                            }
                                        >
                                            {msg.content} <br />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {userTyping ? (
                            <div className="row no-gutters">
                                <div className="col-md-3">
                                    <div className="chat-bubble chat-bubble--left">
                                        ...
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}

                        <div className="row">
                            <div className="col-12">
                                <div className="chat-box-tray">
                                    <i className="material-icons">
                                        sentiment_very_satisfied
                                    </i>
                                    <input
                                        style={{ paddingLeft: '2%' }}
                                        type="text"
                                        placeholder="Type your message here..."
                                        value={currentMessage}
                                        onChange={saveMessage}
                                        onKeyPress={(event) => {
                                            event.key === 'Enter' && sendData()
                                        }}
                                    />

                                    <i className="material-icons ">mic</i>
                                    <button
                                        onClick={sendData}
                                        className="unstyled-button"
                                    >
                                        <i className="material-icons">send</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
