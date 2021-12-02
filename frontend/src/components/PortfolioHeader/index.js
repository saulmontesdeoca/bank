import React from 'react';
import { Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const PortfolioHeader = (props) => {
    return (
        <div>
            <div className="profile">
                <img src={props.profile.img} alt="profile" style={{height: 300}}/> 
                <h1>Hello 👋, {props.profile.name}!</h1>
            </div>
            <Container>
                <Row>
                    <Col>
                        <Card
                            bg='success'
                            text='white'
                            className="mb-2"
                        >
                            <Card.Body>
                            <Card.Title>Cash</Card.Title>
                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                ${(Math.floor(props.profile.cash*100))/100}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            bg='primary'
                            text='white'
                            className="mb-2"
                        >
                            <Card.Body>
                            <Card.Title>Portfolio value</Card.Title>
                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                $659304.65
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PortfolioHeader;