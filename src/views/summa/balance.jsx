import React, { Component } from 'react';
// REACSTRAP
import { 
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup, 
  InputGroupAddon, 
  Input, 
  FormGroup, 
  Label,
  CustomInput,
  Form,
  Card, 
  CardTitle, 
  CardText, 
  FormText
} from 'reactstrap';
import classnames from 'classnames';
import ReactTable from 'react-table';
import CustomTabulatorTable from './componentTabulatorTable';
import 'react-table/react-table.css';
// COMPONENTES
import Title from './components/title';
import MainTitle2 from './components/mainTitle2';
import BtnMain from './components/btnMain';
import BtnUpload from './components/btnUpload';
import BtnDelete from './components/btnDelete';
import BtnSec from './components/btnSec';
import BtnGeneral from './components/btnGeneral';
import BtnGeneralSec from './components/btnGeneralSec';
// IMAGENES
import ahorroIcon from '../../assets/img/summa/icon/iconAhorro.png';
import gananciaIcon from '../../assets/img/summa/icon/iconGanancia.png';
import noticiaIcon from '../../assets/img/summa/icon/iconNotas.png';
import gastoIcon from '../../assets/img/summa/icon/iconGasto.png';
import graficaIcon from '../../assets/img/summa/icon/iconGrafica.png';
import chartIcon from '../../assets/img/summa/icon/iconChart.png';
import histoIcon from '../../assets/img/summa/icon/iconHistorial.png';
import ingresoIcon from '../../assets/img/summa/icon/iconIngreso.png';
import egresoIcon from '../../assets/img/summa/icon/iconEgreso.png';



const data = [
    { 
        folio: '00013',
        movimiento: <img src={ingresoIcon} alt="logo" className=""/>,
        fecha: '18/10/2019',
        monto: '$100.00',
        metodo: 'Déposito en ventanilla',
    },
    {
        folio: '00011',
        movimiento: <img src={egresoIcon} alt="logo" className=""/>,
        fecha: '18/10/2019',
        monto: '$100.00',
        metodo: 'Transferencia',
    },
  ];
  
  const columns = [
    {
      rowHandle: true,
      align: 'center',
      // formatter: () => {
      //   return `<i class="fa fa-eye"></i>`;
      // },
      headerSort: false,
      width: 30,
      minWidth: 30,
    },
    { title: 'Folio', field: 'folio', width: 100, },
    { title: 'Movimiento', field: 'movimiento', width: 200, },
    { title: 'Fecha', field: 'fecha', width: 200 },
    { title: 'Monto', field: 'monto', width: 200,},
    { title: 'Método', field: 'metodo', },
  ];
  
  
class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {  
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

    const {
      activeTab,
    } = this.state

    return ( 
    //   <div className="animated fadeIn bgBalance">
    <div className="animated fadeIn">
      <Title title="Balance"/>
      <Container className="movimientos">
        {/* ULTIMOS MOVIMIENTOS */}
        <h4>Ùltimos movimientos</h4>
        <Row>
          <Col className="ultimoMov" sm="12" md="4">
            <Row>
              <Col>
                <span><img src={ahorroIcon} alt="logo" className=""/><h6>Ahorro</h6></span>
              </Col>
              <Col className="iconMov">
                <div>Monto: <b>$1,000.00 MXN</b></div>
                <div>Fecha: <b>27/11/19</b></div>
                <div>Tipo de transacción: <b>Déposito Bancario</b></div>
              </Col>
            </Row>
          </Col>
          <Col className="ultimoMov" sm="12" md="4">
            <Row>
              <Col>
                <span><img src={gastoIcon} alt="logo" className=""/><h6>Perdida</h6></span>
              </Col>
              <Col className="iconMov">
                <div>Monto: <b>$1000.00 MXN</b></div>
                <div>Fecha: <b>27/11/19</b></div>
                <div>Tipo de transacción: <b>Déposito Bancario</b></div>
              </Col>
            </Row>
          </Col>
          <Col className="ultimoMov" sm="12" md="4">
            <Row>
              <Col>
                <span><img src={gananciaIcon} alt="logo" className=""/><h6>Ganancia</h6></span>
              </Col>
              <Col className="iconMov">
                <div>Monto: <b>$1000.00 MXN</b></div>
                <div>Fecha: <b>27/11/19</b></div>
                <div>Tipo de transacción: <b>Déposito Bancario</b></div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="espacio2"></div>
        {/* GRAFICA INGRESOS Y EGRESOS */}
        <h4><img src={graficaIcon} alt="logo" className=""/>  Perdidas y Ganancias</h4>
        <Row>

        </Row>
        <div className="espacio2"></div>
        {/* MOVIMIENTOS */}
        <h4><img src={histoIcon} alt="logo" className=""/>  Historial</h4>
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
        <h4><img src={noticiaIcon} alt="logo" className=""/>  Noticias</h4>
        <Row>

        </Row>
      </Container>
    </div>
    );
  }
}
 
export default Balance;