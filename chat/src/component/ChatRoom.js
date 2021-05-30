import React, { useState } from 'react'
import './ChatRoom.css';
import { Rooms } from './data';
import useSocket from './useSocket';


const ChatRoom = ({ username, room, loginHandle }) => {
    const [msg, setMsg] = useState("");
    const [users, currentId, msgs, sendMsg, leaveRoom] = useSocket(username, room);
    return (
        <div className="ChatRoom">
            <header className="ChatRoom-header">
                <h1 className="ChatRoom-logo">ChatRoom</h1>
                <div className="ChatRoom-leave" onClick={() => {
                    leaveRoom();
                    loginHandle(false);
                }}>
                    離開房間
                </div>
            </header>
            <main className="ChatRoom-main">
                <div className="ChatRoom-sidebar">
                    <h3><i className="fas fa-comments"></i> 房間名稱:</h3>
                    <h2 id="room-name">
                        {Rooms.filter(({ value }) => value === room)[0].text}
                    </h2>
                    <h3><i className="fas fa-users"></i> 在線名單</h3>
                    <ul id="users">
                        {
                            users.map(({ id, username }, i) => {
                                if (id !== currentId) {
                                    return <li key={i}>{username}</li>
                                } else return "";

                            })
                        }
                    </ul>
                </div>
                <div className="ChatRoom-messages">
                    {
                        msgs.map(({ type, name, msg, time, self }, i) => {
                            if (type === "System") {
                                return <div key={i} className="message system">
                                    {msg} <span>{time}</span>
                                </div>
                            } else {
                                return <div key={i} className={`message ${self ? "self" : ""}`}>
                                    <p className="meta">
                                        {name}
                                        <span>{time}</span>
                                    </p>

                                    <p className="text">
                                        {msg}
                                    </p>
                                </div>
                            }
                        })
                    }
                </div>
            </main>
            <div className="ChatRoom-edit">
                <button className="ChatRoom-send" onClick={() => {
                    if (msg.length > 0) {
                        sendMsg(msg);
                        setMsg("");
                    }
                }}>
                    Send
                </button>
                <input
                    id="msg"
                    type="text"
                    value={msg}
                    placeholder="輸入訊息"
                    required
                    autoComplete="off"
                    onChange={(e) => {
                        setMsg(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13 && msg.length > 0) {
                            sendMsg(msg);
                            setMsg("");
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default ChatRoom
