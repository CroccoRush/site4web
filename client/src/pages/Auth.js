import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Nav, Col} from "react-bootstrap";
import {useHistory, useLocation} from "react-router-dom";
import {EXPOSITION_ROUTE, LOGIN_ROUTE, OAUTH_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration, oauth} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Icon} from "semantic-ui-react";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isOauth = OAUTH_ROUTE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(username, password)
            } else {
                data = await registration(username, password)
            }
            
            user.setUser(data)
            user.setIsAuth(true)
            history.push(EXPOSITION_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    
    

    const clientId = "4bc6dde507d800eabd20"; // 6b2f67198d131a197777c822ba52ff00647aab3a - samiy secretniy secret
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;

    return (
        <Container
            className = {"d-flex justify-content-center align-items-center"}
            style = {{height: window.innerHeight - 54}}
        >
            <Card style = {{width: 600}} className={"p-5"}>
                <h2 className={"m-auto mb-1"}>{ isLogin ? 'Авторизация' : 'Регистрация' }</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите Ваше имя пользователя..."}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите Ваш пароль..."}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Col className={"d-flex justify-content-between mt-3"}>
                        { isLogin ?
                            <div>
                                Нет аккаунта?
                                <Nav.Link onClick={() => history.push(REGISTRATION_ROUTE)}> Зарегистрируйтесь </Nav.Link>
                            </div>
                            :
                            <div>
                                Есть аккаунт?
                                <Nav.Link onClick={() => history.push(LOGIN_ROUTE)}> Войдите </Nav.Link>
                            </div>
                        }
                        <Button
                            variant={"outline-primary"}
                            onClick={click}
                        >
                            { isLogin ? "Войти" : "Зарегистрироваться" }
                        </Button>
                    </Col>
                    <Form style={{ flex: 10, marginBottom: 10 }}>
                    <Button
                        variant = {'outline-primary'}
                        icon
                        primary
                        labelPosition="left"
                        as="a"
                        href={githubUrl}
                        onClick={[() => history.push(OAUTH_ROUTE), click]}
                    >
                        <Icon name="github" />
                        Login via GitHub
                    </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;