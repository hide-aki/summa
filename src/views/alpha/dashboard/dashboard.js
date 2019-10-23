import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import 'react-table/react-table.css';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {
  Collapse,
  Statistic,
  Icon,
  Timeline,
  notification,
  DatePicker,
} from 'antd';
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
import { postGetDBdate } from '../../../utils/actions/systemConfigurationsActions';
import {
  makeSelectDataProfile,
  selectLastStartSession,
  selectAccount,
  selectAccountType,
  selectAccountStatus,
  selectActivatedAt,
} from '../../../utils/selectors/dataUserProfileSelectors';

const dateFormat = 'DD-MM-YYYY HH:mm';

const formatMoneyJson = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 20,
};
const locale = 'en-US';

const moneyFormat = new Intl.NumberFormat(locale, formatMoneyJson);

class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning2: false,
      dataBalance: {},
      dataDeals: {},
      dateDB: '',
      dataArr: [],
      optionsArr: [],
      startDate: null,
      endDate: null,
      displayMovil: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
    };
    this.messagesFunctions = new MessagesFunctions(props.messages);
  }

  componentWillMount() {
    this.getDBdate();
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

  handleStartDate = (value) => {
    this.setState({ startDate: value });
  };

  handleEndDate = (value) => {
    this.setState({ endDate: value });
  };

  getBalance = async () => {
    const { getDataUser, activatedAt, account } = this.props;
    const { dateDB } = this.state;
    const userId = account;
    try {
      const response = await getDataUser(userId);
      const { result } = response;
      if (isNil(result) === false && isEmpty(result) === false) {
        this.setState({ dataBalance: result });
      }
      this.getDeals(activatedAt, dateDB);
    } catch (error) {
      this.openNotification(error.message, ALERT_TYPE.ERROR);
    }
  };

  getDBdate = () => {
    const { activatedAt, postGetDBdate } = this.props;
    return new Promise(async (resolve, reject) => {
      try {
        const response = await postGetDBdate({});
        const { result } = response;
        if (isNil(result) === false && isEmpty(result) === false) {
          this.setState(
            {
              dateDB: result.dBdate,
              endDate: moment(result.dBdate),
              startDate: moment(activatedAt),
            },
            () => {
              resolve(this.getBalance());
            },
          );
        }
      } catch (error) {
        this.openNotification(error.message, ALERT_TYPE.ERROR);
      }
    });
  };

  getDeals = async (from, to) => {
    const { postGetUserDeals, account } = this.props;
    const data = {
      from,
      to,
      offset: '0',
      user: account,
    };

    try {
      const response = await postGetUserDeals(data);
      const { result } = response;
      if (isNil(result) === false && isEmpty(result) === false) {
        const dataDeals = [...result.deals];
        const noSortData = [...result.deals];
        const sortData = dataDeals.reverse().map((item) => {
          return {
            ...item,
            timeFormat: moment.unix(item.time).format('DD-MM-YYYY'),
            hrsFormat: moment.unix(item.time).format('HH:mm'),
            profitFormat: this.formatMoney(item.profit),
          };
        });
        this.setState({ dataDeals: sortData });
        this.createGrah(noSortData);
      }
    } catch (error) {
      this.openNotification(error.message, ALERT_TYPE.ERROR);
    }
  };

  colorAction = (profit) => {
    if (profit <= 0) {
      return 'rgba(0,0,0,.4)';
    }
    return '#009e77';
  };

  formatMoney = (money) => {
    let formatMoney = money;
    if (isNil(money) === false || isEmpty(money) === false) {
      formatMoney = moneyFormat.format(money);
      return `${formatMoney} USD`;
    }
    return '';
  };

  toggleWarning2 = () => {
    this.setState({
      warning2: !this.state.warning2,
    });
  };

  searchDeals = () => {
    const { startDate, endDate } = this.state;
    if (
      moment(startDate) > moment(endDate) ||
      isNil(startDate) === true ||
      isNil(endDate) === true
    ) {
      notification.open({
        message: this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000119',
          '',
        ),
        description: '',
        style: { color: 'white' },
        className: 'ntfctnANTCtrl_bb dangerNtfctnCtrl',
      });
    } else {
      this.getDeals(
        moment(startDate).startOf('day'),
        moment(endDate).endOf('day'),
      );
    }
  };

  cleanSearch = () => {
    const { activatedAt } = this.props;
    const { dBdate } = this.state;
    this.setState({ endDate: moment(dBdate), startDate: moment(activatedAt) });
    this.getDeals(moment(activatedAt), moment(dBdate));
  };

  createGrah = (data) => {
    const labelsArr = [];
    const datArr = [];
    const colorsGraphBkgrnd = [];
    const colorsGraphHover = [];

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].profit !== 0) {
        labelsArr.push(`${moment.unix(data[i].time).format(dateFormat)} hrs`);
        datArr.push(data[i].profit);
        colorsGraphBkgrnd.push(
          data[i].profit > 0 ? 'rgba(0, 158, 119, .2);' : 'rgba(0,0,0,.4)',
        );
        colorsGraphHover.push(
          data[i].profit > 0 ? 'rgba(0, 158, 119, .6);' : 'rgba(0,0,0,.8)',
        );
      }
    }

    const bar = {
      labels: labelsArr,
      datasets: [
        {
          display: false,
          borderColor: colorsGraphHover,
          backgroundColor: colorsGraphBkgrnd,
          hoverBackgroundColor: colorsGraphHover,
          data: datArr,
        },
      ],
    };

    const options = {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000113',
          '',
        ),
      },
      scales: {
        yAxes: [{ ticks: { beginAtZero: true } }],
        xAxes: [{ ticks: { display: !this.state.displayMovil } }],
      },
      tooltips: {
        callbacks: {
          title: (tooltipItem, data) => {
            return data.labels[tooltipItem[0].index];
          },
          label: (tooltipItem, data) => {
            const labelCase =
              data.datasets[0].data[tooltipItem.index] > 0
                ? this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000120',
                    '',
                  )
                : this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000122',
                    '',
                  );
            return `${labelCase}: ${this.formatMoney(
              data.datasets[0].data[tooltipItem.index],
            )}`;
          },
        },
      },
    };
    this.setState({ dataArr: bar, optionsArr: options });
  };

  /* resetLayout() {
    this.setState({ layouts: JSON.parse(JSON.stringify(defaultLayouts)) });
  } */

  render() {
    const dateFormatDatePicker = 'DD/MM/YYYY';
    const {
      dataBalance,
      dataDeals,
      dataArr,
      optionsArr,
      startDate,
      endDate,
      displayMovil,
    } = this.state;
    const {
      lastStartSession,
      account,
      accountType,
      accountStatus,
      dataProfile,
    } = this.props;

    return (
      <div style={{ marginBottom: '30px' }}>
        <CustomRow>
          <CustomCol xs="12">
            <h1>
              {this.messagesFunctions.getMessageFromListMessagesCode(
                'FRL0000000000093',
                '',
              )}{' '}
              {dataProfile.profileName}
            </h1>
          </CustomCol>
        </CustomRow>

        {/* <CustomRow className="blank-space">
          <CustomCol xs="12" sm="12" md="12">
            <CustomCardBody className="header-font">
              <ReactTable
                data={data}
                columns={columns}
                pageSize={1}
                showPagination={false}
              />
            </CustomCardBody>
          </CustomCol>
        </CustomRow> */}

        <CustomRow className="margin-row">
          <CustomCol xs="12" sm="1" md="1" />
          <CustomCol xs="12" sm="10" md="10">
            <CustomCardHeader className="flex-container wrap text-center border-radius">
              <div className="margin-rl">
                <h5>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000095',
                    '',
                  )}
                </h5>
                <p>{isNil(account) || isEmpty(account) ? '' : account}</p>
              </div>
              <div className="margin-rl">
                <h5>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000096',
                    '',
                  )}
                </h5>
                <p>
                  {isNil(accountType) || isEmpty(accountType)
                    ? ''
                    : accountType}
                </p>
              </div>
              <div className="margin-rl">
                <h5>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000097',
                    '',
                  )}
                </h5>
                <p>
                  <small>
                    <Badge color="warning">
                      {isNil(accountStatus) || isEmpty(accountStatus)
                        ? ''
                        : this.messagesFunctions.getMessageFromListMessagesCode(
                            accountStatus,
                            '',
                          )}
                    </Badge>
                  </small>
                </p>
              </div>
              {/* <div className="margin-rl">
                <h5>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000098',
                    '',
                  )}
                </h5>
                <p>
                  <small> </small>
                </p>
                  </div> */}
              <div className="margin-rl">
                <h5>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000099',
                    '',
                  )}
                </h5>
                <p>
                  <small>
                    {isNil(lastStartSession) || isEmpty(lastStartSession)
                      ? ''
                      : moment(lastStartSession).format(dateFormat)}
                    {' hrs'}
                  </small>
                </p>
              </div>
              <div className="margin-rl">
                <h5>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000105',
                    '',
                  )}
                </h5>
                <p>
                  <small>{this.formatMoney(dataBalance.balance)}</small>
                </p>
              </div>
            </CustomCardHeader>
          </CustomCol>
        </CustomRow>

        <CustomRow>
          <CustomCol xs="12">
            <div className="animated fadeIn">
              <CustomCard key="a" className="card-accent-secondary">
                <CustomCardHeader>
                  <h5 className="m-0 p-0">
                    <i className="fa fa-list-alt mt-0 mr-1 yellow " />
                    &nbsp;
                    {this.messagesFunctions.getMessageFromListMessagesCode(
                      'FRL0000000000100',
                      '',
                    )}
                  </h5>
                </CustomCardHeader>
                <CustomCardBody className="card-chart-height timeline-data-left">
                  <CustomRow>
                    {displayMovil && (
                      <CustomCol xs="12">
                        <FormGroup row className="datepicker-movil">
                          <CustomCol md="3" className="label-filter">
                            <Label htmlFor="date-input">
                              {this.messagesFunctions.getMessageFromListMessagesCode(
                                'FRL0000000000108',
                                '',
                              )}
                              :
                            </Label>
                          </CustomCol>
                          <CustomCol xs="12" md="9">
                            <DatePicker
                              format={dateFormatDatePicker}
                              locale={'esES'}
                              placeholder="dd/mm/aaaa"
                              datePickerClassName="input_date inputBordered"
                              className="input-align inputBordered"
                              value={startDate}
                              onChange={(value) => {
                                this.handleStartDate(value);
                              }}
                            />
                          </CustomCol>
                        </FormGroup>
                        <FormGroup row className="datepicker-movil">
                          <CustomCol md="3" className="label-filter">
                            <Label htmlFor="date-input">
                              {this.messagesFunctions.getMessageFromListMessagesCode(
                                'FRL0000000000109',
                                '',
                              )}
                              :
                            </Label>
                          </CustomCol>
                          <CustomCol xs="12" md="9">
                            <DatePicker
                              format={dateFormatDatePicker}
                              locale={'esES'}
                              placeholder="dd/mm/aaaa"
                              datePickerClassName="input_date inputBordered"
                              className="input-align inputBordered"
                              value={endDate}
                              onChange={(value) => {
                                this.handleEndDate(value);
                              }}
                            />
                          </CustomCol>
                        </FormGroup>
                        <div className="text-right">
                          <CustomButton
                            label={this.messagesFunctions.getMessageFromListMessagesCode(
                              'FRL0000000000106',
                              '',
                            )}
                            //classIcon="fa fa-lock mr-1"
                            isVisible
                            type="submit"
                            size="md"
                            color="warning"
                            className="btn buttonControlCheck"
                            onClick={() => {
                              this.searchDeals();
                            }}
                          />
                          <div
                            style={{
                              marginLeft: '10px',
                              display: 'inline-block',
                            }}
                          >
                            <CustomButton
                              label={this.messagesFunctions.getMessageFromListMessagesCode(
                                'FRL0000000000107',
                                '',
                              )}
                              //classIcon="fa fa-lock mr-1"
                              isVisible
                              type="submit"
                              size="md"
                              color="warning"
                              className="btn buttonControlCheck clean-btn"
                              onClick={() => {
                                this.cleanSearch();
                              }}
                            />
                          </div>
                        </div>
                      </CustomCol>
                    )}
                    <CustomCol xs="12" md="8" className="m-b-15">
                      <Bar data={dataArr} options={optionsArr} />
                    </CustomCol>
                    <CustomCol xs="12" md="4" className="">
                      <CustomRow>
                        {displayMovil === false && (
                          <CustomCol xs="12">
                            <FormGroup row className="datepicker-movil">
                              <CustomCol md="3" className="label-filter">
                                <Label htmlFor="date-input">
                                  {this.messagesFunctions.getMessageFromListMessagesCode(
                                    'FRL0000000000108',
                                    '',
                                  )}
                                  :
                                </Label>
                              </CustomCol>
                              <CustomCol xs="12" md="9">
                                <DatePicker
                                  format={dateFormatDatePicker}
                                  locale={'esES'}
                                  placeholder="dd/mm/aaaa"
                                  datePickerClassName="input_date inputBordered"
                                  className="input-align inputBordered"
                                  value={startDate}
                                  onChange={(value) => {
                                    this.handleStartDate(value);
                                  }}
                                />
                              </CustomCol>
                            </FormGroup>
                            <FormGroup row className="datepicker-movil">
                              <CustomCol md="3" className="label-filter">
                                <Label htmlFor="date-input">
                                  {this.messagesFunctions.getMessageFromListMessagesCode(
                                    'FRL0000000000109',
                                    '',
                                  )}
                                  :
                                </Label>
                              </CustomCol>
                              <CustomCol xs="12" md="9">
                                <DatePicker
                                  format={dateFormatDatePicker}
                                  locale={'esES'}
                                  placeholder="dd/mm/aaaa"
                                  datePickerClassName="input_date inputBordered"
                                  className="input-align inputBordered"
                                  value={endDate}
                                  onChange={(value) => {
                                    this.handleEndDate(value);
                                  }}
                                />
                              </CustomCol>
                            </FormGroup>
                            <div className="text-right">
                              <CustomButton
                                label={this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000106',
                                  '',
                                )}
                                //classIcon="fa fa-lock mr-1"
                                isVisible
                                type="submit"
                                size="md"
                                color="warning"
                                className="btn buttonControlCheck"
                                onClick={() => {
                                  this.searchDeals();
                                }}
                              />
                              <div
                                style={{
                                  marginLeft: '10px',
                                  display: 'inline-block',
                                }}
                              >
                                <CustomButton
                                  label={this.messagesFunctions.getMessageFromListMessagesCode(
                                    'FRL0000000000107',
                                    '',
                                  )}
                                  //classIcon="fa fa-lock mr-1"
                                  isVisible
                                  type="submit"
                                  size="md"
                                  color="warning"
                                  className="btn buttonControlCheck clean-btn"
                                  onClick={() => {
                                    this.cleanSearch();
                                  }}
                                />
                              </div>
                            </div>
                          </CustomCol>
                        )}
                        <CustomCol xs="12">
                          <p
                            style={{
                              fontWeight: 'bold',
                              fontSize: '16px',
                              margin: '15px 0 10px',
                            }}
                          >
                            {this.messagesFunctions.getMessageFromListMessagesCode(
                              'FRL0000000000110',
                              '',
                            )}
                            :
                          </p>
                          <div className="container-timeline-dashboard">
                            {Array.isArray(dataDeals) &&
                            isEmpty(dataDeals) === false ? (
                              <Timeline>
                                {dataDeals.map((item) => {
                                  return (
                                    <Timeline.Item
                                      color={this.colorAction(item.profit)}
                                      key={item.deal}
                                    >
                                      <div className="container-data">
                                        {item.actionDescription} {item.comment}
                                        <br />
                                        {this.messagesFunctions.getMessageFromListMessagesCode(
                                          'FRL0000000000111',
                                          '',
                                        )}
                                        {': '}
                                        {item.profitFormat} <br />
                                        <div className="data-left">
                                          {item.timeFormat}
                                          <br />
                                          {item.hrsFormat}
                                          {' hrs'}
                                        </div>
                                      </div>
                                    </Timeline.Item>
                                  );
                                })}
                              </Timeline>
                            ) : (
                              <div className="text-center">
                                {this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000112',
                                  '',
                                )}
                              </div>
                            )}
                          </div>
                        </CustomCol>
                      </CustomRow>
                    </CustomCol>
                  </CustomRow>
                </CustomCardBody>
              </CustomCard>
            </div>
          </CustomCol>
        </CustomRow>

        {/* Modales ver detalle Depósitos */}
        <Modal
          isOpen={this.state.warning2}
          toggle={this.toggleWarning2}
          className={'modal-warning modal-lg ' + this.props.className}
        >
          <ModalHeader toggle={this.toggleWarning2}>
            <i className="fa fa-file-text-o ml-1" /> Depósito a cuenta
          </ModalHeader>
          <ModalBody>
            <CustomCard>
              <CustomCardHeader>
                {/* botones save + print
                <CustomButton label="Imprimir" classIcon="fa fa-print mr-1" isVisible type="submit" size="sm" color="warning" className="btn btn-sm btn-warning mr-1 float-right" />
                <CustomButton label="Guardar" classIcon="fa fa-save mr-1" isVisible type="submit" size="sm" color="outline-dark" className="btn btn-sm btn-outline-warning mr-1 float-right" /> */}
              </CustomCardHeader>
              <CustomCardBody>
                <div className="email-app">
                  <main>
                    <p className="text-center">New Message</p>
                    <Form>
                      <FormGroup row className="mb-3">
                        <Label for="bcc" xs={3} sm={2}>
                          Asunto:
                        </Label>
                        <Col xs={9} sm={10}>
                          <Input
                            type="email"
                            id="bcc"
                            placeholder="Type email"
                            autoComplete="email"
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                    <Row>
                      <Col sm={12} className="ml-auto">
                        <FormGroup className="mt-4">
                          <Input
                            type="textarea"
                            id="message"
                            name="body"
                            rows="12"
                            placeholder="Click here to reply"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Button
                            type="submit"
                            color="success"
                            className={'mr-1'}
                          >
                            Enviar
                          </Button>
                          <Button
                            type="submit"
                            color="danger"
                            className={'mr-1'}
                          >
                            Descartar{' '}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </main>
                </div>
              </CustomCardBody>
            </CustomCard>
          </ModalBody>
        </Modal>

        {/* <CustomButton
          onClick={this.toggleWarning2}
          label={this.messagesFunctions.getMessageFromListMessagesCode(
            'FRL0000000000103',
            '',
          )}
          classIcon="fa fa-question-circle-o mr-1"
          isVisible
          type="submit"
          size="md"
          color="warning"
          className="btn"
          /> */}
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
  getDataUser: (userId) => dispatch(actionsAlpha.getDataUser(userId)),
  postGetUserDeals: (data) => dispatch(actionsAlpha.postGetUserDeals(data)),
  postGetDBdate: (data) => dispatch(postGetDBdate(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(dashboard);
