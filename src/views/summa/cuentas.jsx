import React, { Component } from 'react';
import Title from './title';
import Buscar from './search';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import classnames from 'classnames';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


const data = [{
    // detalles: <Button color="danger" onClick={this.state.toggle}>{buttonLabel}</Button>,
    detalles: <i class="fa fa-eye" aria-hidden="true"></i>,
    numero: '00013',
    fecha: '18/10/2019',
    monto: '$100.00',
    metodo: 'Déposito en ventanilla',
    estado: <Alert className="warningTable"><i class="fa fa-clock-o" aria-hidden="true"></i>  Pendiente</Alert>,
  }]
  
  const columns = [{
    Header: 'Detalles',
    accessor: 'detalles' // String-based value accessors!
  }, {
    Header: 'No.',
    accessor: 'numero',
  },{
    Header: 'Fecha de déposito',
    accessor: 'fecha',
  },{
    Header: 'Monto',
    accessor: 'monto',
  },{
    Header: 'Método',
    accessor: 'metodo',
  },{
    Header: 'Estado',
    accessor: 'estado',
  }]

class Cuentas extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      activeTab: "4",
    }
  }
    
  render() {

    const {
      activeTab,
    } = this.state



    return ( 
      <div className="animated fadeIn">
        {/* <Modal isOpen={modal} toggle={this.state.toggle} className={className}>
          <ModalHeader toggle={this.state.toggle} close={closeBtn}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.state.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.state.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal> */}

        <Title title="Depósitos"/>
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
              <p className="center">Transferencia bancaría/Depósito en ventanilla</p>
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
              <p className="center">Tarjeta de débito/Tarjeta de crédito</p>
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
              <p className="center">Otras Opciones</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => {
                this.setState({
                  activeTab: "4"
                })
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
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Container>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="3">
            <Container>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                </Col>
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
                <Col sm="12" md={{ size: 12}} className="center containerTab2">
                  <ReactTable
                    data={data}
                    columns={columns}
                    className="-striped"
                    defaultPageSize="4"
                  />
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