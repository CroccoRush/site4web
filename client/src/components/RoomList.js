import React, {useContext} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import RoomCard from "./RoomCard";
import {observer} from "mobx-react-lite";

const RoomList = observer(() => {
    const {room} = useContext(Context)

    return (
        <Row className={"d-flex w-100 align-items-center justify-content-around"}>
            {
                room.rooms.map(room =>
                    <RoomCard key={room.id} room={room}/>
                )
            }
        </Row>
    );
});

export default RoomList;