import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {io} from "socket.io-client";
import {observer} from "mobx-react-lite";
import MessageCard from "./MessageCard";

const RoomChat = observer(({chatId, oldMessages}) => {
    //TODO сделать чать чуть красивее
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const block = document.getElementById("chat");
        block.scrollTop = block.scrollHeight - block.offsetHeight;
    }, [messages])
    useEffect(() => {
        setMessages(oldMessages)
    }, [oldMessages])

    const socket = io(process.env.REACT_APP_IO_API_URL, {
        transports: [ "websocket" ],
        withCredentials: true,
        pingInterval: 10000,
        pingTimeout: 160000
    })
    socket.on("connect", () => {
        const engine = socket.io.engine;
        console.log(engine.transport.name);
        socket.on('NEW_MESSAGE', (arg) => {
            setMessages(messages.concat([arg]))
        });
        socket.on("disconnect", (reason) => {
            console.log(reason)
        });
    })

    const send = (message) => {
        if (message === '') {
            return
        }
        socket.emit("NEW_MESSAGE", {text: message, userId, chatId});
        console.log(socket.connected);
        setMessage('')
    }
    //------------------------------------------------------------

    return (
        <Container fluid="md" className={"d-flex flex-column align-items-center border-5 border-danger"}>
            <div
                id="chat"
                style={{height: "68vh", overflowY: "auto", scrollBehavior: "smooth"}}
                className={"d-flex flex-column w-100 bg-light m-auto"}
            >
                {
                    messages.map(message =>
                        <MessageCard key={message.id}
                                     message={message}
                                     myMessage={Number(message.userId) === Number(userId)}
                        />
                    )
                }
            </div>
            <Form style={{height: "10%"}} className={"d-flex flex-row w-100 mb-auto"}>
                <Form.Control
                    as="textarea"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <Button
                    style={{width: "15%", padding: "auto"}}
                    variant={"outline-primary"}
                    id="button-addon1"
                    onClick={() => send(message)}
                >
                    SEND
                </Button>
            </Form>
        </Container>
    );
});

export default RoomChat;