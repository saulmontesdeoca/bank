import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import Contianer from 'react-bootstrap/Container'
import Layout from '../../components/Layout';
import axios from 'axios';

const StockInfo = () => {
    const { symbol } = useParams();
    const [info, setInfo] = useState({});
    const [numberShares, setNumberShares] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [errorBuy, setErrorBuy] = useState(false);

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
                price: subtotal
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                setErrorBuy(true);
            })
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <Layout>
            <Contianer>
                <Row>
                    { errorBuy &&
                    <Alert variant='danger'>
                        There was an error buying the stock. Try again later.
                    </Alert>
                    }
                    <Col>
                        <Row>
                            <Col md={9}>
                                {   info &&
                                    <>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col md={2} className='mt-3'>
                                                    <img style={{height: 140, borderRadius: '50%'}} src={info.logo} alt='Logo'/>
                                                </Col>
                                                <Col>
                                                    <h1 className='stock-name-big'>{symbol}</h1>
                                                    <h1 className='stock-name-small'>${info.c}</h1>
                                                    <h2>{info.name}</h2>
                                                    <Badge pill bg="primary">
                                                        {info.finnhubIndustry}
                                                    </Badge>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
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
                                </>}
                            </Col>
                            <Col>
                                {   info &&
                                    <Card border="success" style={{ width: '18rem' }}>
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
                                                        }} required type="number" placeholder="#" />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                    <Form.Label column sm="8">
                                                        Estimated total
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Form.Control plaintext value={`$${subtotal}`} readOnly defaultValue={'1'} />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Col className='d-grid gap-2'>
                                                        <Button onClick={handleBuy} variant="outline-success" type="submit" size="md">Buy</Button>
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

export default StockInfo;