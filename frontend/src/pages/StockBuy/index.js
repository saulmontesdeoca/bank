import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import Contianer from 'react-bootstrap/Container'
import Layout from '../../components/Layout';
import StockInfo from '../../components/StockInfo';
import axios from 'axios';

const StockBuy = () => {
    const { symbol } = useParams();
    const [info, setInfo] = useState({});
    const [numberShares, setNumberShares] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [success, setSuccess] = useState(false);
    const [errorBuy, setErrorBuy] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dollar = 19.97;

    const getInfo = async () => {
        await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`)
            .then(async res => {
                let quote = res.data;
                await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`)
                    .then(response => {
                        let companyProfile = response.data;
                        setInfo({
                            ...quote,
                            ...companyProfile
                        });
                        console.log({
                            ...quote,
                            ...companyProfile
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleBuy = async () => {
        await axios.post('http://localhost:5000/api/buy', 
            {
                symbol: symbol,
                shares: numberShares,
                unitPrice: info.c,
                dollar: dollar,
                stockName: info.name
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
        getInfo();
        setSubtotal(1 * info.l);
        setTotal(1 * info.l * dollar)
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
                        <Row>
                            <Col md={8}>
                                {   info &&
                                    <>
                                        <StockInfo info={info} symbol={symbol}/>
                                        <Row className='mt-5'>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <Card
                                                            bg='primary'
                                                            text='white'
                                
                                                            className="mb-2"
                                                        >
                                                            <Card.Body>
                                                            <Card.Title>Change</Card.Title>
                                                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                                                {info.d}
                                                            </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col>
                                                        <Card
                                                            bg='warning'
                                                            text='white'
                                
                                                            className="mb-2"
                                                        >
                                                            <Card.Body>
                                                            <Card.Title>Percent Change</Card.Title>
                                                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                                                %{info.dp}
                                                            </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col>
                                                        <Card
                                                            bg='info'
                                                            text='white'
                                
                                                            className="mb-2"
                                                        >
                                                            <Card.Body>
                                                            <Card.Title>Open price</Card.Title>
                                                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                                                ${info.o}
                                                            </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Card
                                                            bg='dark'
                                                            text='white'
                                
                                                            className="mb-2"
                                                        >
                                                            <Card.Body>
                                                            <Card.Title>Previous close</Card.Title>
                                                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                                                ${info.pc}
                                                            </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col>
                                                        <Card
                                                            bg='success'
                                                            text='white'
                                
                                                            className="mb-2"
                                                        >
                                                            <Card.Body>
                                                            <Card.Title>High</Card.Title>
                                                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                                                ${info.h}
                                                            </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col>
                                                        <Card
                                                            bg='danger'
                                                            text='white'
                                
                                                            className="mb-2"
                                                        >
                                                            <Card.Body>
                                                            <Card.Title>Low</Card.Title>
                                                            <Card.Text style={{fontSize: 32, fontWeight: 700}}>
                                                                ${info.l}
                                                            </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </>
                                }
                            </Col>
                            <Col>
                                {   info &&
                                    <Card border="success" style={{ width: '21rem' }}>
                                        <Card.Header>Purchase</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{symbol}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">${info.c}</Card.Subtitle>
                                            <Form>
                                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                    <Form.Label column sm="8">
                                                        Shares
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Form.Control value={numberShares} onChange={e => {
                                                            setNumberShares(e.target.value);
                                                            setSubtotal(e.target.value * info.c);
                                                            setTotal(e.target.value * info.c * dollar);
                                                        }} required type="number" placeholder="#" min={1} defaultValue={1}/>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                    <Form.Label column sm="8">
                                                        Subotal USD
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Form.Control plaintext value={`$${subtotal}`} readOnly defaultValue={'1'} />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                    <Form.Label column sm="8">
                                                        Total MXN
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Form.Control plaintext value={`$${total}`} readOnly defaultValue={'1'} />
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
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Contianer>
        </Layout>
    );
};

export default StockBuy;