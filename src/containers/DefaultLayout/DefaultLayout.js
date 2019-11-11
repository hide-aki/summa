import React, { Component, Suspense } from 'react';
import { push } from 'react-router-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MessagesFunctions, ALERT_TYPE } from '@pleedtech/pt-components';
import { notification } from 'antd';
import {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
  AppFooter,
} from '@coreui/react';

import navAlpha from '../../_nav_alpha';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import { makeSelectDataProfile } from 'utils/selectors/dataUserProfileSelectors';
import {
  selectMessages,
  selectIdLanguage,
} from '../languageProvider/selectors';
import { makeSelectGetSidebarMenuJson } from '../../utils/selectors/sidebarMenuSelectors';
import routes from '../../routes';
import { showToastrMessage } from '../../utils/actions/toastrActions';
import { makeSelectToastr } from '../../utils/selectors/toastrSelectors';
import { API_CONSTANTS } from '../../utils/constants/apiConstants';
import { selectToken } from '../../utils/selectors/dataUserProfileSelectors';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter.1'));


//menuSumma
  // const [dropdownOpen, setOpen] = useState(false);
  // const toggle = () => setOpen(!dropdownOpen);

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { translateRoutes: [] };
    this.messagesFunctions = new MessagesFunctions(props.selectMessages);
  }

  componentWillMount() {
    sessionStorage.setItem('countCall', 0);
    sessionStorage.setItem('total', 0);
    sessionStorage.setItem('countCallNegative', 0);
    const { menu, dataProfile } = this.props;
    this.getMenu(menu, dataProfile);
    this.checkCounter();
    this.translateRoutes();
  }

  shouldComponentUpdate(nextProps) {
    const {
      idLanguage,
      selectMessages,
      makeSelectToastr,
      dataProfile,
    } = this.props;
    const { menu } = nextProps;

    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(selectMessages);
      this.getMenu(menu, dataProfile);
    }

    if (dataProfile !== nextProps.dataProfile) {
      this.getMenu(menu, nextProps.dataProfile);
    }

    if (nextProps.makeSelectToastr.isOpen !== makeSelectToastr.isOpen) {
      this.openNotification(
        nextProps.makeSelectToastr.message,
        nextProps.makeSelectToastr.messageType,
      );
    }

    return true;
  }

  getMenu = (menu, profile) => {
    const transformMenu = menu.map((item) => {
      let isEnabled = true;
      if (isNil(profile.acceptedTerms) || profile.acceptedTerms === false) {
        isEnabled = false;
      }

      if (item.name === 'MNU0000000000004') {
        isEnabled = true;
      }

      return {
        class: item.class,
        icon: item.icon,
        name: this.messagesFunctions.getMessageFromListMessagesCode(
          item.name,
          item.name,
        ),
        url: item.url,
        title: isNil(item.title) === false ? item.title : false,
        wrapper: isNil(item.wrapper) === false ? item.wrapper : false,
        isEnabled,
      };
    });

    this.menu = { items: transformMenu };
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse" />
    </div>
  );

  globalLoaderReset = () => {
    if (window.location.href.indexOf('#') > -1) {
      sessionStorage.setItem(
        'initialUrl',
        window.location.href.replace('#', ''),
      );
    } else {
      sessionStorage.setItem('initialUrl', window.location.href);
    }

    if (
      sessionStorage.getItem('countCall') > 0 ||
      sessionStorage.getItem('countCall') < 0
    ) {
      sessionStorage.setItem('countCall', 0);
    }
    if (
      sessionStorage.getItem('countCallNegative') > 0 ||
      sessionStorage.getItem('countCallNegative') < 0
    ) {
      sessionStorage.setItem('countCallNegative', 0);
    }

    setInterval(() => {
      if (
        typeof parseInt(sessionStorage.getItem('countCall'), 10) === 'number' &&
        typeof parseInt(sessionStorage.getItem('countCallNegative'), 10) ===
          'number'
      ) {
        const count =
          parseInt(sessionStorage.getItem('countCall'), 10) -
          parseInt(sessionStorage.getItem('countCallNegative'), 10);
        if (count <= 0) {
          if (document.getElementById('top-loader') != null) {
            if (
              document.getElementById('top-loader').style.display === 'none'
            ) {
              return;
            }
            document.getElementById('top-loader').style.display = 'none';
          }
          sessionStorage.setItem('countCall', 0);
          sessionStorage.setItem('total', 0);
          sessionStorage.setItem('countCallNegative', 0);
        }
      }
    }, 100);
  };

  onChange = () => {
    this.globalLoaderReset();
  };

  signOut(e) {
    const { history } = this.props;
    e.preventDefault();
    history.push('/login');
  }

  openNotification = (description, messageType) => {
    let className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';

    switch (messageType) {
      case ALERT_TYPE.SUCCESS:
        className = 'ntfctnANTCtrl_bb successNtfctnCtrl';
        break;
      case ALERT_TYPE.WARNING:
        className = 'ntfctnANTCtrl_bb warningNtfctnCtrl';
        break;
      case ALERT_TYPE.ERROR:
        className = 'ntfctnANTCtrl_bb dangerNtfctnCtrl';
        break;
      case ALERT_TYPE.INFO:
        className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
        break;

      default:
        className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
        break;
    }

    notification.open({
      message: '',
      description,
      style: {},
      className,
    });
  };

  checkCounter() {
    const val = 3600000;
    const { redirectTo, token } = this.props;
    const interval = 1000;

    let counter = 0;

    if (isString(token) && isEmpty(token) === false) {
      const body = document.getElementsByTagName('body')[0]
        ? document.getElementsByTagName('body')[0]
        : null;

      if (isNil(body) === false) {
        body.addEventListener('mousemove', () => {
          counter = 0;
        });
        body.addEventListener('keypress', () => {
          counter = 0;
        });
        document.addEventListener('scroll', () => {
          counter = 0;
        });
        body.addEventListener('touchmove', () => {
          counter = 0;
        });
        body.addEventListener('touchstart', () => {
          counter = 0;
        });
        body.addEventListener('touchend', () => {
          counter = 0;
        });
        setInterval(() => {
          counter += interval;
          if (counter === val) {
            redirectTo(API_CONSTANTS.LOGIN_USER.LOGOUT);
          }
        }, interval);
      }
    }
  }

  translateRoutes = () => {
    if (Array.isArray(routes) && isEmpty(routes) === false) {
      const newRoutes = routes.map((item) => {
        let labelCode = '';
        switch (item.path) {
          case '/logout':
            labelCode = 'Logout';
            break;
          case '/cuenta':
            labelCode = 'FRL0000000000004';
            break;
          case '/depositos':
            labelCode = 'FRL0000000000054';
            break;
          case '/retiros':
            labelCode = 'Retiros';
            break;
          case '/estados':
            labelCode = 'Estado de cuenta';
            break;
          case '/privacidad':
            labelCode = 'Privacidad';
            break;
          case '/condiciones':
            labelCode = 'Condiciones';
            break;
          case '/dashboardAlpha':
            labelCode = 'Dashboard';
            break;

          default:
            labelCode = '';
            break;
        }
        return {
          ...item,
          name: this.messagesFunctions.getMessageFromListMessagesCode(
            labelCode,
            item.name,
          ),
        };
      });
      this.setState({ translateRoutes: newRoutes });
    }
  };

  render() {
    const { translateRoutes } = this.state;
    const { redirectTo, location, dataProfile } = this.props;

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          {window.location.href.indexOf('crm/modules/AuthUser') <= -1 && (
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                {/* <AppSidebarNav isOpen={true} navConfig={navAlpha} /> */}
                {isNil(this.menu) === false && isEmpty(this.menu) === false ? (
                  <nav className="scrollbar-container barralateral sidebar-nav sidebar-nav- ps ps-container">
                    <ul className="nav">
                      {navAlpha.map((item, index) => {
                        let content = null;
                        if (
                          isNil(item.title) === false &&
                          item.title === true
                        ) {
                          content = <li className="nav-title">{item.name}</li>;
                        } else {
                          content = (
                            <li
                              // className={`${item.class} nav-item`}
                              className={`${item.class}`}
                              onClick={() => {
                                if (item.isEnabled === true) {
                                  redirectTo(item.url);
                                }
                              }}
                            >
                              <a
                                className={`nav-link ${
                                  location.pathname === item.url ? 'active' : ''
                                }`}
                              >
                                <i className={`nav-icon ${item.icon}`}></i>
                                {item.name}
                              </a>
                            </li>
                          );
                        }

                        return content;
                      })}
                    </ul>
                  </nav>
                ) : null}
              </Suspense>
              <AppSidebarFooter />
              {/* <AppSidebarMinimizer /> */}
            </AppSidebar>
          )}
          <main className="main alfa_main summaMain" style={{ marginTop: '20px' }}>
            {/* <AppBreadcrumb appRoutes={translateRoutes} /> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {translateRoutes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => {
                          this.onChange();
                          return <route.component {...props} />;
                        }}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/loginSumma/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter className="alfa_footer">
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectMessages: selectMessages(),
  menu: makeSelectGetSidebarMenuJson(),
  makeSelectToastr: makeSelectToastr(),
  idLanguage: selectIdLanguage(),
  token: selectToken(),
  dataProfile: makeSelectDataProfile(),
});

const mapDispatchToProps = (dispatch) => ({
  showToastrMessage: (data) => dispatch(showToastrMessage(data)),
  redirectTo: (route) => dispatch(push(route)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultLayout);
