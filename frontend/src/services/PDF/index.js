import React from 'react';
import Pdf from 'react-to-pdf'

const ref = React.createRef()

const PDF = (props) => {
    return (
        <>
        <div style={{marginTop: '10%', marginLeft: '10%', marginRight: '10%'}} ref={ref}>
            <div style={{margintBottom: 100}}>
                <h1>Carta Confirmación de operación</h1>
                <h2>Fecha: {new Date()}</h2>
            </div>
            <div style={{margintBottom: 100}}>
                <h3>Estimado Cliente:</h3>
                <p>
                    Hemos procedido a realizar la siguiente operación de capitales, de acuerdo
                    a la carta confirmación No. 10002 enviada por Ud:
                </p>
            </div>
            <div style={{margintBottom: 100}}>
                <h4 style={{fontWeight: 'bold'}}>Detalles de la operación</h4>
                <table style={{width: '100%'}}>
                    <tr>
                        <tb>Nuestra referencia</tb>
                        <tb>Compra 10002</tb>
                    </tr>
                    <tr>
                        <tb>Referencia original</tb>
                        <tb>Compra 10002</tb>
                    </tr>
                    <tr>
                        <tb>Fecha tarde (pactación, concertación)</tb>
                        <tb>{new Date()}</tb>
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
                        <tb>Monto</tb>
                        <tb>AAPL 3</tb>
                    </tr>
                    <tr>
                        <tb>Fecha Valor</tb>
                        <tb>{new Date()}</tb>
                    </tr>
                    <tr>
                        <tb>Valor unitario</tb>
                        <tb>$20,000 MXN</tb>
                    </tr>
                </table>
            </div>
            <div style={{margintBottom: 50}}>
                <h4 style={{fontWeight: 'bold'}}>Banco Vende</h4>
                <table style={{width: '100%'}}>
                    <tr>
                        <tb>Monto</tb>
                        <tb>AAPL 3 * $20,00 MXN = 89000 MXN</tb>
                    </tr>
                    <tr>
                        <tb>Fecha Valor</tb>
                        <tb>{new Date()}</tb>
                    </tr>
                </table>
            </div>
        </div>
        <Pdf targetRef={ref} filename={'carta_confirmacion.pdf'}>
            {({toPdf}) => <button onClick={toPdf}>Download as PDF</button>}
        </Pdf>
        </>
    );
};

export default PDF;