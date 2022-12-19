import React from 'react';
import {Card, Container} from "react-bootstrap";
import DevCarousel from "../components/DevCarousel";

const Home = () => {
    return (
        <Container
            className={"d-flex mt-3 flex-column align-items-center bg-light w-100"}
            style={{height: "90vh"}}
        >
            <Card className={"d-flex align-items-center mt-3"}>
                <Card.Body>
                    <h2 className={"m-1"}>
                        ДОБРО ПОЖАЛОВАТЬ НА НАШ САЙТ!!!
                    </h2>
                </Card.Body>
                <Card.Img variant="bottom" src="/site4weblogo2.jpg" />
            </Card>
            Сайт делали:
            <DevCarousel />
            
        </Container>
    );
};

export default Home;