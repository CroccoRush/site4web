import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, InputGroup, Row, Form} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import RoomList from "../components/RoomList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getAllRooms, getContentTypes, getRoomsCount} from "../http/roomAPI";
import CreateRoom from "../components/modals/CreateRoom";
import Pages from "../components/Pages";

const Exposition = observer(() => {
    const {room} = useContext(Context)
    const [modalShow, setModalShow] = useState(false);
    const [types, setTypes] = useState([])
    const [roomsCount, setRoomsCount] = useState()
    const [searchText, setSearchText] = useState('')
    const [limit] = useState(2)
    let searchAria

    useEffect(() => {
        getContentTypes().then(data => setTypes(data))
        if (room.selectedTypeId) {
            getAllRooms(searchText, room.selectedTypeId, room.selectedPage, limit).then(data => room.setRooms(data))
            getRoomsCount(searchText, room.selectedTypeId).then(data => setRoomsCount(data))
        } else {
            getAllRooms(searchText, null, room.selectedPage, limit).then(data => room.setRooms(data))
            getRoomsCount(searchText, null).then(data => setRoomsCount(data))
        }
    }, [room.selectedPage, room.selectedTypeId, searchText])

    return (
        <Container>
            <Row className={"mt-3"}>
                <Col md={2}>
                    <Button
                        variant={"outline-primary"}
                        className={"mb-3 p-2 w-100"}
                        onClick={() => setModalShow(true)}
                    >
                        Создать новую комнату
                    </Button>
                    {
                        // TODO сделать не форму а отдельную страницу
                    }
                    <CreateRoom
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        types={types}
                    />
                    <TypeBar/>
                </Col>
                <Col md={9} style={{minHeight: '85vh'}} className={"d-flex flex-column align-items-center"}>

                    <InputGroup className="mb-3" style={{height: "42px"}}>
                        <Button
                            variant="outline-primary"
                            id="button-addon1"
                            onClick={() => {
                                room.setSelectedPage(1)
                                setSearchText(searchAria)
                            }}
                        >
                            Поиск
                        </Button>
                        <Form.Control
                            placeholder="Название комнаты..."
                            value={searchAria}
                            onChange={e => searchAria = e.target.value}
                        />
                    </InputGroup>

                    <RoomList/>
                    <Pages
                        roomsCount = {roomsCount}
                        limit = {limit}
                    />
                </Col>
            </Row>
        </Container>
    );
});

export default Exposition;