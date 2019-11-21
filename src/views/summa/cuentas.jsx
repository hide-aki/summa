import React, { Component } from 'react';
import Title from './components/title';
import Buscar from './components/search';
import BtnGeneral from './components/btnGeneral';
import MainTitle2 from './components/mainTitle2';
import logo from '../../assets/img/summa/logo.png';
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
} from 'reactstrap';
import classnames from 'classnames';
import ReactTable from 'react-table';
import CustomTabulatorTable from './componentTabulatorTable';
import 'react-table/react-table.css';
 

const data = [
  {
    numero: '00013',
    fecha: '18/10/2019',
    monto: '$100.00',
    metodo: 'Déposito en ventanilla',
    estado: 'Pendiente',
  },
  {
    numero: '00011',
    fecha: '18/11/2019',
    monto: '$138.00',
    metodo: 'Déposito',
    estado: 'Completo',
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
  { 
    title: 'Detalles', 
    field: '', 
    width: 100, 
    formatter: () => {
      return `<div class="item-btn"><button type="button" class="btn-icon-edit"><i class="fa fa-eye"></i></button></div>`;
    }},

  { title: 'No.', field: 'numero', width: 200 },
  { title: 'Fecha de déposito', field: 'fecha' },
  {
    title: 'Monto',
    field: 'monto',
  },
  {
    title: 'Método',
    field: 'metodo',
  },
  {
    title: 'Estado',
    field: 'estado',
    formatter: (row, event) => {
      const dataRow = row.getData().estado;
      return `<div class="warningTable alert alert-success fade show" role="alert"><i class="fa fa-clock-o" aria-hidden="true"></i> ${dataRow}</div>`;
    },
  },
];


class Cuentas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '4',
      modal: false,
    };
  }

  toggle=()=>{
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    const { activeTab } = this.state;


    return (
      <div className="animated fadeIn">
        
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={""}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>

        <Title title="Depósitos" />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                this.setState({
                  activeTab: '1',
                });
              }}
            >
              <p className="center">
                Transferencia bancaría/Depósito en ventanilla
              </p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                this.setState({
                  activeTab: '2',
                });
              }}
            >
              <p className="center">Tarjeta de débito/Tarjeta de crédito</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                this.setState({
                  activeTab: '3',
                });
              }}
            >
              <p className="center">Otras Opciones</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => {
                this.setState({
                  activeTab: '4',
                });
              }}
            >
              <p className="center">Detalle de déposito</p>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Container>
            <Row>
                <Col sm="12" md={{ size: 12}}>
                  <p className="MessageText">Para realizar un depósito mediante transferencia bancaria o deposito en ventanilla, puede realizarlo con los datos que a continuación le proporcionamos, por favor indique el monto y la opción deseada:</p>
                  {/* Este formulario es el primero que se muestra dentro de esta sección */}
                  <Container>
                    <Row>
                      <Col sm="12" md={{ size: 10, offset: 1}}>
                        <Form>
                          <p>Monto</p>
                          <FormGroup>
                            <Label for="exampleMonto" className="custom-file-label"></Label>
                            <Input type="text" name="monto" id="exampleMonto" placeholder="0.00"/>
                          </FormGroup>
                          <br/>
                          <Row>
                            <Col>
                              <p>Tipo de transacción</p>
                              <FormGroup row>
                                <Col sm="12">
                                  <Input type="select" name="select" id="exampleSelect">
                                    <option>Transferencia Nacional</option>
                                    <option>Transferencia Internacional</option>
                                    <option>Depósito en Ventanilla</option>
                                  </Input>
                                </Col>
                              </FormGroup>
                            </Col>
                            <Col>
                              <p>Cuenta</p>
                              <FormGroup row>
                                <Col sm="12">
                                  <Input type="select" name="select" id="exampleSelect">
                                    <option>Santander USD</option>
                                    <option>Santander MXN</option>
                                  </Input>
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                        <br/><br/><br/>
                        {/* Todos los datos a continuación agregado en <p> aparecen solo hasta que se ha elegido el tipo de cuenta */}
                        <Row>
                          <Col>
                            <h6>Nombre del beneficiario</h6>
                            <p>YOURPAYCHOICE SA de CV</p>
                            <br/><br/>
                          </Col>
                          <Col>
                            <h6>Banco beneficiario</h6>
                            <p>Santander MXN</p>
                            <br/><br/>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h6>Dirección del banco beneficiario</h6>
                            <p>Av. Insurgentes Sur 859 piso 2 ofna 249 Col. Nápoles Delegación Benito Juárez, CDMX CP 03810</p>
                            <br/><br/>
                          </Col>
                          {/* El número de cuenta solo aparece si es transferencia nacional */}
                          <Col>
                            <h6>No. de Cuenta</h6>
                            <p>65-50581142-9</p>
                            <br/><br/>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h6>CLABE</h6>
                            <p>014180655058114296</p>
                            <br/><br/>
                          </Col>
                          <Col>
                          </Col>
                        </Row>
                        <BtnGeneral className="btnTarjeta" title="Generar movimiento"/>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Container>
              <Row>
                <Col sm="12" md={{ size: 12}}>
                  <p className="MessageText">Para realizar un pago con tarjeta de crédito o débito, utilice nuestra terminal en línea indicando monto, referencia y dando clic en el botón YPC:</p>
                  {/* Este formulario es el primero que se muestra dentro de esta sección */}
                  <Container>
                    <Row>
                      <Col sm="12" md={{ size: 10, offset: 1}}>
                        <Form>
                          <p>Monto</p>
                          <FormGroup>
                            <Label for="exampleMonto" className="custom-file-label"></Label>
                            <Input type="text" name="monto" id="exampleMonto" placeholder=""/>
                          </FormGroup>
                          <br/>
                          <p>Referencia</p>
                          <FormGroup>
                            {/* <Label for="exampleReferencia">Referencia</Label> */}
                            <Input type="text" name="referencia" id="exampleReferencia" placeholder=""/>
                          </FormGroup>
                        </Form>
                        <br/>
                        <BtnGeneral className="btnTarjeta" title="Siguiente"  onClick={()=>{ this.props.closeDrawer()}}/>
                      </Col>
                    </Row>
                  </Container>
                  <br/><br/><br/>
                  {/* Despues de dar click en el boton del formulario anterior se esconde el primer formulario y se muestra este */}
                  <Container>
                    <Row>
                      <Col sm="12" md={{ size: 10, offset: 1}}>
                        <div><img src={logo} alt="logo" className="logoMessa center"/></div>
                        <FormGroup>
                          <Label for="exampleUsuario">Usuario</Label>
                          <Input type="text" name="usuario" id="exampleUsuario" placeholder=""/>
                        </FormGroup>
                        <br/>
                        <FormGroup>
                          <Label for="examplePassword">Contraseña</Label>
                          <Input type="password" name="password" id="examplePassword" placeholder=""/>
                        </FormGroup>
                        <br/>
                        <BtnGeneral className="btnTarjeta center" title="Iniciar Sesión"/>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="3">
            <Container>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}></Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="4">
            <Container>
              <Row>
                <Col sm="12" md={{ size: 12 }} className="center containerTab2">
                  <Buscar className="center"/>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col sm="12" md={{ size: 12 }} className="center containerTab2">
                  <CustomTabulatorTable
                    id="table-tabulator-1"
                    className="tabulatorTable"
                    isVisible
                    data={data}
                    columns={columns}
                    options={{}}
                  />
                  <Button color="danger" onClick={this.toggle}>MODAL</Button>
                </Col>
              </Row>
            </Container>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Cuentas;
