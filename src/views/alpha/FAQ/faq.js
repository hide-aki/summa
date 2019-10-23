import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import 'react-table/react-table.css';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Collapse, Statistic, Icon, Timeline, notification } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { connect } from 'react-redux';
import { MessagesFunctions } from '@pleedtech/pt-components/dist';
import { getStyle } from '@coreui/coreui-pro/dist/js/coreui-utilities.js';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../Plugins/Draggable/Draggable.css';
import { createStructuredSelector, createSelector } from 'reselect';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CustomButton,
  CustomCardBody,
  CustomCard,
  CustomCardHeader,
  CustomCol,
  CustomContainer,
  CustomForm,
  CustomRow,
  CustomCheckBox,
  CustomDatePicker,
  ALERT_TYPE,
} from '@pleedtech/pt-components';
import { isNullOrUndefined } from 'util';
import moment from 'moment';
import { TestChart } from '../test';
import {
  selectMessages,
  selectIdLanguage,
} from '../../../containers/languageProvider/selectors';
import actionsAlpha from './actions';
import {
  makeSelectDataProfile,
  selectLastStartSession,
  selectAccount,
  selectAccountType,
  selectAccountStatus,
  selectActivatedAt,
} from '../../../utils/selectors/dataUserProfileSelectors';

import defaultLayouts from '../../Plugins/Draggable/_layouts';

const breakPoints = {};
breakPoints.xl = parseInt(getStyle('--breakpoint-xl'), 10);
breakPoints.lg = parseInt(getStyle('--breakpoint-lg'), 10);
breakPoints.md = parseInt(getStyle('--breakpoint-md'), 10);
breakPoints.sm = parseInt(getStyle('--breakpoint-sm'), 10);
breakPoints.xs = parseInt(getStyle('--breakpoint-xs'), 10);

const ResponsiveGridLayout = WidthProvider(Responsive);

const Panel = Collapse.Panel;

function callback(key) {}

class faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning2: false,
      layouts: {},
      frequentQuestions: [],
      dataBalance: {},
      dataDeals: {},
      dateDB: '',
      defaultActiveFAQ: '',
      layouts: {
        xl: [{ i: 'c', x: 0, y: 0, w: 12, h: 4, static: true }],
        lg: [{ i: 'c', x: 0, y: 0, w: 12, h: 2, static: true }],
        md: [{ i: 'c', x: 0, y: 0, w: 12, h: 2, static: true }],
        sm: [{ i: 'c', x: 0, y: 0, w: 12, h: 2, static: true }],
        xs: [{ i: 'c', x: 0, y: 0, w: 12, h: 2, static: true }],
      },
    };
    this.messagesFunctions = new MessagesFunctions(props.messages);
  }

  async componentWillMount() {
    this.getFrequentQuestions();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { idLanguage } = this.props;
    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(nextProps.messages);
    }
    return true;
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

  getFrequentQuestions = async () => {
    const { postGetFrequentQuestions, dataProfile } = this.props;
    const { idCompany, idCustomer } = dataProfile;
    try {
      const data = {
        idCompany,
        idSystemUser: dataProfile.idSystemUser,
        idReviewTest: null,
        idReviewSection: null,
      };
      const response = await postGetFrequentQuestions(data);
      const { result } = response;
      if (isNil(result) === false && isEmpty(result) === false) {
        this.setState({
          frequentQuestions: result,
          defaultActiveFAQ: result[0].idReviewGrade.toString(),
        });
      }
    } catch (error) {
      this.openNotification(error.message, ALERT_TYPE.ERROR);
    }
  };

  toggleWarning2 = () => {
    this.setState({
      warning2: !this.state.warning2,
    });
  };

  render() {
    const {
      frequentQuestions,
      layouts,
      dataBalance,
      dataDeals,
      defaultActiveFAQ,
    } = this.state;
    const {
      lastStartSession,
      account,
      accountType,
      accountStatus,
    } = this.props;

    return (
      <div style={{ marginBottom: '30px' }}>
        <CustomRow>
          <CustomCol xs="12">
            <h1>
              {this.messagesFunctions.getMessageFromListMessagesCode(
                'FRL0000000000116',
                '',
              )}
            </h1>
            <p>
              {this.messagesFunctions.getMessageFromListMessagesCode(
                'FRL0000000000117',
                '',
              )}
            </p>
          </CustomCol>
        </CustomRow>
        <CustomRow>
          <CustomCol xs="12">
            <div className="animated fadeIn">
              <ResponsiveGridLayout
                // autoSize={true}
                className="layout"
                layouts={layouts}
                breakpoints={breakPoints}
                cols={{ xl: 12, lg: 12, md: 6, sm: 3, xs: 3 }}
                // rowHeight={{ sm: 3, xs: 3 }}
                isResizable={true}
                measureBeforeMount={true}
                draggableHandle={'.card-header'}
              >
                <Card key="c" className="card-accent-info">
                  <CardHeader>
                    <h5 className="m-0 p-0">
                      <i className="fa fa-question-circle-o mt-0 mr-1 yellow " />
                      &nbsp;{' '}
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000118',
                        '',
                      )}
                    </h5>
                  </CardHeader>
                  <CardBody className="card-chart-height">
                    {isEmpty(defaultActiveFAQ) === false && (
                      <Collapse
                        defaultActiveKey={[defaultActiveFAQ]}
                        onChange={callback}
                      >
                        {isEmpty(frequentQuestions) === false &&
                        Array.isArray(frequentQuestions)
                          ? frequentQuestions.map((item, index) => {
                              return (
                                <Panel
                                  header={this.messagesFunctions.getMessageFromListMessagesCode(
                                    item.reviewGrade,
                                    '',
                                  )}
                                  key={item.idReviewGrade}
                                >
                                  <p>
                                    {this.messagesFunctions.getMessageFromListMessagesCode(
                                      item.reviewAnswer,
                                      '',
                                    )}
                                  </p>
                                </Panel>
                              );
                            })
                          : ''}
                      </Collapse>
                    )}
                  </CardBody>
                </Card>
              </ResponsiveGridLayout>
            </div>
          </CustomCol>
        </CustomRow>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectDataProfile(),
  lastStartSession: selectLastStartSession(),
  account: selectAccount(),
  accountType: selectAccountType(),
  accountStatus: selectAccountStatus(),
  activatedAt: selectActivatedAt(),
  messages: selectMessages(),
  idLanguage: selectIdLanguage(),
});
const mapDispatchToProps = (dispatch) => ({
  postGetFrequentQuestions: (data) =>
    dispatch(actionsAlpha.postGetFrequentQuestions(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(faq);
