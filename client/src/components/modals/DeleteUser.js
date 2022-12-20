import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {deleteUser} from "../../http/userAPI";

const DeleteUser = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const del = () => {
        deleteUser(value)
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
                    Удалить пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Email пользователя</Form.Label>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email..."
                        className="mb-3"
                        style={{color: "#858585"}}
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="Email"
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


export default DeleteUser;