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
  ModalFooter

} from 'reactstrap';
import ReactTable from "react-table"
import "react-table/react-table.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  CustomAppSwitch,
  CustomSelect,
  CustomRadioButton,
  CustomCardHeader,
  CustomToastr
} from "@pleedtech/pt-components"
import  CustomDatePicker from '../../components/datePickerAnt'
class Estados extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: 1

    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

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
        aplicacion: "02/01/19",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35084 ",
        aplicacion: "09/10/18",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35085 ",
        aplicacion: "24/07/18",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35086 ",
        aplicacion: "02/06/18",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35087 ",
        aplicacion: "10/04/18",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35088 ",
        aplicacion: "01/03/18",
        monto: "$ 20,000.00",
        cuenta: "2000183589",
        metodo: "Transferencia bancaria",
        estado: <Badge color="success">Autorizado</Badge>,
        detalle: <i onClick={this.toggleWarning2} className="fa fa-eye ml-1"><span className="vermas"> Ver</span> </i>
      },
      {
        no: "35089 ",
        aplicacion: "26/01/18",
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
        Header: "Fecha de depósito",
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
        className: "vermas",
      }
    ];

    const data3 = [
      {
        descripcion: "Pagar con factura comercial #98792",
        precio: "USD3,000.00",
        total: <strong>USD3,000.00</strong>,
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
          <CustomCol xs="12">
            <h1>Estado de cuenta</h1>
            <p>Genere le reporte de todos los movimientos realizados en su cuenta.</p>
            <CustomCard>
              <CustomCardBody>
                <CustomForm action="" method="post" inline>

                <CustomRow>
                  {/* <FormGroup row className="my-0"> */}
                    <CustomCol xs="4">
                        <Label>Desde</Label>
                        <CustomCol xs="12" md="6">
                        <DatePicker datePickerClassName="input_date" placeholder="dd/mm/aaaa" format={dateFormat}/>
                      </CustomCol>
                    </CustomCol>
                    <CustomCol xs="4">
                        <Label>Hasta</Label>
                        <CustomCol xs="12" md="6">
                        <DatePicker datePickerClassName="input_date"  placeholder="dd/mm/aaaa" format={dateFormat}/>
                      </CustomCol>
                    </CustomCol>
                    <CustomCol xs="2">
                       <CustomButton label="Mostrar" classIcon="fa fa-file-text mr-1" isVisible type="submit" size="md" color="warning" className=" btn btn-md pr-2  btn-mostrar" />
                    </CustomCol>
                  {/* </FormGroup> */}
                </CustomRow>

                </CustomForm>
              </CustomCardBody>
            </CustomCard>

            <CustomCard>
              <CustomCardHeader>
                <i className="fa fa-file-text yellow"></i> Registro correspondiente a <strong>11/03/19</strong>
                {/* botones print+mail+descargar */}
                <CustomButton label="Imprimir" classIcon="fa fa-print mr-1" isVisible type="submit" size="sm" color="warning" className="btn btn-sm  mr-1 float-right" />
                <CustomButton label="Enviar por mail" classIcon="fa fa-paper-plane mr-1" isVisible type="submit" size="sm" color="light" className="btn btn-sm  mr-1 float-right" />
                <CustomButton label="descargar" classIcon="fa fa-download mr-1" isVisible type="submit" size="sm" color="light" className="btn btn-sm  mr-1 float-right" />
              </CustomCardHeader>
              <CustomCardBody>
                <ReactTable data={data} columns={columns} pageSize={5} showPageSizeOptions={false} nextText={"Siguiente"} previousText={"Anterior"} pageText={"Página"} ofText={"de"} />

                {/* <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Información de la cuenta</th>
                      <th></th>
                      <th>Resumen de la cuenta</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nombre</td>
                      <td>Usuario</td>
                      <td>Total G/P netas</td>
                      <td>Mex $0.00 </td>
                    </tr>
                    <tr>
                      <td>Moneda base</td>
                      <td>MXN</td>
                      <td>Total depósitos</td>
                      <td>Mex $0.00 </td>
                    </tr>
                    <tr>
                      <td>ID Cuenta</td>
                      <td>aperez@pleedtech.com</td>
                      <td>Total reembolsado</td>
                      <td>Mex $0.00 </td>
                    </tr>
                    <tr>
                      <td>Total reintegros</td>
                      <td>Solicitado</td>
                      <td>Total bonificaciones</td>
                      <td>Mex $0.00 </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td> </td>
                      <td>Ajustes Totales</td>
                      <td>--</td>
                    </tr>
                  </tbody>
                </Table> */}
              </CustomCardBody>
            </CustomCard>
          </CustomCol>
        </CustomRow>

        {/* Modal botón solicitud de retiro  */}
        <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleWarning}><i class="fa fa-hourglass-start mt-0 "></i> Verificación pendiente</ModalHeader>
          <ModalBody>
            Estamos validando sus datos por tanto agradecemos su espera y le invitamos a darle seguimiento a su proceso en el estatus del detalle de depósito.
          </ModalBody>
        </Modal>

        {/* Modales ver detalle Depósitos */}
        <Modal isOpen={this.state.warning2} toggle={this.toggleWarning2}
          className={'modal-warning modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.toggleWarning2}><i className="fa fa-file-text-o ml-1"></i>   Depósito a cuenta Your pay choice</ModalHeader>
          <ModalBody>
            <CustomCard>
              <CustomCardHeader>
                Factura comercial<strong> #98792</strong>
                {/* botones save + print */}
                <a className="btn btn-sm btn-warning mr-1 float-right"><i className="fa fa-print"></i> Imprimir</a>
                <a className="btn btn-sm btn-outline-warning  mr-1 float-right"><i className="fa fa-save"></i> Guardar</a>
              </CustomCardHeader>
              <CustomCardBody>
                <CustomRow className="mb-4">
                  <CustomCol sm="4">
                    <h6 className="mb-3">Titular:</h6>
                    <div><strong>Pablo Soria</strong></div>
                    <div>Watteu 40</div>
                    <div>México CDMX</div>
                    <div>pablosoria@pleedteech.com</div>
                    <div>+55 123 456 789</div>
                  </CustomCol>
                  <CustomCol sm="4">
                    <h6 className="mb-3">Cuenta Beneficiaria:</h6>
                    <div><strong>Your pay choice Group Ltd</strong></div>
                    <div>Unit(11)A, Main Office Tower Financial Park</div>
                    <div>Labuan 87000, W.P. Labuan, Malaysia</div>
                    <div>info@yourpaychoice.com</div>
                    <div>01 800 3989 8798</div>
                  </CustomCol>
                  <CustomCol sm="4">
                    <h6 className="mb-3">Detalle depósito:</h6>
                    <div>Orden<strong> #98792</strong></div>
                    <div>Marzo 23, 2019</div>
                    <div>Banco beneficiario: Deutche Kontor privatbank AG</div>
                    <div>Cuenta: Your pay choice Group Ltd</div>
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

export default Estados;
