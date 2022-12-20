import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import DeleteUser from "../modals/DeleteUser";

const DeleteUsers = () => {
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    return (
        <>
            <Button
                variant={"outline-primary"}
                className={"mt-5 ms-2 p-2 w-25 h-100"}
                onClick={() => setDeleteUserModal(true)}
            >
                Удалить пользователя
            </Button>

            <DeleteUser
                show={deleteUserModal}
                onHide={() => setDeleteUserModal(false)}
            />
        </>
    );
};

export default DeleteUsers;