import React from 'react';
import {Button, Container} from "react-bootstrap";
import AddType from "../components/modals/AddType";

const Admin = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <Container style={{height: "70vh"}} className={"d-flex w-100 flex-column align-items-center"}>
            <Button
                variant={"outline-primary"}
                className={"mt-5 p-2 w-25 h-25"}
                onClick={() => setModalShow(true)}
            >
                Добавить новый тип для контента
            </Button>

            <AddType
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
};

export default Admin;