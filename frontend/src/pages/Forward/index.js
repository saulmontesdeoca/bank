import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Badge, Alert } from 'react-bootstrap';
import Contianer from 'react-bootstrap/Container'
import Layout from '../../components/Layout';
import StockInfo from '../../components/StockInfo';
import axios from 'axios';
import { useHistory } from 'react-router';

const Forward = () => {
    const { symbol } = useParams();
    const history = useHistory();
    const [info, setInfo] = useState({});
    const [priceToday, setPriceToday] = useState(0);

    const dollar = 21.07;

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

    const handleExercise = async () => {
        await axios.post('http://localhost:5000/api/exercise', 
            {
                symbol: symbol,
                priceToday: priceToday * dollar
            })
            .then(res => {
                console.log(res);
                alert('Exercise successful. Profit/Loss: ' + res.data.profitLoss);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <Layout>
            <Contianer>
                <Row>
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
                                    <Card border="secondary" style={{ width: '21rem' }}>
                                        <Card.Header>Exercise</Card.Header>
                                        <Card.Body>
                                            <Card.Title>My {symbol} forward</Card.Title>
                                            <Form>
                                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                    <Form.Label column sm="7">
                                                        Share Price today (USD)
                                                    </Form.Label>
                                                    <Col sm="5">
                                                        <Form.Control value={priceToday} onChange={e => {
                                                            setPriceToday(e.target.value);
                                                        }} required type="number" placeholder="#" min={1} defaultValue={1}/>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                        <Form.Label column sm="7">
                                                            Share Price today (MXN)
                                                        </Form.Label>
                                                        <Col sm="5">
                                                            <Form.Control plaintext value={`$${priceToday * dollar}`} readOnly defaultValue={'1'} />
                                                        </Col>
                                                    </Form.Group>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Col className='d-grid gap-2'>
                                                        <Button onClick={handleExercise} variant="outline-secondary" size="md">Exercise</Button>
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

export default Forward;