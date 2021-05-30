import { useEffect, useRef, useState } from "react";
import webSocket from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

const useSocket = (username, room) => {
    const [users, setUsers] = useState([]);
    const [msgs, setMsgs] = useState([]);
    const [socketId, setSocketId] = useState("");
    const socketRef = useRef();

    const sendMsg = (message) => {
        socketRef.current.emit("message", message);
    }
    const receiveMsg = ({ type, name, msg, time, id }) => {
        setMsgs(preMsgs => [...preMsgs, { type, name, msg, time, self: id === socketRef.current.id }]);
    }

    const leaveRoom = () => {
        socketRef.current.close();
    }
    useEffect(() => {
        socketRef.current = webSocket(SERVER_URL);
        setSocketId(socketRef.current.id);
        socketRef.current.on('message', receiveMsg);
        socketRef.current.on('roomUsers', users => {
            setUsers(users);
        });
        socketRef.current.emit("joinRoom", { username, room });

    }, [username, room]);

    return [users, socketId, msgs, sendMsg, leaveRoom]
}

export default useSocket;
