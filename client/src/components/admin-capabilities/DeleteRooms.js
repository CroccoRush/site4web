import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import DeleteRoom from "../modals/DeleteRoom";

const DeleteRooms = () => {
    const [deleteRoomModal, setDeleteRoomModal] = useState(false);
    return (
        <>
            <Button
                variant={"outline-primary"}
                style={{height: "15%"}}
                className={"mt-4 p-2 w-25"}
                onClick={() => setDeleteRoomModal(true)}
            >
                Удалить комнату
            </Button>

            <DeleteRoom
                show={deleteRoomModal}
                onHide={() => setDeleteRoomModal(false)}
            />
        </>
    );
};

export default DeleteRooms;