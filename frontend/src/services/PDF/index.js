import React from 'react';
import Pdf from 'react-to-pdf'
import { useParams } from 'react-router';
import { useLocation } from 'react-router';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import  from '..';
const ref = React.createRef()

const PDF = (props) => {
    // symbol: symbol,
    // shares: numberShares,
    // unitPrice: info.c,
    // dollar: dollar,
    // stockName: info.name
    let location = useLocation();
    const {
        symbol,
        shares,
        unitPrice,
        dollar,
        stockName
    } = location;
    let today = new Date();
    let id = Math.floor(Math.random() * 10000)
    let date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
    return (
        <>
        <div style={{marginTop: '10%', marginLeft: '10%', marginRight: '10%'}} ref={ref}>
            <div style={{margintBottom: 100}}>
                <h1>Carta Confirmación de operación</h1>
                <h2>Fecha: {date}</h2>
            </div>
            <div style={{margintBottom: 100}}>
                <h3>Estimado Cliente:</h3>
                <p>
                    Hemos procedido a realizar la siguiente operación de capitales, de acuerdo
                    a la carta confirmación No. {id} enviada por Ud:
                </p>
            </div>
            <div style={{margintBottom: 100}}>
                <h4 style={{fontWeight: 'bold'}}>Detalles de la operación</h4>
                <table style={{width: '100%'}}>
                    <tr>
                        <td>Nuestra referencia</td>
                        <td>Compra {id}</td>
                    </tr>
                    <tr>
                        <td>Referencia original</td>
                        <td>Compra {id}</td>
                    </tr>
                    <tr>
                        <td>Fecha tarde (pactación, concertación)</td>
                        <td>{date}</td>
                    </tr>
                </table>
                <p>
                    De acuerdo a los datos que se muestran anteriormente, confirmamos la siguiente transacción.
                </p>
            </div>
            <div style={{margintBottom: 50}}>
                <h4 style={{fontWeight: 'bold'}}>Cliente Compra</h4>
                <table style={{width: '100%'}}>
                    <tr>
                        <td>Monto</td>
                        <td>{symbol} {shares}</td>
                    </tr>
                    <tr>
                        <td>Fecha Valor</td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td>Valor unitario</td>
                        <td>${Math.floor(unitPrice * dollar*100)/100} MXN</td>
                    </tr>
                </table>
            </div>
            <div style={{margintBottom: 50}}>
                <h4 style={{fontWeight: 'bold'}}>Banco Vende</h4>
                <table style={{width: '100%'}}>
                    <tr>
                        <td>Monto</td>
                        <td>{symbol} {shares} * ${(Math.floor(unitPrice * dollar*100)/100)} MXN = {(Math.floor(shares* unitPrice * dollar*100)/100)} MXN</td>
                    </tr>
                    <tr>
                        <td>Fecha Valor</td>
                        <td>{date}</td>
                    </tr>
                </table>
            </div>
        </div>
        <Pdf targetRef={ref} filename={'carta_confirmacion.pdf'}>
            {({toPdf}) => <Button style={{marginTop: 100, marginLeft: 100}} variant="success" onClick={toPdf}>Download as PDF</Button>}
        </Pdf>
        <Link to='/'>
            <Button style={{marginTop: 100, marginLeft: 10}} variant="primary">Go back</Button>
        </Link>
        </>
    );
};

export default PDF;