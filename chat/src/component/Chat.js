import React, { useState } from 'react'
import ChatRoom from './ChatRoom';
import Login from './Login';

const Chat = () => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const loginHandle = (login, username, room) => {
        if (login) {
            setLogin(true);
            setUsername(username);
            setRoom(room);
        } else {
            setLogin(false);
            setUsername("");
            setRoom("");
        }
    }
    return (
        <div className="Chat">
            {
                login ?
                    <ChatRoom username={username} room={room} loginHandle={loginHandle} />
                    :
                    <Login loginHandle={loginHandle} />
            }

        </div>
    )
}

export default Chat
