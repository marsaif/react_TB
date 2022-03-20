import React , { useState , useEffect }from 'react'
import './styleChat.scss'
import io from "socket.io-client";
import axios from 'axios';


const socket = io.connect("http://localhost:3002");
socket.emit("join_room", "test");


function Chat() {
    const [messageList, setMessageList] = useState([]); 
    const [currentMessage, setCurrentMessage] = useState("")
    const [userTyping,setUserTyping] = useState(false)

    const saveMessage = (e) => {
        setCurrentMessage(e.target.value) ; 
    }

    const refreshMessages = () => {
        console.log("test") ; 
    }

    const sendData = async () => {
        if (currentMessage != "")
        {
            const data = {
                room : 'test',
                message : currentMessage , 
                id : socket.id ,
                time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            }
           await socket.emit("send_message",data)
           setMessageList((list) => [...list, data]);
           setCurrentMessage("")
        }

    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });

        socket.on("receive_typing", (data) => {
          setUserTyping(data.typing);
        });

      }, [socket]);

    useEffect(() => {
      const data = {
        id : socket.id ,
        room : 'test',
        typing : currentMessage != ""
      }
      socket.emit("user_typing" , data)
    },[currentMessage])

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
                        <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img" />
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
                    <div className="friend-drawer friend-drawer--onhover">
                        <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
                        <div className="text">
                            <h6>Robo Cop</h6>
                            <p className="text-muted">Hey, you're arrested!</p>
                        </div>
                        <span className="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div className="friend-drawer friend-drawer--onhover">
                        <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg" alt="" />
                        <div className="text">
                            <h6>Optimus</h6>
                            <p className="text-muted">Wanna grab a beer?</p>
                        </div>
                        <span className="time text-muted small">00:32</span>
                    </div>
                    <hr />
                    <div className="friend-drawer friend-drawer--onhover ">
                        <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" alt="" />
                        <div className="text">
                            <h6>Skynet</h6>
                            <p className="text-muted">Seen that canned piece of s?</p>
                        </div>
                        <span className="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div className="friend-drawer friend-drawer--onhover">
                        <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/termy.jpg" alt="" />
                        <div className="text">
                            <h6>Termy</h6>
                            <p className="text-muted">Im studying spanish...</p>
                        </div>
                        <span className="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div className="friend-drawer friend-drawer--onhover">
                        <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rick.jpg" alt="" />
                        <div className="text">
                            <h6>Richard</h6>
                            <p className="text-muted">I'm not sure...</p>
                        </div>
                        <span className="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div className="friend-drawer friend-drawer--onhover">
                        <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg" alt="" />
                        <div className="text">
                            <h6>XXXXX</h6>
                            <p className="text-muted">Hi, wanna see something?</p>
                        </div>
                        <span className="time text-muted small">13:21</span>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="settings-tray">
                        <div className="friend-drawer no-gutters friend-drawer--grey">
                            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
                            <div className="text">
                                <h6>Robo Cop</h6>
                                <p className="text-muted">Layin' down the law since like before Christ...</p>
                            </div>
                            <span className="settings-tray--right">
                                <i className="material-icons" onClick={refreshMessages}>cached</i>
                                <i className="material-icons">message</i>
                                <i className="material-icons">menu</i>
                            </span>
                        </div>
                    </div>
                    <div className="chat-panel">
                        {
                            messageList.map((msg)=> {
                                return(
                                <div className="row no-gutters">
                                <div className={"col-md-3 " + (msg.id== socket.id ? 'offset-md-9' : '')}>
                                    <div className={"chat-bubble " + (msg.id== socket.id  ? 'chat-bubble--right' : 'chat-bubble--left')}>
                                        {msg.message} <br/>         
                                    </div>
                                    <small style={{marginLeft : "20%"}}>{msg.time}</small>
                                </div>
                            </div>)
                            
                            })
                        }

                        {userTyping ? <div className="row no-gutters">
                                <div className="col-md-3">
                                    <div className="chat-bubble chat-bubble--left">
                                        ...      
                                    </div>
                                </div>
                            </div> : ""}

                        <div className="row">
                            <div className="col-12">
                                <div className="chat-box-tray">
                                    <i className="material-icons">sentiment_very_satisfied</i>
                                    <input style={{paddingLeft: "2%"}} 
                                    type="text" 
                                    placeholder="Type your message here..." 
                                    value={currentMessage} 
                                    onChange={saveMessage}
                                    onKeyPress={(event) => {
                                        event.key === "Enter" && sendData();
                                      }}
                                    />

                                    <i className="material-icons ">mic</i>
                                    <button onClick={sendData}  className="unstyled-button"><i className="material-icons">send</i></button>  
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