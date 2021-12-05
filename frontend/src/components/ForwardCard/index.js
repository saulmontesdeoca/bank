import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import separator from '../../services'

const ForwardCard = ({item}) => {
    return (
        <div key={item.symbol} style={{marginBottom:12}}>
            <Link to={`/stock/buy/${item.symbol}`} style={{textDecoration: 'none'}}>
            <Card style={{color: '#3f3f3f'}}>
                <Card.Body>
                    <Row className='justify-content-around m-0 p-0'>
                        <Col md={1}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>{item.symbol}</h5>
                            <p>{item.shares} shares</p>
                        </Col>
                        <Col md={2}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>${separator(item.unit_price && item.unit_price.toFixed(2))} MXN</h5>
                            <p>Unit Price</p>
                        </Col>
                        <Col md={2}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>${separator(item.forward_price && item.forward_price.toFixed(2))} MXN</h5>
                            <p>Forward Price</p>
                        </Col>
                        <Col md={1}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>{item.term} days</h5>
                            <p>Term</p>
                        </Col>
                        <Col md={1}>
                            <Link to={`/forward/${item.symbol}`} style={{textDecoration: 'none'}}>
                                <Button variant="primary">Exercise</Button>
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
                
            </Link>
        </div>
    );
};

export default ForwardCard;