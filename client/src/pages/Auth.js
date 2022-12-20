import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Nav, Col} from "react-bootstrap";
import {useHistory, useLocation} from "react-router-dom";
import {EXPOSITION_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            history.push(EXPOSITION_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

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
                        placeholder={"Введите Ваш email..."}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                                Нет аккаунта? <Nav.Link href={REGISTRATION_ROUTE}> Зарегистрируйтесь </Nav.Link>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <Nav.Link href={LOGIN_ROUTE}> Войдите </Nav.Link>
                            </div>
                        }
                        <Button
                            variant={"outline-primary"}
                            onClick={click}
                        >
                            { isLogin ? "Войти" : "Зарегистрироваться" }
                        </Button>
                    </Col>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;