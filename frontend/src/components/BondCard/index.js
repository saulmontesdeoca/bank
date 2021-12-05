import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import separator from '../../services'
import axios from 'axios';
import { useHistory } from 'react-router'

const BondCard = ({item}) => {
    const history = useHistory();
    const handleOnClick = async () => {
        await axios.post('http://localhost:5000/api/collect/bonds')
        .then(res => {
            alert('Bond succesfuly collected. Profit: $' + res.data.profit);
            history.go();
        })
        .catch(err => {
            alert(err);
        })
    }

    return (
        <div style={{marginBottom:12}}>
            <Card style={{color: '#3f3f3f'}}>
                <Card.Body>
                    <Row className='justify-content-between'>
                        <Col md={1}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>CETES</h5>
                        </Col>
                        <Col md={3}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>${separator(item.investment)} MXN</h5>
                            <p>Investment</p>
                        </Col>
                        <Col md={2}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>{item.rate === 4.5 ? '3 months' : item.rate === 5.2 ? '6 months' : item.rate === 6.5 && '12 months'}</h5>
                            <p>Term</p>
                        </Col>
                        <Col md={2}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>{item.rate} %</h5>
                            <p>Interest Rate</p>
                        </Col>
                        <Col md={2}>
                            <h5 style={{fontFamily: 'Work Sans', color: '#3f3f3f'}}>$ {item.profit}</h5>
                            <p>Profit</p>
                        </Col>
                        <Col md={1}>
                            <Button onClick={() => handleOnClick()} variant="success" size="lg">Collect</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BondCard;