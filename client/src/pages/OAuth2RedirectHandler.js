import React, { useContext, Component } from "react";
import { useParams, NavLink, useHistory, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { EXPOSITION_ROUTE } from "../utils/consts";
import axios from "axios";
import {Octokit} from "octokit";
import {oauth, access_token} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
const { OAuthApp } = require("@octokit/oauth-app");

const OAuth2RedirectHandler = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    var qs = require('qs');
    const code = qs.parse(location.search, { ignoreQueryPrefix: true }).code
    console.log(code);
    
    const auth = async (code) => {
        try {
            let data
            data = await oauth(code)
            console.log(data)
            console.log('Успешный залогин')
            user.setUser(data);
            user.setIsAuth(true);
            history.push(EXPOSITION_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    if (code) {
        localStorage.setItem("ACCESS_CODE", code);
        auth(code)
    }

    return (
        <Container
            className = {"d-flex justify-content-center align-items-center"}
            style = {{height: window.innerHeight - 54}}
        >
        </Container>
    );
});

export default OAuth2RedirectHandler;
