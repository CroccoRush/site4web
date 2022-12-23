import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, ButtonGroup, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, EXPOSITION_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const role = localStorage.getItem('role')
    const history = useHistory()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
    }

    return (
        <Navbar bg="light" variant="light" sticky="top">
            <Container>
                <Navbar.Brand
                    onClick={() => history.push(HOME_ROUTE)}
                    style={{cursor: 'pointer'}}
                >
                    <img
                        alt=""
                        src="/mainLogo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-1"
                    />{'site4web'}
                </Navbar.Brand>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <ButtonGroup aria-label="Basic example">
                            <Button
                                variant="outline-primary"
                                onClick={() => history.push(EXPOSITION_ROUTE)}
                            >
                                Комнаты
                            </Button>
                            {(role === "ADMIN") ?
                                <Button
                                    variant="outline-primary"
                                    onClick={() => history.push(ADMIN_ROUTE)}
                                >
                                    Пространство администратора
                                </Button>
                                :
                                <></>
                            }
                            <Button
                                variant="outline-primary"
                                onClick={() => {
                                    logOut();
                                }}
                            >
                                Выйти
                            </Button>
                        </ButtonGroup>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <ButtonGroup aria-label="Basic example">
                            <Button
                                variant="outline-primary"
                                onClick={() => history.push(LOGIN_ROUTE)}
                            >
                                Log in
                            </Button>
                            <Button
                                variant="outline-primary"
                                onClick={() => history.push(REGISTRATION_ROUTE)}
                            >
                                Sign In
                            </Button>
                        </ButtonGroup>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;