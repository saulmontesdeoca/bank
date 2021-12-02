import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

const ShareCard = ({item}) => {
    return (
        <div key={item.symbol} style={{marginBottom:12}}>
            <Link to={`/stock/${item.symbol}`} style={{textDecoration: 'none'}}>
            <Card style={{color: '#3f3f3f'}}>
                <Card.Body>
                    <Row className='justify-content-between'>
                        <Col md={3}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>{item.symbol}</h5>
                            <p>{item.shares} shares</p>
                        </Col>
                        <Col md={2}>
                            <div className='stock-name' style={{color: '#3f3f3f', fontSize: 24,fontFamily: 'Work Sans' }}>${item.price.c}</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
                
            </Link>
        </div>
    );
};

export default ShareCard;