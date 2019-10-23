import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from '@coreui/react';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { createStructuredSelector } from 'reselect';
import {
  selectMessages,
  selectIdLanguage,
} from '../languageProvider/selectors';
import DefaultHeaderDropdown from './DefaultHeaderDropdown';
import logo from '../../assets/img/brand/logo.png';
import logoXIC from '../../assets/img/brand/xic/alpha_xic.png';
import sygnet from '../../assets/img/brand/sygnet.png';
import sygnetXIC from '../../assets/img/brand/xic/alpha_icon_xic.png';
import GLOBAL_CONSTANTS from '../../utils/constants/globalConstants';
import { CustomSelectLanguage } from '../../components/customSelect';
import languageActions from '../languageProvider/actions';
import { makeSelectDataProfile } from '../../utils/selectors/dataUserProfileSelectors';
// TO DO: import { LANGUAGE_CATALOG } from '../../components/customSelectLanguage/constants';

const objectPropTypes = {
  children: PropTypes.oneOfType([PropTypes.object]),
  token: PropTypes.string,
  logOutAction: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  idLanguage: PropTypes.string.isRequired,
  idSystemUser: PropTypes.string,
  idDefaultLoginKey: PropTypes.string,
  setIdLanguage: PropTypes.func.isRequired,
};

const defaultProps = {
  children: null,
  token: '',
  idSystemUser: '',
  idDefaultLoginKey: '',
};
class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: 'MX',
      catalogLanguages: [
        {
          id: 2,
          language: 'MX',
        },
        /*
        {
          id: 1,
          language: 'US',
        },
        */
      ],
      data: [
        {
          id: 'MX',
          text: 'MX',
          value: {
            isSelected: false,
            isSelectedAll: true,
            style: '[{"classIcon":"flag-icon flag-icon-mx flag-icon-xx"}]',
            idLanguage: '2',
          },
        },
        /*
        {
          id: 'US',
          text: 'US',
          value: {
            isSelected: false,
            isSelectedAll: true,
            style: '[{"classIcon":"flag-icon flag-icon-us flag-icon-xx"}]',
            idLanguage: '1',
          },
        },
        */
      ],
    };
  }

  componentWillMount() {
    const { idLanguageSession } = window.localStorage;
    this.setState({
      defaultValue: this.getDefaultCountryByIdLanguage(idLanguageSession),
    });
    this.handleGetMessages(idLanguageSession);
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    // this.checkIdLanguageIsUpdated(nextProps, nextState);
    return true;
  }

  getLanguageById = (language = '') => {
    let index = 0;
    const { catalogLanguages } = this.state;
    let idLanguage = '';
    for (index; index < catalogLanguages.length; index += 1) {
      if (catalogLanguages[index].language === language) {
        idLanguage = catalogLanguages[index].id.toString();
        break;
      }
    }
    return idLanguage;
  };

  getDefaultCountryByIdLanguage = (defaultCountry) => {
    let countryId = isEmpty(defaultCountry) === false ? defaultCountry : 'MX';
    let defaultCountryParam = isEmpty(defaultCountry)
      ? countryId
      : defaultCountry;
    const { idLanguageSession } = window.localStorage;
    if (isEmpty(defaultCountry) === false) {
      switch (defaultCountryParam) {
        case '1':
          countryId = 'US';
          break;
        case '2':
          countryId = 'MX';
          break;
        default:
          countryId = 'US';
          break;
      }
      return countryId;
    }
    if (isNil(idLanguageSession) && isEmpty(idLanguageSession)) {
      defaultCountryParam = idLanguageSession;
    }
    return defaultCountryParam;
  };

  handleGetMessages = (idLanguage) => {
    const { getMessages, dataProfile, typeParam } = this.props;
    const { idSystemUser, idCompany } = dataProfile;

    getMessages({
      idSystemUser,
      idCompany,
      idLanguage,
      typeParam, // ??
    });
  };

  checkIdLanguageIsUpdated = (nextProps) => {
    const { idLanguage } = this.props;
    if (nextProps.idLanguage !== idLanguage) {
      this.handleGetMessages(nextProps.idLanguage);
    }
  };

  /**
   * event, index, value, dataObject
   */

  handleOnChangeLanguage = (event, index, value) => {
    const { setIdLanguage, idLanguage } = this.props;
    this.setState({
      defaultValue: this.getDefaultCountryByIdLanguage(value),
    });
    const idNewLanguage = this.getLanguageById(value);
    localStorage.setItem('idLanguage', idNewLanguage);
    // setIdLanguage(idLanguage);
    if (idNewLanguage !== idLanguage) {
      this.handleGetMessages(idNewLanguage);
    }
  };

  render() {
    // eslint-disable-next-line
    const { children, dataProfile, profilePicture } = this.props;
    const { data, defaultValue } = this.state;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 53, height: 50, alt: 'Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          {/* <DefaultHeaderDropdown notif /> */}
          {/* <DefaultHeaderDropdown tasks/> */}
          {/* <DefaultHeaderDropdown mssgs/> */}
          {/* <DefaultHeaderDropdown onLogout={this.props.onLogout} accnt/> */}
          <NavItem className="language-selectPicker languagePickerHeader">
            <CustomSelectLanguage
              id="idCustomInput-3"
              right={false} // true o false -icon position
              className="languagePicker alfa-languagePicker"
              left // true o false - icon position
              disabled={false}
              defaultValue={defaultValue}
              def
              data={data}
              onChange={this.handleOnChangeLanguage}
            />
          </NavItem>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
        <div className="linear-activity" id="top-loader">
          <div className="indeterminate">something</div>
        </div>
      </React.Fragment>
    );
  }
}
DefaultHeader.propTypes = objectPropTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectDataProfile(),
  idLanguage: selectIdLanguage(),
});

/* const mapStateToProps = (state) => {
  const { dataProfile } = state.dataProfile;
   return {
    token: dataProfile.token,
    idDefaultLoginKey: dataProfile.idDefaultLoginKey,
    dataProfile,
    idLanguage: state.language.idLanguage,
    idSystemUser: dataProfile.idSystemUser,
    idCompany: dataProfile.idCompany,
  };
}; */

const mapDispatchToProps = (dispatch) => ({
  getMessages: (data) => dispatch(languageActions.getMessages(data)),
  setIdLanguage: (idLanguage) =>
    dispatch(languageActions.setIdLanguage(idLanguage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultHeader);
