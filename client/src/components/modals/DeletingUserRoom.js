import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {deleteRoom} from "../../http/roomAPI";
import {EXPOSITION_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";

const DeletingUserRoom = ({show, onHide, id}) => {
    const history = useHistory()
    const del = () => {
        deleteRoom(Number(id))
            .then(() => history.push(EXPOSITION_ROUTE))
            .finally(() => { onHide() })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить комнату?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className={"m-auto"}>Вы уверены, что хотите удалить эту комнату?</p>
            </Modal.Body>
            <Modal.Footer>
                <div className={"d-flex w-100 align-items-center justify-content-around"}>
                    <Button variant={"outline-primary"} onClick={onHide}>Нет, закрыть</Button>
                    <Button variant={"outline-danger"} type="submit" onClick={del}>Да, удалить</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default DeletingUserRoom;