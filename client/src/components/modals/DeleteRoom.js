import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {deleteRoom} from "../../http/roomAPI";

const DeleteRoom = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const del = () => {
        deleteRoom(value)
            .then(()=>{},()=>{
                alert("Комнаты с таким ID не существует")
            })
            .finally(() => {
                onHide()
                setValue('')
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
                    Удалить комнату
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Id комнаты</Form.Label>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Id..."
                        className="mb-3"
                        style={{color: "#858585"}}
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="Id"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-warning"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-danger"} type="submit" onClick={del}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};


export default DeleteRoom;