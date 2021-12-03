import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

const Stock = () => {
    const [quote, setQuote] = useState({});
    const [stock, setStock] = useState([]);
    const [top, setTop] = useState([]);
    const [query, setQuery] = useState('');

    const fetchQuote = async (symbol) => {
        await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            console.log(res.data)
            setQuote(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        await axios.get('http://localhost:5000/api/')
    }

    const fetchStock = async () => {
        await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            console.log(res.data)
            setStock(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const fetchQuery = async (query) => {
        await axios.get(`https://finnhub.io/api/v1/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            console.log(res.data)
            setTop(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const fetchTop = async () => {
        await axios.get("http://localhost:5000/api/get-top")
        .then(res => {
            console.log(res.data)
            setTop(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleQuery = (e) => {
        e.preventDefault();
        fetchQuery(query);
    }

    useEffect(() => {
        // fetchTop();
    },[])

    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col style={{position: 'fixed', width: '30%', height: '100vh', paddingLeft: 80}}>
                    </Col>
                    <Col style={{marginLeft: '30%', marginRight: '30%', overflow: 'hidden'}}>
                        <Row>
                            <Col>
                                <h3>Search for a stock</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                        <Col md="9">
                                            <Form.Control value={query} onChange={e => setQuery(e.target.value)} required type="text" placeholder="Symbol" />
                                        </Col>
                                        <Col className='d-grid gap-2'>
                                            <Button onClick={(e)=>handleQuery(e)} variant="outline-success" type="submit" size="md">Search</Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <h5 className='stock-title'>Stock</h5>
                        <div className='block' style={{marginBottom: 24}}></div>
                        { top.result && top.result.map((item, index) => {
                            return (
                                <div key={index} style={{marginBottom:12}}>
                                    <Link to={`/stock/buy/${item.symbol}`} style={{textDecoration: 'none'}}>
                                    <Card style={{color: '#3f3f3f'}}>
                                        <Card.Body>
                                            <Row className='justify-content-between'>
                                                <Col md={3}>
                                                    <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>{item.symbol}</h5>
                                                    <p>{item.description}</p>
                                                </Col>
                                                <Col md={2}>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                        
                                    </Link>
                                </div>
                            )
                        })
                        }
                    </Col>
                    <Col style={{position: 'fixed', width: '30%', right: 0, height: '100vh'}}>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Stock;