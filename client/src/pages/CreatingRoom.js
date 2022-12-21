import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {createRoom, getContentTypes} from "../http/roomAPI";
import {ROOM_ROUTE, EXPOSITION_ROUTE} from "../utils/consts";
import {Button, Card, Container, Dropdown, FloatingLabel, Form} from "react-bootstrap";
import ReactCrop from "react-image-crop";

const CreatingRoom = observer(() => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState({})
    const [types, setTypes] = useState([])
    const [localFile, setLocalFile] = useState(null)
    const [file, setFile] = useState(null)
    const [crop, setCrop] = useState({
        unit: 'px', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })

    function handleChange(e) {
        if (!e.target.files.length) {
            setFile(null);
            setLocalFile(null);
            return
        }
        setFile(e.target.files[0])
        setLocalFile(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        getContentTypes().then(data => setTypes(data))
    },[])

    const goBack = () => {
        history.push(EXPOSITION_ROUTE)
    }

    const addRoom = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('file', file)
        formData.append('userId', localStorage.getItem('userId'))
        formData.append('typeId', type.id)
        createRoom(formData).then(room => {
            history.push(ROOM_ROUTE + `/${room.id}`)
        }, (e) => alert(e))
    }

    return (
        <Container
            className={"d-flex mt-3 mb-3 flex-row align-items-center bg-light"}
            style={{borderRadius: "10px", height:"88vh"}}
        >
            {file ?
                <div style={{margin: "auto"}}>
                    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                        <img
                            width="700"
                            className="mt-3 mb-4 m-auto"
                            alt={""}
                            src={localFile}
                            />
                    </ReactCrop>
                </div>
                :
                <></>
            }
            <Card
                style={{borderRadius: "10px", margin:"auto"}}
            >
                <Card.Header
                    className={"d-flex flex-column align-items-center"}
                >
                    Создать новую комнату
                </Card.Header>
                <Card.Body>
                    <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Название комнаты..."
                            className="mb-3"
                            style={{color: "#858585"}}
                        >
                            <Form.Control
                                type="text"
                                placeholder="title"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </FloatingLabel>

                        <Dropdown className="mt-2 mb-3">
                            <Dropdown.Toggle variant={"outline-primary"}> { type.name || "Выберите тип контента" } </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => setType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Form.Control
                            className="mb-3"
                            type="file"
                            onChange={handleChange}
                        />

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Описание контента в комнате..."
                            style={{color: "#858585"}}
                        >
                            <Form.Control
                                style={{height: "150px"}}
                                as="textarea"
                                placeholder="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form>
                </Card.Body>
                <Card.Footer
                    className={"d-flex flex-row justify-content-around align-items-center"}
                >
                    <Button variant={"outline-warning"} onClick={goBack}>Отмена</Button>
                    <Button variant={"outline-primary"} type="submit" onClick={addRoom}>Добавить</Button>
                </Card.Footer>
            </Card>
        </Container>
    );
});

export default CreatingRoom;