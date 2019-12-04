import React, { Component } from 'react';
// COMPONENTES
import Title from './components/title';
import Buscar from './components/search';
import BtnGeneral from './components/btnGeneral';
import BtnMain from './components/btnMain';
// IMAGENES
import fileEjemplo from '../../assets/img/summa/file.jpg';
import pasarela from '../../assets/img/summa/pasarelaYP.jpg';
import paytogo from '../../assets/img/summa/paytogo.png';
import payyo from '../../assets/img/summa/payyo.png';
import logoYP from '../../assets/img/summa/logoYP.png';

import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  Form,
} from 'reactstrap';
import classnames from 'classnames';
import CustomTabulatorTable from './componentTabulatorTable';
import CardsAccountDocuments from '../alpha/account/components/customDocumentsCards/cardsAccountDocuments';
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
    },
  },

  { title: 'No.', field: 'numero', width: 200 },
  { title: 'Fecha de déposito', field: 'fecha' },
  { title: 'Monto', field: 'monto' },
  { title: 'Método', field: 'metodo' },
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
      activeTab: '3',
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className="animated fadeIn containerCuentas" id="cuentas">
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
              <p className="center">Detalle de déposito</p>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Container className="containTabs">
              <Row>
                <Col sm="12" md={{ size: 12 }}>
                  <p className="MessageText">
                    Para realizar un depósito mediante transferencia bancaria o
                    deposito en ventanilla, puede realizarlo con los datos que a
                    continuación le proporcionamos, por favor indique el monto y
                    la opción deseada:
                  </p>
                  {/* Este formulario es el primero que se muestra dentro de esta sección */}
                  <Container>
                    <Row>
                      <Col sm="12" md={{ size: 8 }} className="bgForm">
                        <Form>
                          <Row>
                            <Col sm="12" md="6">
                              <p>Monto</p>
                              <FormGroup>
                                <Label
                                  for="exampleMonto"
                                  className="custom-file-label"
                                ></Label>
                                <Input
                                  type="text"
                                  name="monto"
                                  id="exampleMonto"
                                  placeholder="0.00"
                                />
                              </FormGroup>
                            </Col>
                            <Col></Col>
                          </Row>
                          <br />
                          <Row>
                            <Col sm="12" md="6">
                              <p>Tipo de transacción</p>
                              <FormGroup row>
                                <Col sm="12">
                                  <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                  >
                                    <option>Transferencia Nacional</option>
                                    <option>Transferencia Internacional</option>
                                    <option>Depósito en Ventanilla</option>
                                  </Input>
                                </Col>
                              </FormGroup>
                            </Col>
                            <Col sm="12" md="6">
                              <p>Cuenta</p>
                              <FormGroup row>
                                <Col sm="12">
                                  <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                  >
                                    <option>Santander USD</option>
                                    <option>Santander MXN</option>
                                  </Input>
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                        <br />
                        <br />
                        <br />
                      </Col>
                    </Row>
                    {/* Todos los datos a continuación agregado en <p> aparecen solo hasta que se ha elegido el tipo de cuenta */}
                    <Row>
                      <Col>
                        <Container className="containerDatos">
                          <Row>
                            <Col sm="12" md="6">
                              <h6>Nombre del beneficiario</h6>
                              <p>YOURPAYCHOICE SA de CV</p>
                              <br />
                              <br />
                            </Col>
                            <Col sm="12" md="6">
                              <h6>Banco beneficiario</h6>
                              <p>Santander MXN</p>
                              <br />
                              <br />
                            </Col>
                          </Row>
                          <Row>
                            <Col sm="12" md="6">
                              <h6>Dirección del banco beneficiario</h6>
                              <p>
                                Av. Insurgentes Sur 859 piso 2 ofna 249 Col.
                                Nápoles Delegación Benito Juárez, CDMX CP 03810
                              </p>
                              <br />
                              <br />
                            </Col>
                            {/* El número de cuenta solo aparece si es transferencia nacional */}
                            <Col sm="12" md="6">
                              <h6>No. de Cuenta</h6>
                              <p>65-50581142-9</p>
                              <br />
                              <br />
                            </Col>
                          </Row>
                          <Row>
                            <Col sm="12" md="6">
                              <h6>CLABE</h6>
                              <p>014180655058114296</p>
                              <br />
                              <br />
                            </Col>
                            <Col></Col>
                          </Row>
                        </Container>
                        <Row>
                          <Col md={{ size: 4 }} className="btnTarjeta">
                            <BtnGeneral title="Generar movimiento" />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Container className="containTabs">
              <Row>
                <Col sm="12">
                  <p className="MessageText">
                    Para realizar un pago con tarjeta de crédito o débito,
                    utilice nuestra terminal en línea indicando monto,
                    referencia y dando clic en el botón YPC:
                  </p>
                  {/* Este formulario es el primero que se muestra dentro de esta sección */}
                  <Container>
                    <Row>
                      <Col sm="12" md={{ size: 6 }} className="bgForm">
                        <Form>
                          <p>Monto</p>
                          <FormGroup>
                            <Label
                              for="exampleMonto"
                              className="custom-file-label"
                            ></Label>
                            <Input
                              type="text"
                              name="monto"
                              id="exampleMonto"
                              placeholder=""
                            />
                          </FormGroup>
                          <br />
                          <p>Referencia</p>
                          <FormGroup>
                            {/* <Label for="exampleReferencia">Referencia</Label> */}
                            <Input
                              type="text"
                              name="referencia"
                              id="exampleReferencia"
                              placeholder=""
                            />
                          </FormGroup>
                        </Form>
                        <br />
                        <Row>
                          <Col sm="12">
                            <Row>
                              <Col sm="12">
                                <Button onClick={''} className="btnLogoPas">
                                  <img
                                    src={logoYP}
                                    alt="logo"
                                    className="logoPasarela"
                                  />
                                </Button>
                              </Col>
                              <Col sm="12">
                                <Button onClick={''} className="btnLogoPas">
                                  <img
                                    src={paytogo}
                                    alt="logo"
                                    className="logoPasarela2"
                                  />
                                </Button>
                              </Col>
                              <Col sm="12">
                                <Button onClick={''} className="btnLogoPas">
                                  <img
                                    src={payyo}
                                    alt="logo"
                                    className="logoPasarela2"
                                  />
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm="12" md={{ size: 6 }}></Col>
                    </Row>
                  </Container>
                  <br />
                  <br />
                  <br />
                  {/* Despues de dar click en alguno de los logos del formulario anterior se esconde el primer formulario y se muestra este */}
                  <div>
                    <img src={pasarela} alt="logo" className="imgPasarela" />
                  </div>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="3">
            <Container className="containTabs">
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
                  {/* <Button color="danger" onClick={this.toggle}>MODAL</Button> */}
                  <div class="item-btn">
                    <button
                      type="button"
                      class="btn-icon-edit"
                      onClick={this.toggle}
                    >
                      <i class="fa fa-eye"></i>
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
          </TabPane>
        </TabContent>
        <div className="modal">
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className="containModal"
          >
            <ModalHeader className="modalHeader">
              <Row>
                <Col sm="12" md={{ size: 1 }}>
                  <button type="button" class="btnClose" onClick={this.toggle}>
                    <i class="fa fa-close"></i>
                  </button>
                </Col>
                <Col sm="12" md={{ size: 11 }}>
                  <h5 className="titleModal">
                    Depósito a cuenta Your Pay Choice{' '}
                  </h5>
                </Col>
              </Row>
            </ModalHeader>
            <ModalBody sm="12" md={{ size: 8, offset: 2 }}>
              <Container>
                <Row>
                  <Col>
                    <p>Movimiento:</p>
                    <p>
                      <strong>00037</strong>
                    </p>
                    <br />
                    <p>Fecha de depósito:</p>
                    <p>
                      <strong>20/11/2019</strong>
                    </p>
                  </Col>
                  <Col>
                    <p>Monto:</p>
                    <p>
                      <strong>$0.01</strong>
                    </p>
                    <br />
                    <p>Método:</p>
                    <p>
                      <strong>Transferencia Nacional</strong>
                    </p>
                  </Col>
                </Row>
              </Container>
              <br />
              <br />
              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <div
                    class="warningTable alert alert-success fade show"
                    role="alert"
                  >
                    <i class="fa fa-clock-o" aria-hidden="true"></i> Pendiente
                  </div>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="footerModal">
              <Row>
                <Col sm="12" md={{ size: 12 }} className="center">
                  <p>
                    El tipo de archivo debe ser: PDF, JPG o PNG (Máximo 5 MB).
                  </p>
                  <h4>Comprobante de transferencia</h4>
                  <BtnMain title="Subir Archivo" />
                  {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                </Col>
                <Col>
                  <CardsAccountDocuments
                    idTransactionCL={''}
                    idPaymentType={''}
                    documentType={''}
                  />
                </Col>
              </Row>
              {/* Aqui se visualiza el documento cargado solo en caso de que exista alguno */}
              <Row>
                <Col
                  sm="12"
                  md={{ size: 10, offset: 1 }}
                  className="center archivoModal"
                >
                  <Row>
                    <Col>
                      {/* Ejemplo de visualización de archivo */}
                      <div>
                        <img src={fileEjemplo} alt="logo" className="file" />
                      </div>
                    </Col>
                    <Col>
                      <button type="button" class="btnIcon" onClick={''}>
                        <i class="fa fa-trash btnTrash"></i>
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Cuentas;
