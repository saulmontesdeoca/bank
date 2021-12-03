import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';

const ShareCard = ({item}) => {
    return (
        <div key={item.symbol} style={{marginBottom:12}}>
            <Link to={`/stock/buy/${item.symbol}`} style={{textDecoration: 'none'}}>
            <Card style={{color: '#3f3f3f'}}>
                <Card.Body>
                    <Row className='justify-content-between'>
                        <Col md={3}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>{item.symbol}</h5>
                            <p>{item.shares} shares</p>
                        </Col>
                        <Col md={3}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>${item.unit_price ? item.unit_price : 0}</h5>
                            <p>Unit Price</p>
                        </Col>
                        <Col md={3}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>${item.price.c ? item.price.c : 0}</h5>
                            <p>Total Price</p>
                        </Col>
                        <Col md={1}>
                            <Link to={`/stock/buy/${item.symbol}`} style={{textDecoration: 'none'}}>
                                <Button size="lg">Buy</Button>
                            </Link>
                        </Col>
                        <Col md={1}>
                            <Link to={`/stock/sell/${item.symbol}`} style={{textDecoration: 'none'}}>
                                <Button variant="success" size="lg">Sell</Button>
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
                
            </Link>
        </div>
    );
};

export default ShareCard;