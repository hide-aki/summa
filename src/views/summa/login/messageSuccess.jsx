import React, { Component } from 'react';
import MainTitle2 from '../components/mainTitle2';
import BtnMain from '../components/btnMain';
import { Row, Col, Jumbotron } from 'reactstrap';
import logo from '../../../assets/img/summa/logo.png';
import exito from '../../../assets/img/summa/exito.jpg';
import exito2 from '../../../assets/img/summa/exito2.jpg';

class MessageSuccess  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="animated fadeIn">
        <Col sm="12">
          <Row>
            <Col sm="12" className="center bgTren bgMess">
              <Jumbotron className="jumbotronSumma">
                {/* <div><img src={logo} alt="logo" className="logoMessa"/></div> */}
                <MainTitle2 className="mainTitle2" title="¡Bravo!"/>
                <div><img src={exito2} alt="logo" className=""/></div>
                <p className="lead">Tu cuenta ya esta activada</p>
                <BtnMain title="Acceder a mi cuenta"/>
                <div><img src={logo} alt="logo" className="logoMessa"/></div>
              </Jumbotron>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}
 
export default MessageSuccess;