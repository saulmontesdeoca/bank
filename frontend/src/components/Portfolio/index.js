import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Var from '../../pages/Var';
import ForwardCard from '../ForwardCard';
import ShareCard from '../ShareCard';

const Portfolio = ({shares, forwards}) => {
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
            <Row className='mt-3'>
                <Col>
                    <h5 className='stock-title'>Forwards</h5>
                    <div className='block' style={{marginBottom: 24}}></div>
                    {
                        shares && 
                        shares.map(item => {
                            return (
                                <ForwardCard item={item}/>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <h5 className='stock-title'>Dollar VaR</h5>
                    <div className='block' style={{marginBottom: 24}}></div>
                    <Var />
                </Col>
            </Row>
        </Container>
    );
};

export default Portfolio;