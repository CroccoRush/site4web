import React, {useState} from 'react';
import {Button, Dropdown, FloatingLabel, Form, Modal} from "react-bootstrap";
import {createRoom} from "../../http/roomAPI";
import {ROOM_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";

const CreateRoom = ({show, onHide, types}) => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState({})
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addRoom = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('file', file)
        formData.append('userId', localStorage.getItem('userId'))
        formData.append('typeId', type.id)
        createRoom(formData).then(room => {
            onHide()
            history.push(ROOM_ROUTE + `/${room.id}`)
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать новую комнату
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Название комнаты..."
                        className="mb-3"
                        style={{color: "#858585"}}
                    >
                        <Form.Control
                            as="textarea"
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
                        className="mt-2 mb-3"
                        type="file"
                        onChange={selectFile}
                    />

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Описание контента в комнате..."
                        className="mt-2 mb-3"
                        style={{color: "#858585"}}
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-warning"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-primary"} type="submit" onClick={addRoom}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};


export default CreateRoom;