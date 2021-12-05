import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import Contianer from 'react-bootstrap/Container'
import Layout from '../../components/Layout';
import axios from 'axios';
import separator from '../../services'; 

const Bonds = () => {
    const [investment, setInvestment] = useState(0);
    const [rate, setRate] = useState(0);

    const [success, setSuccess] = useState(false);
    const [errorBuy, setErrorBuy] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleBuy = async () => {
        await axios.post('http://localhost:5000/api/buy/bonds', 
            {
                investment: investment,
                rate: rate
            })
            .then(res => {
                console.log(res);
                setSuccess(true);
            })
            .catch(err => {
                console.log(err);
                setErrorBuy(true);
                setErrorMessage("Not enough funds");
            })
    }

    useEffect(() => {
    }, []);

    return (
        <Layout>
            <Contianer>
                <Row>
                    { errorBuy &&
                    <Alert variant='danger'>
                        There was an error buying the stock: {errorMessage && errorMessage}
                    </Alert>
                    }
                    {
                        success &&
                        <Alert variant='success'>
                            Your purchase was successful
                        </Alert>
                    }
                    <Col>
                        <h1 className='stock-name-big'>Bonds</h1>
                    </Col>
                    <Col>
                        <Row>
                            <Card className='p-0' border="success" style={{ width: '21rem' }}>
                                <Card.Header>Purchase Bonds</Card.Header>
                                <Card.Body>
                                    <Card.Title>CETES</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                    <Form>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="6">
                                                Investment MXN
                                            </Form.Label>
                                            <Col sm="5">
                                                <Form.Control value={investment} onChange={e => {
                                                    setInvestment(e.target.value)
                                                }} required type="number" placeholder="#" min={1} defaultValue={1}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="7">
                                                Term
                                            </Form.Label>
                                            <Col sm="12">
                                                <Form.Control 
                                                    as="select"
                                                    value={rate}
                                                    onChange={e =>{
                                                        setRate(e.target.value);
                                                    }}
                                                >
                                                    <option>Terms</option>
                                                    <option value={4.5}>3 months</option>
                                                    <option value={5.2}>6 months</option>
                                                    <option value={6.5}>12 months</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="7">
                                                Interest Rate
                                            </Form.Label>
                                            <Col sm="5">
                                                <Form.Control plaintext value={`${rate}%`} readOnly defaultValue={'1'} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="7">
                                                Rate
                                            </Form.Label>
                                            <Col sm="5">
                                                <Form.Control plaintext value={`$ ${separator(investment * rate/100)}`} readOnly defaultValue={'1'} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="7">
                                                ISR
                                            </Form.Label>
                                            <Col sm="5">
                                                <Form.Control plaintext value={`$ ${separator(investment * rate/100 * 0.16)}`} readOnly defaultValue={'1'} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="7">
                                                Profit/Loss
                                            </Form.Label>
                                            <Col sm="5">
                                                <Form.Control plaintext value={`$ ${separator(investment * rate/100 * 0.84)}`} readOnly defaultValue={'1'} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Col className='d-grid gap-2'>
                                                <Button onClick={handleBuy} variant="outline-success" size="md">Buy</Button>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Contianer>
        </Layout>
    );
};

export default Bonds;