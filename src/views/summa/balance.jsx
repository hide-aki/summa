import React, { Component } from 'react';
// REACSTRAP
import { Container, Row, Col, FormGroup, Label, } from 'reactstrap';
// PT-COMPONENTS
import { CustomRow,CustomCol, } from "@pleedtech/pt-components";
// CUSTOM DATEPICKER
import CustomDatePicker from "../../components/customDatePicker";

// CHARTS
import RecordChart from './CustomChart/RecordChart';

import CustomTabulatorTable from './componentTabulatorTable';
import 'react-table/react-table.css';
// COMPONENTES
import Title from './components/title';
// IMAGENES
import ahorroIcon from '../../assets/img/summa/icon/iconAhorro.png';
import gananciaIcon from '../../assets/img/summa/icon/iconGanancia.png';
import noticiaIcon from '../../assets/img/summa/icon/iconNotas.png';
import gastoIcon from '../../assets/img/summa/icon/iconGasto.png';
import egresoIcon from '../../assets/img/summa/icon/iconEgreso.png';

var egresos = ()=>{return '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJQTFRF8dd4/+nL1TRb4lB5/b8A88Bq8sxx88Fr+OCi4GeE9dyN88Zu9MzW/t9///vv/tl/8dN1/vv27bV4/OW2/+a+6Xyb8dZ36pmt+MA1/tdy/csw/tdg/tNQ/u+/9cyG8tF18tB08spw/s9M/PL1/uef89mC/uOP/tRm9NF9/fPj/cMQ+NPd8th9+d+0/cQZ8s5z/ccg/soz//ff6pR58sdu9MRz/efB99ng/fT3/ujG9t6X+uKs542j5YCZ2EFl64ej5mx12k1w+NiG9tCP/+Sy/sw/9cRm+dyl7r54/uuv99SS7aa3+eGn/Oa7/9+Y8rLE5FuB77PB88Rt9ch9/e/M/tyM++vQ/O/a8slv99+c53p5/tFZ9MBj//PP9daJ+ubq6px441h56Yt5/vPW64hy8Ktt41d48tV7+dK88r/M9L3N3Vp675208cZz8M945F538dR24nSO++nu8s1y7K14////iPUypwAAAHZ0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAFiqUcAAAKLSURBVHja7NfpQ9owFADwBJoyWmAcinOKiohuikMd6jjEuXtTN3X36e773vj/1yTF5iVpKdv85vva/EjavLw8UOcfAh3h/4GfFu7cP/0XeGl6dMEwjBOEkOWL894vnFsfZBHnsari1NRJgwfFNG7PZ/ijW1EeER5xBSdnDUPChDy5mgmBCwsuXHw8M3yhapp2jPPle87TOYjXIE5yOXkX0ziGaKSL3N/IyHhIxKlRRmcGMBYwQnmT8bFMAE6xD7V4CWMJO7xI9ZX3/pjZYYw1GKEJOvkYxLseHqH2OPbBKE01xIkDfF2xEDPtg1Ozis09m4CakLd6TBc9CewKMsk40L/IeYD3Xbzk2DMDcGIHmwAjG+LuwRhRFq3D77Q4RScGa25UkIMJqYGVP9LhaWniZoUONVlaPhDwWRFvuJjmpfDGK8y6WFw7wHEXO/ayMPFDOtCyTtn8TAXjgpSXljNumyVJfo+QWDCecvBNiCtuhuVrtpAqWRGvcZyEr8xmbsrpqeAhD4sbtUUHluk728Xv/eJ62fvasWqfGG+Xva2KpQUt4k0fjOtbFt2qPTlLRJzQfzDvPLMSEIzlrcK5XLcY2D2xnCROhjU4znszX8tms8/BPiecUNPTYjvVTc8at1EvIl5sKgejgcSDMS7ukoxbypGsWwKuwrMMcbukKQZNC8nF4OsLDf4Qtgz9VnErfAF8KeONUvjS++WbhFf7Kfpv/C66UNfNa10NC3vRjQ16uL3f6e+KzfzcOcC7oJXqfbm/6nQ+dvEPqQ/r2VbQQesct0tKE9ejoWGN3A7DCU0HGNxKsZijuKVvH4OaOB6fo5FPJZ/eM6B97HagvOvss3E9/Jb56A/KIeI/AgwAMdeuhbhWV4EAAAAASUVORK5CYII=" width="30%"/>'}
const data = [
    { 
        folio: '00013',
        movimiento: "",
        fecha: '18/10/2019',
        monto: '$100.00',
        metodo: 'Déposito en ventanilla',
        cuenta: 'Santander MXN',
    },
    {
        folio: '00011',
        movimiento: <img src={egresoIcon} alt="logo" className=""/>,
        fecha: '18/10/2019',
        monto: '$100.00',
        metodo: 'Transferencia Internacional',
        cuenta: 'Santander USD',
    },
  ];
  
  const columns = [
    { rowHandle: true, align: 'center', headerSort: false, width: 30, minWidth: 30, },
    { title: 'Folio', field: 'folio', width: 100, },
    { title: 'Movimiento', field: 'movimiento', width: 150, formatter: egresos },
    { title: 'Fecha', field: 'fecha', width: 150 },
    { title: 'Monto', field: 'monto', width: 200,},
    { title: 'Método', field: 'metodo', width: 250, },
    { title: 'Cuenta', field: 'cuenta', width: 250, },
  ];

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      defaultStartedAt: null,
      activeTab: "1",
      modal: false,
    }
  }

  toggle=()=>{
    this.setState({
      modal: !this.state.modal
    })
  }
    
  render() {
    console.log(egresoIcon)

    const {
        defaultStartedAt,
      } = this.state

    return ( 
    <div className="animated fadeIn bgBalance">
      <Title title="Balance"/>
      <Container className="movimientos">
        {/* ULTIMOS MOVIMIENTOS */}
        <h4>Ùltimos movimientos</h4>
        <Row>
          <Col className="ultimoMov" sm="12" md="4">
            <Row>
              <Col sm="12" md="6">
                <span><img src={ahorroIcon} alt="logo" className=""/><h6>Ahorro</h6></span>
              </Col>
              <Col className="iconMov" sm="12" md="6">
                <div>Monto: <b>$1,000.00 MXN</b></div>
                <div>Fecha: <b>27/11/19</b></div>
                <div>Tipo de transacción: <b>Déposito Bancario</b></div>
              </Col>
            </Row>
          </Col>
          <Col className="ultimoMov" sm="12" md="4">
            <Row>
              <Col sm="12" md="6">
                <span><img src={gastoIcon} alt="logo" className=""/><h6>Perdida</h6></span>
              </Col>
              <Col className="iconMov" sm="12" md="6">
                <div>Monto: <b>$1000.00 MXN</b></div>
                <div>Fecha: <b>27/11/19</b></div>
                <div>Tipo de transacción: <b>Déposito Bancario</b></div>
              </Col>
            </Row>
          </Col>
          <Col className="ultimoMov" sm="12" md="4">
            <Row>
              <Col sm="12" md="6">
                <span><img src={gananciaIcon} alt="logo" className=""/><h6>Ganancia</h6></span>
              </Col>
              <Col className="iconMov" sm="12" md="6">
                <div>Monto: <b>$1000.00 MXN</b></div>
                <div>Fecha: <b>27/11/19</b></div>
                <div>Tipo de transacción: <b>Déposito Bancario</b></div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="espacio2"></div>
        {/* GRAFICA INGRESOS Y EGRESOS */}
        <CustomRow className="m-top-30">
          <CustomCol><h4>Perdidas y Ganancias</h4></CustomCol>
          <CustomCol xs="12" md="6">
            <CustomRow>
              <CustomCol xs="12" md="6">
                <div className="filter-indicadores" xs="12" md="6" lg="6">
                  <div className="item-filter item-filter--historico">
                    <FormGroup>
                      <Label
                        htmlFor="input-asunto"
                        className="label-input"
                      >
                        De:
                      </Label>
                      <CustomDatePicker
                        isVisible
                        className="form-datepicker"
                        placeholder="Fecha inicio"
                        defaultValue={
                          defaultStartedAt
                        }
                        onChange={date => {
                          this.setState({
                            since: date
                          });
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
              </CustomCol>
              <CustomCol xs="12" md="6">
                <div className="filter-indicadores" xs="12" md="6" lg="6">
                  <div className="item-filter item-filter--historico">
                    <FormGroup>
                      <Label
                        htmlFor="input-asunto"
                        className="label-input"
                      >
                        A:
                      </Label>
                      <CustomDatePicker
                        isVisible
                        className="form-datepicker"
                        placeholder="Fecha inicio"
                        defaultValue={
                          defaultStartedAt
                        }
                        onChange={date => {
                          this.setState({
                            since: date
                          });
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
              </CustomCol>
            </CustomRow>
          </CustomCol>
        </CustomRow>
        <div className="espacio"></div>
        <CustomRow>
          <CustomCol>
            <div className="wrap-chart-estadistic">
              <RecordChart/>
            </div>
          </CustomCol>
        </CustomRow>
        <div className="espacio2"></div>
        {/* MOVIMIENTOS */}
        <h4>Historial</h4>
        <Row>
        <Container>
              <Row>
                <Col sm="12" md={{ size: 12 }} className="center">
                  <CustomTabulatorTable
                    id="table-tabulator-1"
                    className="tabulatorTable"
                    isVisible
                    data={data}
                    columns={columns}
                    options={{}}
                  />
                </Col>
              </Row>
            </Container>
        </Row>
        <div className="espacio2"></div>
        {/* NOTICIAS DE INTERES */}
        <h4>Noticias</h4>
        <Row>
          <Col className="containerDatos" sm="12" md="6">
            <h4><img src={noticiaIcon} alt="logo"/>  Titulo</h4>
            <div className="textNews">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam nostrum blanditiis provident in quasi, culpa magnam autem? Consequuntur ab molestias quod expedita ex quisquam quibusdam, earum, qui veniam, explicabo voluptatum.</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam nostrum blanditiis provident in quasi, culpa magnam autem? Consequuntur ab molestias quod expedita ex quisquam quibusdam, earum, qui veniam, explicabo voluptatum.</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam nostrum blanditiis provident in quasi, culpa magnam autem? Consequuntur ab molestias quod expedita ex quisquam quibusdam, earum, qui veniam, explicabo voluptatum.</p>
            </div>
          </Col>
          <Col className="containerDatos" sm="12" md="6">
            <h4><img src={noticiaIcon} alt="logo"/>  Titulo</h4>
            <div className="textNews">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam nostrum blanditiis provident in quasi, culpa magnam autem? Consequuntur ab molestias quod expedita ex quisquam quibusdam, earum, qui veniam, explicabo voluptatum.</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam nostrum blanditiis provident in quasi, culpa magnam autem? Consequuntur ab molestias quod expedita ex quisquam quibusdam, earum, qui veniam, explicabo voluptatum.</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam nostrum blanditiis provident in quasi, culpa magnam autem? Consequuntur ab molestias quod expedita ex quisquam quibusdam, earum, qui veniam, explicabo voluptatum.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    );
  }
}
 
export default Balance;