import React, { useState, useEffect } from 'react'
import './Login.css';
import { Rooms } from './data';

const Login = ({ loginHandle }) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("default");
    const [verify, setVerify] = useState(false);

    const userNameVerify = (value) => {
        return value.length >= 4;
    }

    const roomVerify = (value) => {
        return value !== "default";
    }

    useEffect(() => {
        setVerify(userNameVerify(username) && roomVerify(room));
    }, [username, room]);

    return (
        <div className="Login">
            <header className="Login-header">
                <h1>Realtime Chat</h1>
            </header>
            <main className="Login-main">
                <div className="form-control">
                    <label htmlFor="username">UserName</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        placeholder="輸入名稱"
                        autoComplete="off"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="room">Room</label>
                    <select
                        name="room"
                        id="room"
                        value={room}
                        onChange={(e) => {
                            setRoom(e.target.value);
                        }}>
                        <option value="default" disabled>請選擇房間</option>;
                        {
                            Rooms.map(({ value, text }, i) => {
                                return <option key={i} value={value}>{text}</option>;
                            })
                        }
                    </select>
                </div>
                <button
                    className={`Login-btn ${verify ? "Login-btn-success" : ""}`}
                    onClick={() => {
                        if (verify)
                            loginHandle(true, username, room);
                    }}>
                    進入聊天室
                </button>
            </main>
        </div>
    )
}

export default Login
