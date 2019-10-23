import React, { Component } from 'react';
import { DatePicker } from 'antd';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  UncontrolledTooltip
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTable from "react-table"
import "react-table/react-table.css"
import {
  CustomButton,
  CustomCardBody,
  CustomCard,
  CustomCardGroup,
  CustomCol,
  CustomContainer,
  CustomForm,
  CustomInput,
  CustomInputGroup,
  CustomInputGroupAddon,
  CustomInputGroupText,
  CustomRow,
  CustomCheckBox,
  CustomDatePicker,
  CustomAppSwitch,
  CustomSelect,
  CustomRadioButton,
  CustomCardHeader,
  CustomToastr
} from "@pleedtech/pt-components"

class Retiros extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      warning2: false,
      warning: false,
      accordion: [true, false, false],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: 1,
      tooltipOpen: [false, false],
      
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  // toogleTooltip=(i) =>{
  //   const newArray = this.state.tooltipOpen.map((element, index) => {
  //     return (index === i ? !element : false);
  //   });
  //   this.setState({
  //     tooltipOpen: newArray,
  //   });
  // }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  togglelist(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleAccordion = (tab) => {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }
  toggleWarning = () => {
    this.setState({
      warning: !this.state.warning,
    });
  }
  toggleWarning2 = () => {
    this.setState({
      warning2: !this.state.warning2,
    });
  }


  render() {
    const dateFormat = 'DD/MM/YYYY';

    const data = [
      {
        no: "35082 ",
        aplicacion: "",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="warning">Pendiente</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35083 ",
        aplicacion: "13/03/19",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35084 ",
        aplicacion: "13/03/19",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35085 ",
        aplicacion: "13/03/19",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35086 ",
        aplicacion: "13/03/19",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35087 ",
        aplicacion: "13/03/19",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35088 ",
        aplicacion: "13/03/19",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35089 ",
        aplicacion: "13/03/19",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
    ];
    const columns = [
      {
        Header: "No.",
        accessor: "no" // String-based value accessors!
      },
      {
        Header: "Fecha de retiro",
        accessor: "aplicacion",
      },
      {
        Header: "Monto",
        accessor: "monto",
      },
      {
        Header: "Cuenta",
        accessor: "cuenta",
      },
      {
        Header: "Método",
        accessor: "metodo",
      },
      {
        Header: "Estado",
        accessor: "estado",
      },
      {
        Header: "Detalle",
        accessor: "detalle",
      }
    ];
    const data3 = [
      {
        descripcion: "factura comercial #98792",
        precio: "USD 3,000.00",
        total:<strong>USD 3,000.00</strong>,
      },

    ];
    const columns3 = [
      {
        Header: "Descripción",
        accessor: "descripcion" // String-based value accessors!
      },
      {
        Header: "Precio",
        accessor: "precio",
      },
      {
        Header: "Total",
        accessor: "total",
      },

    ];

    return (
      <div className="animated fadeIn">
        <CustomRow>
          <CustomCol>
            <h1>Retirar fondos </h1>
            <p>Por favor, llene todos los campos requeridos de la solicitud de retiro.</p>
          </CustomCol>
          <CustomCol xs="12">
            <div id="accordion" className="mb-5">
              <CustomCard>
                <CustomCardHeader id="headingOne">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                    <h5 className="m-0 p-0"><i class="fa fa-check-circle mt-0 yellow"></i> Información de la cuenta</h5>
                  </Button>
                </CustomCardHeader>
                <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">


                  <CustomCardBody>
                    <FormGroup>
                      <small className="subsectionName">Datos personales</small>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="nacional">Nacionalidad</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="nacional-input" name="nacional-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="text-input">País de residencia</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="country-input" name="country-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="address-input">Dirección</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="address-input" name="address-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>

                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="text-input">Código postal</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="" id="cp-input" name="cp-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>

                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="date-input">Fecha de nacimiento</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                      <DatePicker datePickerClassName="input_date" placeholder="dd/mm/aaaa" format={dateFormat} className="input-align"/>
                      </CustomCol>
                    </FormGroup>

                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="text-input">Nº de cuenta Your pay choice</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="" id="cp-input" name="cuenta-alfa-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>

                    {/* Call to action siguiente */}
                    <CustomButton label="Siguiente" classIcon="fa fa-lock mr-1" isVisible type="submit" size="md" color="warning" className=" btn btn-md buttonControlCheck" />
                  </CustomCardBody>


                  
                </Collapse>
              </CustomCard>
              
              {/* <CustomCard>
                <CustomCardHeader id="headingTwo">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                    <h5 className="m-0 p-0"><i class="fa fa-check-circle mt-0 yellow"></i> Información personal</h5>
                  </Button>
                </CustomCardHeader>
                <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                  <CustomCardBody>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="laboral-input">Situación laboral</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="laboral-input" name="laboral-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="ocupacion-input">Ocupación</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="ocupacion-input" name="ocupacion-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="ingreso-input">Ingreso anual</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="ingreso-input" name="ingreso-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="patrimonio-input">Patrimonio neto</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="patrimonio-input" name="text-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="text-input">¿Es ciudadano de los Estados Unidos de América? </Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="american-input" name="american-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>

                    <CustomButton label="Siguiente" classIcon="fa fa-lock mr-1" isVisible type="submit" size="md" color="warning" className=" btn btn-md buttonControlCheck" />
                  </CustomCardBody>
                </Collapse>
              </CustomCard>
 */}


              
              <CustomCard>
                <CustomCardHeader id="headingThree">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                    <h5 className="m-0 p-0"> <i class="fa fa-check-circle mt-0 yellow"></i> Datos bancarios</h5>
                  </Button>
                </CustomCardHeader>
                <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                  <CustomCardBody>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="bank-input">Banco beneficiario</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="bank-input" name="text-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="text-input">Dirección del banco beneficiario </Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="" id="direccionbanco-input" name="direccionbanco-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="text-input">Dirección del beneficiario </Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="" id="direccionbenefi-input" name="direccionbenefi-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="swift-input">Swift de la entidad bancaria</Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="swift-input" name="swift-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="iban-input">IBAN <i className="icon-question" id="TooltipExample"/></Label>
                        <UncontrolledTooltip placement="top" target="TooltipExample">
                          Noº de cuenta
                        </UncontrolledTooltip>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="text" id="iban-input" name="iban-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>
                    <FormGroup row>
                      <CustomCol md="3">
                        <Label htmlFor="text-input">Monto </Label>
                      </CustomCol>
                      <CustomCol xs="12" md="6">
                        <CustomInput isVisible type="" id="monto-input" name="monto-input" placeholder="" className="inputBordered" />
                      </CustomCol>
                    </FormGroup>

                    {/* Call to enviar solicitud de retiro */}
                    <CustomButton label="Enviar solicitud de retiro" classIcon="fa fa-plane mr-1" isVisible type="submit" size="md" color="warning" className=" btn btn-md buttonControlCheck" />
                  </CustomCardBody>
                </Collapse>
              </CustomCard>


              
            </div>
          </CustomCol>
        </CustomRow>


        {/* Modal botón solicitud de retiro  */}
        <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleWarning}><i class="fa fa-hourglass-start mt-0 "></i> Verificación pendiente</ModalHeader>
          <ModalBody>
            Estamos validando sus datos por tanto agradecemos su espera y le invitamos a darle seguimiento a su proceso en el estatus de solicitud de retiro.
            </ModalBody>
        </Modal>


        <CustomRow>
          <CustomCol xs="12">
            <h1 className="mt-10">Estatus de Solicitud</h1>
            <p>Visualice los retiros de su cuenta.</p>
            <CustomCard>
              <CustomCardHeader>
                <i className="fa fa-money yellow"></i> Mis movimientos
              </CustomCardHeader>
              <CustomCardBody>
                
               <ReactTable data={data} columns={columns} pageSize={5} showPageSizeOptions={false} nextText={"Siguiente"} previousText={"Anterior"} pageText={"Página"} ofText={"de"} />

                {/* <Table responsive striped>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Aplicación</th>
                      <th>Monto</th>
                      <th>Cuenta</th>
                      <th>Método de pago</th>
                      <th>Estado</th>
                      <th>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>35082</td>
                      <td>13/03/19</td>
                      <td>$ 10,000.00</td>
                      <td>2000183 Main Account</td>
                      <td>WIRE TRANSFER USD</td>
                      <td>
                        <Badge color="warning">Pendiente</Badge>
                      </td>
                      <td className="overview" onClick={this.toggleWarning}><i className="fa fa-eye ml-1"></i> Ver</td>
                    </tr>
                    <tr>
                      <td>35081</td>
                      <td>20/02/19</td>
                      <td>$ 5,000.00</td>
                      <td>2000183 Main Account</td>
                      <td>WIRE TRANSFER USD</td>
                      <td>
                        <Badge color="success">Autorizado</Badge>
                      </td>
                      <td className="overview" onClick={this.toggleWarning2}><i className="fa fa-eye ml-1"></i> Ver</td>
                    </tr>
                    <tr>
                      <td>35080</td>
                      <td>11/01/19</td>
                      <td>$ 5,000.00</td>
                      <td>2000183 Main Account</td>
                      <td>WIRE TRANSFER USD</td>
                      <td>
                        <Badge color="success">Autorizado</Badge>
                      </td>
                      <td className="overview" onClick={this.toggleWarning2}><i className="fa fa-eye ml-1"></i> Ver</td>
                    </tr>
                  </tbody>
                </Table>*/}
              </CustomCardBody>
            </CustomCard>
          </CustomCol>
        </CustomRow>

        {/* Modales ver detalle de estatus de solicitud de retiro */}
        <Modal isOpen={this.state.warning2} toggle={this.toggleWarning2}
          className={'modal-warning modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.toggleWarning2}><i className="fa fa-file-text-o ml-1"></i>  Retiro de cuenta Your pay choice</ModalHeader>
          <ModalBody>
            <CustomCard>
              <CustomCardHeader>
                Factura comercial<strong> #98792</strong>
                {/* botones save + print */}
                <CustomButton label="Imprimir" classIcon="fa fa-print mr-1" isVisible type="submit" size="sm" color="warning" className="btn btn-sm btn-warning mr-1 float-right"/>
                <CustomButton label="Guardar" classIcon="fa fa-save mr-1" isVisible type="submit" size="sm" color="outline-dark" className="btn btn-sm btn-outline-warning mr-1 float-right"/>

              </CustomCardHeader>
              <CustomCardBody>
                <CustomRow className="mb-4">
                  <CustomCol sm="4">
                    <h6 className="mb-3">Cuenta:</h6>
                    <div><strong>Your pay choice Group Ltd</strong></div>
                    <div>Unit(11)A, Main Office Tower Financial Park</div>
                    <div>Labuan 87000, W.P. Labuan, Malaysia</div>
                    <div>info@yourpaychoice.com</div>
                    <div>01 800 3989 8798</div>
                  </CustomCol>

                  <CustomCol sm="4">
                    <h6 className="mb-3">Beneficiario:</h6>
                    <div><strong>Pablo Soria</strong></div>
                    <div>Watteu 40</div>
                    <div>11590 CDMX</div>
                    <div>pablosoria@pleedteech.com</div>
                    <div>+55 123 456 789</div>
                  </CustomCol>

                  <CustomCol sm="4">
                    <h6 className="mb-3">Detalle Retiro:</h6>
                    <div>Orden<strong> #98792</strong></div>
                    <div>Marzo 23, 2019</div>
                    <div>Banco beneficiario: Scotiabank</div>
                    <div>Cuenta  interbancaria</div>
                    <div>IBAN: DE23700111106030000577</div>
                    <div>SWIFT: DEKTDE7G</div>
                  </CustomCol>
                </CustomRow>
                {/* <Table striped responsive>
                  <thead>
                    <tr>
                      <th className="center">#</th>
                      <th>Item</th>
                      <th>Description</th>
                      <th className="center">Quantity</th>
                      <th className="right">Unit Cost</th>
                      <th className="right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="center">1</td>
                      <td className="left">Origin License</td>
                      <td className="left">Extended License</td>
                      <td className="center">1</td>
                      <td className="right">$999,00</td>
                      <td className="right">$999,00</td>
                    </tr>
                  </tbody>
                </Table> */}
              </CustomCardBody>
              <ReactTable data={data3} columns={columns3} pageSize={1} showPageSizeOptions={false} showPagination={false} />
            </CustomCard>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Retiros;
