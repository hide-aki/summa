import React, { Component } from 'react';
import MainTitle from '../mainTitle';
import { Container, Row, Col, InputGroup, InputGroupAddon, Input, Button, FormGroup, Label } from 'reactstrap';
import imgLogin from '../../../assets/img/summa/imgLogin.jpg';
import logo from '../../../assets/img/summa/logo.png';

class Login  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="animated fadeIn">
        <Col sm="12">
          <Row>
            <Col sm="6" className="center bgPink bgTren">
              <h1 className="titleWhite">GET <br/>MONEY <br/> NOW</h1>
            </Col>
            <Col sm="6" className="center bgWhite bgLogin">
              <MainTitle title="Iniciar Sesión"/>
              <Container>
                <Row>
                  <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <form className="form">
                      <InputGroup className="inputLogin">
                        <InputGroupAddon addonType="prepend"><i class="fa fa-envelope"></i></InputGroupAddon>
                        <Input className="inputLogin" placeholder="Email" />
                      </InputGroup>
                      <br/>
                      <InputGroup className="inputLogin">
                        <InputGroupAddon addonType="prepend"><i class="fa fa-key"></i></InputGroupAddon>
                        <Input className="inputLogin" placeholder="Contraseña" />
                      </InputGroup>
                    </form>
                    <br/>
                    <div>
                      <Button className="btnSumma" size="lg" block>Entrar</Button>
                      <br/>
                      <FormGroup check>
                        <Label className="checkboxSumma" check>
                          <Input type="checkbox"/>
                          Remember Me
                        </Label>
                      </FormGroup>
                    </div> 
                    <div><img src={imgLogin} alt="logo" className="imgLogin center"/></div>
                    <div><img src={logo} alt="logo" className="logoLogin"/></div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}
 
export default Login ;