import React, { Component } from 'react';
import Title from './components/title';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import { Form, FormGroup, Label, Input } from 'reactstrap';

  
 

class Datos extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      activeTab: "1",
    }
  }
  // toogle = tab => {
  //   if (this.state.activeTab !== tab) {
  //     this.setState({
  //       activeTab: tab
  //     });
  //   }
  // };
    
  render() {

    const {
      activeTab,
    } = this.state

    return ( 
      <div className="animated fadeIn">
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
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Container>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }} className="containerTab">
                  <Form>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Nombre/s</Label>
                      <Col sm={7}>
                        <Input type="text" name="select" id="exampleSelect" placeholder=""/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Apellido Paterno</Label>
                      <Col sm={7}>
                        <Input type="text" name="select" id="exampleSelect" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Apellido Materno</Label>
                      <Col sm={7}>
                        <Input type="text" name="select" id="exampleSelect" />
                      </Col>
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
                      <Col sm={7}>
                        <Input type="email" name="email" id="exampleEmail"/>
                      </Col>
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
                      <Col sm={7}>
                        <Input type="text" name="select" id="exampleSelect" placeholder=""/>
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Container>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }} className="containerTab">

                </Col>
              </Row>
            </Container>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
 
export default Datos;