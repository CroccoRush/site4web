import React from 'react';
import {Card, Container} from "react-bootstrap";
import Anastasiya from "../components/developers/Anastasiya";
import Vladimir from "../components/developers/Vladimir";

const Home = () => {
    return (
        <Container
            className={"d-flex mt-3 flex-column align-items-center mb-4"}
            style={{borderRadius: "10px", width: "70rem"}}
        >
            <Card className={"text-center mt-3 mb-3 w-100"}>
                <Card.Header>
                    <h1 className={"m-3"}>
                        Добро пожаловать на наш сайт!!!
                    </h1>
                </Card.Header>
                <Card.Img src="/site4webLogo.svg" />
                <Card.Header>
                    <h2 className={"m-1"}>
                        Сайт делали:
                    </h2>
                </Card.Header>
                <Card.Body>
                    <Container className={"d-flex align-items-center justify-content-around mb-2"}>
                        <Vladimir />
                        <Anastasiya />
                    </Container>
                </Card.Body>
                <Card.Footer className={"text-muted pb-4"}>
                    <Card.Title>Приятного просмотра сайта</Card.Title>
                    <Card.Text>
                        Наеемся, что он Вам понравится, а не вызовет желания поскорее его закрыть)
                    </Card.Text>
                    <Card.Link href="#">GitHub репозиторий проекта</Card.Link>
                </Card.Footer>
            </Card>
            
        </Container>
    );
};

export default Home;