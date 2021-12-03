import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import ShareCard from '../ShareCard';

const Portfolio = ({shares}) => {
    return (
        <Container>
            <Row className='mt-3'>
                <Col>
                    <h5 className='stock-title'>Portfolio</h5>
                    <div className='block' style={{marginBottom: 24}}></div>
                    {
                        shares && 
                        shares.map(item => {
                            return (
                                <ShareCard item={item}/>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Portfolio;