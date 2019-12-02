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
  Modal,
  ModalHeader,
  ModalBody,
  Input, 
  FormGroup, 
  Label,
  Form,
} from 'reactstrap';
import classnames from 'classnames';
// COMPONENTES
import Title from './components/title';
import BtnUpload from './components/btnUpload';
import BtnDelete from './components/btnDelete';
import BtnGeneral from './components/btnGeneral';
import BtnGeneralSec from './components/btnGeneralSec';
// IMAGENES
import cardEjem from '../../assets/img/summa/cardEjem.jpg';
import credit from '../../assets/img/summa/credit.jpg';
import domi from '../../assets/img/summa/domi.jpg';
import indicadores from '../../assets/img/summa/indicadores.png';
import paso1 from '../../assets/img/summa/paso1.png';
import paso2 from '../../assets/img/summa/paso2.png';
import paso3 from '../../assets/img/summa/paso3.png';

  
class Datos extends Component {
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
      <div className="animated fadeIn containDatos" id="datos">
        <Title title="Datos Generales"/>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                this.setState({
                  activeTab: "1"
                })
              }}
            >
              <p className="center">Mi Perfil</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                this.setState({
                  activeTab: "2"
                })
              }}
            >
              <p className="center">Cuestionario</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                this.setState({
                  activeTab: "3"
                })
              }}
            >
              <p className="center">Documentación</p>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Container  className="containTabs">
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }} className="containerTab bgForm">
                  <Form>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Nombre/s</Label>
                      <Col sm={7}><Input type="text" name="select" id="exampleSelect" placeholder=""/></Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Apellido Paterno</Label>
                      <Col sm={7}><Input type="text" name="select" id="exampleSelect" /></Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Apellido Materno</Label>
                      <Col sm={7}><Input type="text" name="select" id="exampleSelect" /></Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelectMulti" sm={3}>Género</Label>
                      <Col sm={7}>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Mujer</option>
                          <option>Hombre</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={3}>Correo electrónico</Label>
                      <Col sm={7}><Input type="email" name="email" id="exampleEmail"/></Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={3}>Fecha de Nacimiento</Label>
                      <Col sm={7}>
                        <Input
                          type="date"
                          name="date"
                          id="exampleDate"
                          placeholder="dd/mm/aaaa"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleNumber" sm={3}>Teléfono</Label>
                      <Col sm={7}>
                        <Input
                          type="number"
                          name="number"
                          id="exampleNumber"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelectMulti" sm={3}>País</Label>
                      <Col sm={7}>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>1</option>
                          <option>2</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Dirección</Label>
                      <Col sm={7}><Input type="text" name="select" id="exampleSelect" placeholder=""/></Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Container className="containTabs">
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }} className="containerTab">
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="3">
            <Container  className="containTabs">
              <Row><Col><div><img src={indicadores} alt="logo" className="indicadores"/></div></Col></Row>
              <Row>
                <Col sm="12" md={{ size: 7 }} className="containerTabTitle infoCardDatos infoFileG">
                  <Row>
                    <Col>
                      <div><img src={cardEjem} alt="logo" className="fileImg"/></div>
                      {/* <div><img src={card} alt="logo" className="fileImg"/></div>Esta imagen se vera en caso de que no exista algun archivo subido por el usuario */}
                    </Col>
                    <Col  className="InfoDocuments">
                      <div><strong>Identificación Oficial</strong></div>
                      <div className="infoDoc">12345678909876</div>      
                      <div class="item-btn"><button type="button" class="btn-icon-edit" onClick={this.toggle}><i class="fa fa-edit"></i></button></div>{/* Esta imagen se vera en caso de que no exista algun archivo subido por el usuario */}
                    </Col>
                  </Row>                
                </Col>
                <Col sm="12" md={{ size: 7 }} className="containerTabTitle infoCardDatos infoFileR">
                  <Row>
                    <Col className=""><div><img src={domi} alt="logo" className="fileImg"/></div></Col>
                    <Col className="InfoDocuments">
                      <div><strong>Comprobante de Domicilio</strong></div>
                      <div className="infoDoc">-----</div>
                      <div class="item-btn"><button type="button" class="btn-icon-edit" onClick={this.toggle}><i class="fa fa-edit"></i></button></div>
                    </Col>
                  </Row>                
                </Col>
                <Col sm="12" md={{ size: 7 }} className="containerTabTitle infoCardDatos infoFileY">
                  <Row>
                    <Col className=""><div><img src={credit} alt="logo" className="fileImg"/></div>{/* Esta imagen se vera en caso de que no exista algun archivo subido por el usuario */}</Col>
                    <Col className="InfoDocuments">
                      <div><strong>Tarjeta de Crédito</strong></div>
                      <div className="infoDoc">0987654321123456</div>
                      <div className="infoDoc">12/24</div>
                      <div class="item-btn"><button type="button" class="btn-icon-edit" onClick={this.toggle}><i class="fa fa-edit"></i></button></div>
                    </Col>
                  </Row>                
                </Col>
              </Row>
            </Container>
          </TabPane>
        </TabContent>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader className="modalHeader">
              <Row><Col md={{ size: 12 }}><h5 className="titleModal">Editar Documento</h5></Col></Row>
            </ModalHeader>
            <ModalBody md={{ size: 8, offset: 2 }} className="bodyModal">
              <Row>
                <Col className="center">
                  <div><img src={paso1} alt="logo" className="fileImg"/></div>
                  <p md={{ size: 10 }}>Sube un archivo de tu documento en formato pdf por ambos lados.</p>
                </Col>
                <Col className="center">
                  <div><img src={paso2} alt="logo" className="fileImg"/></div>
                  <p md={{ size: 10 }}>Ingresa los datos correspondientes en los campos indicados.</p>
                </Col>
                <Col className="center">
                  <div><img src={paso3} alt="logo" className="fileImg"/></div>
                  <p md={{ size: 10 }}>Revisa que los datos sean correctos  y confirma dando click en el botón “ACEPTAR”.</p>
                </Col>
              </Row>
              <div className="espacio"></div>
              <Row className="archivoModal2">
                <Col  md={{ size: 6 }} className="center">
                  <div><img src={cardEjem} alt="logo" className="imgFile"/></div>
                  <Row>
                    <Container className="center">
                      <Row>
                        <Col><BtnUpload/></Col>
                        <Col><BtnDelete/></Col>
                      </Row>
                    </Container>
                  </Row>
                </Col>
                <Col md={{ size: 6 }} className="infoText">
                  <h4>Identificación Oficial</h4>
                  <div className="espacio"></div>
                  <Form>
                    <FormGroup>
                      <Label for="exampleIdentificacion">Número de Identificación Oficial</Label>
                      <Input type="text" name="identificacion" id="exampleIdentificacion" placeholder="12345678909876" />
                    </FormGroup>
                  </Form>
                  <div><div class="completo alert alert-success fade show" role="alert">Completo</div></div>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col xs="12">
                  <Container className="btnTC center">
                    <Row>
                      <Col onClick={this.toggle}><BtnGeneralSec title="Cancelar" className="btnChild"/></Col>
                      <Col onClick={this.toggle}><BtnGeneral title="Aceptar" className="btnChild"/></Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}
 
export default Datos;