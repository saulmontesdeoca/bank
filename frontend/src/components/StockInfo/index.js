import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';

const StockInfo = ({info, symbol}) => {
    return (
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
    );
};

export default StockInfo;