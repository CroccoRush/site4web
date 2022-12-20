import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import ContentSpace from "../components/ContentSpace";
import DescriptionSpace from "../components/DescriptionSpace";
import RoomChat from "../components/RoomChat";
import {getChat, getChatMessages, getContent, getOneRoom} from "../http/roomAPI";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import DeletingUserRooms from "../components/DeletingUserRooms";


const Room = observer(() => {
    const [room, setRoom] = useState({})
    const [contentName, setContentName] = useState()
    const [chat, setChat] = useState({})
    const [messages, setMessages] = useState([])
    const [owner, setOwner] = useState(false)
    const {id} = useParams()
    useEffect(() => {
        getOneRoom(id).then(
            data => {
                setRoom(data);
                if (Number(data.userId) === Number(localStorage.getItem('userId'))) { setOwner(true) }
                getContent(data.contentId).then(
                    data => { setContentName(process.env.REACT_APP_API_URL + data.name) }
                );
                getChat(data.chatId).then(chatData => {
                    setChat(chatData)
                    getChatMessages(chatData.id).then(messagesData => {
                        setMessages(messagesData.rows)
                    })
                });
            })

    }, [])
    //TODO сделать нормальную передачу контента, сделать контент разнообразным(видео, картинки, текст)
    return (
        <Container
            style={{border: "3px solid #ddd", borderRadius: "5px", height:"87vh", paddingBottom:"10px"}}
            className={"d-flex flex-column align-items-center mt-3"}
        >
            <Container className={"d-flex justify-content-center align-items-center mt-3 w-100"}>
                <h1 style={{fontSize: 24, margin: "auto"}}>{room.name}</h1>
                {
                    owner ?
                        <DeletingUserRooms id={id} />
                        :
                        <></>
                }
            </Container>
            <div className={"d-flex w-100 h-100 justify-content-between align-items-center mt-3"}>
                <div style={{marginRight: "5px"}} className={"d-flex h-100 w-50 flex-column justify-content-between align-items-center"}>
                    <ContentSpace contentName={contentName} />
                    <DescriptionSpace description={room.description}/>
                </div>
                <div style={{border: "3px solid #ddd", borderRadius: "5px", marginLeft: "5px"}} className={'h-100 w-50 d-flex'}>
                    <RoomChat chatId={chat.id} oldMessages={messages}/>
                </div>
            </div>
        </Container>
    );
});

export default Room;