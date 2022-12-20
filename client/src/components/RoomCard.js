import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {ROOM_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {getContent} from "../http/roomAPI";

const RoomCard = observer(({room}) => {
    const history = useHistory()
    const rooms = useContext(Context).room;
    const [contentName, setContentName] = useState()
    useEffect(() => {
        getContent(room.contentId).then(data => setContentName(process.env.REACT_APP_API_URL + data.name))
    }, [])
    //"https://i.pinimg.com/originals/f9/50/8c/f9508cde9276bccbac3b51ef27f0d798.gif"
    return (
        <Col md={4} className={"mb-3"}>
            <Card style={{ maxWidth: '18rem'}}>
                <Card.Img
                    style={{ maxWidth: '18rem', maxHeight: '54vh'}}
                    variant="top"
                    src={contentName}
                />
                <Card.Body>
                    <Card.Title>{room.name}</Card.Title>
                    <Card.Text>
                        {room.description}
                    </Card.Text>
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            rooms.setSelectedRoom(room)
                            history.push(ROOM_ROUTE + `/${room.id}`)
                        }}
                    >Enter the room</Button>
                </Card.Body>
            </Card>
        </Col>
    );
});

export default RoomCard;