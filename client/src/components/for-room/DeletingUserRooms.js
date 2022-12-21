import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import DeletingUserRoom from "../modals/DeletingUserRoom";

const DeletingUserRooms = ({id}) => {
    const [deleteRoomModal, setDeleteRoomModal] = useState(false);
    return (
        <>
            <Button
                variant="outline-danger"
                style={{margin: "-10px"}}
                onClick={() => setDeleteRoomModal(true)}
            >
                Удалить
            </Button>

            <DeletingUserRoom
                show={deleteRoomModal}
                onHide={() => setDeleteRoomModal(false)}
                id={id}
            />
        </>
    );
};

export default DeletingUserRooms;