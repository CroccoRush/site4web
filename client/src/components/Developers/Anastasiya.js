import React from 'react';
import {Card, ListGroup} from "react-bootstrap";

const Anastasiya = () => {
    return (
        <Card style={{ width: '20rem'}}>
            <Card.Img variant="top" src="/AnastasiyaPhoto.jpg" />
            <Card.Body>
                <Card.Title>Анастасия</Card.Title>
                <Card.Text>
                    Замечательная и наидобрейшая девушка
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item active>Делала:</ListGroup.Item>
                <ListGroup.Item>Страницу регистрации</ListGroup.Item>
                <ListGroup.Item>Регистрацию через GitHub</ListGroup.Item>
                <ListGroup.Item>Главную страницу</ListGroup.Item>
                <ListGroup.Item>Обёртку в Docker</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="https://vk.com/id_tarrrrrrrr">ВКонтакте</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default Anastasiya;