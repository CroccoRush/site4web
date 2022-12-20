import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {changeRole} from "../../http/userAPI";

const ChangeRole = ({show, onHide}) => {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    //USERmail@mail.ru
    const change = () => {
        if (role.toUpperCase() === 'USER' || role.toUpperCase() ==='ADMIN') {
            changeRole(email, role.toUpperCase())
                .finally(() => {
                    onHide()
                    setEmail('')
                    setRole('')
                }
            )
        } else {
            alert("Некорректная роль")
        }

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
                    Сменить пользовательскую роль
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
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                    <Form.Label>Роль</Form.Label>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Роль..."
                        className="mb-3"
                        style={{color: "#858585"}}
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="Роль"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-warning"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-primary"} type="submit" onClick={change}>Сменить</Button>
            </Modal.Footer>
        </Modal>
    );
};


export default ChangeRole;