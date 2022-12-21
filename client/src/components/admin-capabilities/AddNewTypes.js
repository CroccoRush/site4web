import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import AddType from "../modals/AddType";

const AddNewTypes = () => {
    const [typeModal, setTypeModal] = useState(false);
    return (
        <>
            <Button
                variant={"outline-primary"}
                style={{height: "15%"}}
                className={"mt-5 p-2 w-25"}
                onClick={() => setTypeModal(true)}
            >
                Добавить новый тип для контента
            </Button>

            <AddType
                show={typeModal}
                onHide={() => setTypeModal(false)}
            />
        </>
    );
};

export default AddNewTypes;