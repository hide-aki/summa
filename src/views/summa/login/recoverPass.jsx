import React, { Component } from 'react';
import MainTitle from '../components/mainTitle';
import { Container, Row, Col, InputGroup, InputGroupAddon, Input, Button, FormGroup, Label } from 'reactstrap';
import imgBg from '../../../assets/img/summa/tren3.png';
import logo from '../../../assets/img/summa/logo.png';
import BtnText from '../components/btnText';

class recoverPass  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
          <div>
            <div className="animated fadeIn">
              <Col sm="12">
                <Row>
                  <Col sm="6" className="center bgPink bgTren">
                    <h1 className="titleWhite">GET <br/>MONEY <br/> NOW</h1>
                    {/* <img src={imgBg} alt="tren" className=""/> */}
                  </Col>
                  <Col sm="6" className="center bgWhite bgRecoverPass">
                    <MainTitle title="¿Olvidaste tu contraseña?" className="mainTitleRP"/>
                    <h4 className="subtitle">Te mandaremos las instrucciones <br/> para recuperar tu contraseña</h4>
                    <Container>
                      <Row>
                        <Col sm="12" md={{ size: 8, offset: 2  }}>
                          <form className="formRecoverPass">
                            <InputGroup className="inputLogin">
                              <InputGroupAddon addonType="prepend"><i class="fa fa-envelope"></i></InputGroupAddon>
                              <Input className="inputLogin" placeholder="Email" />
                            </InputGroup>
                          </form>
                          <br/>
                          <div>
                            <Button className="btnSumma" size="lg" block>Envìar</Button>
                          </div> 
                          <div>
                            <BtnText title="Cancelar" className="btnTxt"/>
                          </div> 
                          <img src={logo} alt="logo" className="logoRecoverPass"/>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Col>
            </div>
          </div>
        );
    }
}
 
export default recoverPass ;