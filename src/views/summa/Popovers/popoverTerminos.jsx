import React, { Component } from 'react';

// REACTSTRAP
import { 
  Label,
  FormGroup,
  Input,
  Row,
  Col,
} from 'reactstrap';

// PT-COMPONENTS
import {
  CustomRow,
  CustomCol,
  CustomButton,
} from "@pleedtech/pt-components";

// COMPONENTES
import Title from '../components/title';
import BtnGeneral from '../components/btnGeneral';
import BtnGeneralSec from '../components/btnGeneralSec';

class PopoverTerminos extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="content-popover">
        <Row><Col>
        <h4>¡Uy! ¿Seguro que diste el click correcto?</h4>
        </Col></Row>
        <Row>
          <Col><BtnGeneralSec title="Si, Rechazar" className="btnChild"/></Col>
          {/* <Col><BtnGeneral title="Aceptar" className="btnChild"/></Col> */}
        </Row>
     </div>
     );
  }
}
 
export default PopoverTerminos;