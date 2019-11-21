import React, { Component } from 'react';
import MainTitle from '../components/mainTitle';
import { Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button, FormGroup, Label } from 'reactstrap';
import imgBg from '../../../assets/img/summa/tren3.png';
import imgNewPass from '../../../assets/img/summa/imgNewPass.png';
import logo from '../../../assets/img/summa/logo.png';

class newPass  extends Component {
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
            <Col sm="6" className="center bgWhite">
              <h1 className="mainTitle">Cambiar <br/>contraseña</h1>
              <Container>
                <Row>
                  <Col sm="12" md={{ size: 8, offset: 2  }}>
                    <form className="formNewPass">
                      <InputGroup className="inputLogin">
                        <InputGroupAddon addonType="prepend"><i class="fa fa-key"></i></InputGroupAddon>
                        <Input className="inputLogin" placeholder="Contraseña Nueva" />
                      </InputGroup>
                      <br/>
                      <InputGroup className="inputLogin">
                        <InputGroupAddon addonType="prepend"><i class="fa fa-key"></i></InputGroupAddon>
                        <Input className="inputLogin" placeholder="Confirmar Contraseña" />
                      </InputGroup>
                    </form>
                    <br/>
                    <div>
                      <Button className="btnSumma" size="lg" block>Cambiar</Button>
                    </div> 
                    <div>
                      <img src={imgNewPass} alt="logo" className="imgNewPass"/>
                    </div>
                    <div>  
                      <img src={logo} alt="logo" className="logoLogin"/>
                    </div>
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
 
export default newPass ;