import React, { Component } from 'react';
import MainTitle2 from '../components/mainTitle2';
import BtnMain from '../components/btnMain';
import { Row, Col, Jumbotron } from 'reactstrap';
import logo from '../../../assets/img/summa/logo.png';
import error from '../../../assets/img/summa/ouch.jpg';

class MessageError  extends Component {
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
                <MainTitle2 className="mainTitle2" title="¡Ouch!"/>
                <div><img src={error} alt="logo" className=""/></div>
                <p className="lead">Ha ocurrido algún error, por favor intenta de nuevo</p>
                <BtnMain title="Volver a inicio"/>
                <div><img src={logo} alt="logo" className="logoMessa"/></div>
              </Jumbotron>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}
 
export default MessageError;