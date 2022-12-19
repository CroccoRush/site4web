import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {createContentType} from "../../http/RoomAPI";

const AddType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addType = () => {
        createContentType(value).then(data => {
            setValue('')
            onHide()
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
                    Добавить новый тип контента
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Название типа</Form.Label>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Typename..."
                        className="mb-3"
                        style={{color: "#858585"}}
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="Typename"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-warning"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-primary"} type="submit" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};


export default AddType;