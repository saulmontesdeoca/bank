import React from 'react';
import { Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import separator from '../../services'
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
                                ${separator((Math.floor(props.profile.cash*100))/100)} MXN
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
                                ${props.profile.shares && separator((props.profile.shares.reduce( (prev, current) => { return prev + current.total_price}, 0)).toFixed(2))} MXN
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            bg='secondary'
                            text='white'
                            className="mb-2"
                        >
                            <Card.Body>
                            <Card.Title>Profit/Loss calculated from last top up ($1,500,000 MXN)</Card.Title>
                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                ${props.profile.shares && separator((props.profile.shares.reduce( (prev, current) => { return prev + current.total_price}, 0) + props.profile.cash - 1500000).toFixed(2))} MXN
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