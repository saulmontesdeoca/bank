import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

const Stock = () => {
    const [quote, setQuote] = useState({});
    const [stock, setStock] = useState([]);
    const [top, setTop] = useState([]);

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

    useEffect(() => {
        fetchTop();
    },[])

    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col style={{position: 'fixed', width: '30%', height: '100vh', paddingLeft: 80}}>
                        <h5 className='stock-title'>Portfolio</h5>
                        <div className='block'></div>
                        {
                            top && 
                            top.map(item => {
                                return (
                                    <div key={item.symbol} className='stock-item'>
                                        <Link to={`/stock/${item.symbol}`}>
                                            <h5 className='stock-title'>{item.symbol}</h5>
                                            <div className='stock-name' style={{textDecoration: 'none'}}>${item.price.c}</div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </Col>
                    <Col style={{marginLeft: '30%', marginRight: '30%', overflow: 'hidden'}}>
                        <h5 className='stock-title'>Stock</h5>
                        <div className='block'></div>

                    </Col>
                    <Col style={{position: 'fixed', width: '30%', right: 0, height: '100vh'}}>
                        <h5 className='stock-title'>Buys</h5>
                        <div className='block'></div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Stock;