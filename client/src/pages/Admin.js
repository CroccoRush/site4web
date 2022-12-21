import React from 'react';
import {Container} from "react-bootstrap";
import AddNewTypes from "../components/admin-capabilities/AddNewTypes";
import ChangeUserRoles from "../components/admin-capabilities/ChangeUserRoles";
import DeleteUsers from "../components/admin-capabilities/DeleteUsers";
import DeleteRooms from "../components/admin-capabilities/DeleteRooms";

const Admin = () => {
    return (
        <Container style={{height: "70vh"}} className={"d-flex w-100 flex-column align-items-center"}>
            <DeleteRooms />
            <Container style={{height:"15%"}} className={"d-flex align-items-center justify-content-center"}>
                <ChangeUserRoles />
                <DeleteUsers />
            </Container>
            <AddNewTypes />
        </Container>
    );
};

export default Admin;