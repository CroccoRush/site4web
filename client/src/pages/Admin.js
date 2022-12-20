import React from 'react';
import {Container} from "react-bootstrap";
import AddNewTypes from "../components/AdminCapabilities/AddNewTypes";
import ChangeUserRoles from "../components/AdminCapabilities/ChangeUserRoles";
import DeleteUsers from "../components/AdminCapabilities/DeleteUsers";
import DeleteRooms from "../components/AdminCapabilities/DeleteRooms";

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