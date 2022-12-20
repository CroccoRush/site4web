import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import ChangeRole from "../modals/ChangeRole";

const ChangeUserRoles = () => {
    const [changeRoleModal, setChangeRoleModal] = useState(false);
    return (
        <>
            <Button
                variant={"outline-primary"}
                className={"mt-5 me-2 p-2 w-25 h-100"}
                onClick={() => setChangeRoleModal(true)}
            >
                Сменить роль у пользователя
            </Button>

            <ChangeRole
                show={changeRoleModal}
                onHide={() => setChangeRoleModal(false)}
            />
        </>
    );
};

export default ChangeUserRoles;