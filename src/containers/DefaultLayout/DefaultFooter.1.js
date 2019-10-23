import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <CustomRow className="insideFooterCtrl_al">
        <CustomCol xl="12">
          <p>
            De conformidad con la disposición octava transitoria de la Ley para
            se hace constar que, previo a la fecha de entrada en vigor de dicha
            Ley,
            <br />
            YourPayChoice ha llevado a cabo actividades reguladas como
            Institución de Fondo de Pago Electrónico ("IFPE"). <br /> Por lo
            anterior, YourPayChoice solicitará la autorización para operar como
            IFPE dentro del periodo transitorio permitido bajo la Ley y, a
            partir de la fecha en que solicite su autorización,
            <br /> YourPayChoice comunicará que ésta se encuentra en trámite. Lo
            anterior en el entendido de que las actividades realizadas
            actualmente y durante el periodo de trámite de dicha autorización,
            <br />
            no son supervisadas por las autoridades mexicanas competentes.
          </p>
          <p class="copyright">
            Copyright ©2019 Your Pay Choice. All rights reserved.
          </p>
        </CustomCol>
      </CustomRow>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
