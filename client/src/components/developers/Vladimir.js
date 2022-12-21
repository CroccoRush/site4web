import React from 'react';
import {Card, ListGroup} from "react-bootstrap";

const Vladimir = () => {
    return (
        <Card style={{ width: '20rem'}}>
            <Card.Img variant="top" src="/VladimirPhoto.jpg" />
            <Card.Body>
                <Card.Title>Владимир</Card.Title>
                <Card.Text>
                    Прекрасный молодой человек<br/><br/>
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item active>Делал:</ListGroup.Item>
                <ListGroup.Item>Чат</ListGroup.Item>
                <ListGroup.Item>Страницу комнаты</ListGroup.Item>
                <ListGroup.Item>Страницу с комнатами</ListGroup.Item>
                <ListGroup.Item>Страницу для создания комнаты</ListGroup.Item>
                <ListGroup.Item>Пространство администратора</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="https://vk.com/kiselev_vovan">ВКонтакте</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default Vladimir;