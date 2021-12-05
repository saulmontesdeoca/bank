import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';
import separator from '../../services';

const Var = () => {
    const [vaR, setVaR] = useState({});

    const getVaR = async () => {
        await axios.post('http://localhost:5000/api/var',
            {
                tc_today: 21.07,
                usd_position: 1000000
            }
        ).then(res => {
                setVaR(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect( () => {
        getVaR();
    },[]);

    return (
        <>
            {
                vaR && vaR.table && 
                <Container>
                    <Row className='justify-content-around mb-5'>
                        <Col sm={3}>
                            <table>
                                <tr>
                                    <th>Dollar today</th>
                                    <th>VaR 99%</th>
                                    <th>VaR 95%</th>
                                </tr>
                                <tr>
                                    <td>$ 21.07</td>
                                    <td>{vaR.var99}</td>
                                    <td>{vaR.var95}</td>
                                </tr>
                            </table>
                        </Col>
                        <Col sm={3}>
                            <table>
                                <tr>
                                    <th>Index</th>
                                    <th>Value</th>
                                    <th>Risk</th>
                                </tr>
                                {   vaR.table.map((item, key) => {
                                    return (
                                        <tr>
                                            <td>{key+1}</td>
                                            <td>{item[0]} %</td>
                                            <td>{separator(item[1])}</td>
                                        </tr>
                                    )
                                })
                                }
                            </table>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    );
};

export default Var;