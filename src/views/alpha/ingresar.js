import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
  Row,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';

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
  CustomToastr,
} from '@pleedtech/pt-components';

class Iniciar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }
  entrar = () => {
    this.props.history.push('/charts');
  };
  loading = () => (
    <div className="sk-cube-grid gridLoader">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
    </div>
  );

  render() {
    return (
      <div className="app login">
        <div className="logo_alpha" />
        <CustomContainer>
          <CustomRow className="justify-content-center">
            <CustomCol md="6">
              <CustomCard className="p-4 card_login">
                <CustomCardBody>
                  <CustomForm>
                    <h1>Iniciar sesión</h1>
                    <p className="text-muted">
                      Accede al mundo de divisas con la mejor plataforma del
                      mercado.
                    </p>
                    <CustomInputGroup className="mb-3">
                      <CustomInputGroupAddon addonType="prepend">
                        <CustomInputGroupText>
                          <i className="icon-user"></i>
                        </CustomInputGroupText>
                      </CustomInputGroupAddon>
                      <CustomInput
                        isVisible
                        type="text"
                        placeholder="Usuario"
                        autoComplete="username"
                      />
                    </CustomInputGroup>
                    <CustomInputGroup className="mb-4">
                      <CustomInputGroupAddon addonType="prepend">
                        <CustomInputGroupText>
                          <i className="icon-lock"></i>
                        </CustomInputGroupText>
                      </CustomInputGroupAddon>
                      <CustomInput
                        isVisible
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                      />
                    </CustomInputGroup>
                    <CustomRow>
                      <CustomCol xs="6">
                        <Link className="btn btn-warning" to="/cuenta">
                          {' '}
                          Enviar
                        </Link>
                      </CustomCol>
                      <CustomCol xs="6" className="text-right">
                        <Link color="link" to="/recoverPass">
                          {' '}
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </CustomCol>
                    </CustomRow>
                  </CustomForm>
                </CustomCardBody>
              </CustomCard>
            </CustomCol>
          </CustomRow>
        </CustomContainer>
        <footer>
          <CustomCol md="12">
            <p className="legal">
              {' '}
              De conformidad con la disposición octava transitoria de la Ley
              para Regular las Instituciones de Tecnología Financiera ...{' '}
              <a
                href="https://ypc.biz/terms_of_use.html"
                target="_blank"
                className="info"
              >
                Más información
              </a>
            </p>
          </CustomCol>
        </footer>
      </div>
    );
  }
}

export default Iniciar;
