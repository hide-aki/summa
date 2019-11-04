import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { Badge, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {
  CustomCardBody,
  CustomCard,
  CustomCol,
  CustomRow,
  CustomCardHeader,
  ALERT_TYPE,
  HandlerErrorResponse,
  MessagesFunctions,
  DateFunctions,
} from '@pleedtech/pt-components';
import { makeSelectDataProfile } from 'utils/selectors/dataUserProfileSelectors';
import {
  selectMessages,
  selectIdLanguage,
} from '../../../containers/languageProvider/selectors';
import alphaDepositActions from '../../../utils/actions/alphaDepositActions';
import { showToastrMessage } from '../../../utils/actions/toastrActions';
import { selectFrontParameters } from '../../../utils/selectors/frontParametersSelectors';
import { FRONT_PARAMETERS_CONSTANTS } from '../../../utils/constants/frontParametersConstants';
import PaymentMethods from './components/paymentMethods';
import TableDetails from './components/tableDetails';
import CardsAccountDocuments from '../account/components/customDocumentsCards/cardsAccountDocuments';

class Depositos extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      warning: false,
      accordion: [true, false, false],
      collapse: true,
      activeTab: 1,
      amount: null,
      isOpenYPC: false,
      openTransactionInfo: false,
      transactionData: [],
      transactionInfo: {},
    };

    this.handlerErrorResponse = new HandlerErrorResponse();
    this.messagesFunctions = new MessagesFunctions(
      isNil(props.selectMessages) || isEmpty(props.selectMessages)
        ? {}
        : props.selectMessages,
    );

    this.dateFunctions = new DateFunctions(
      isNil(props.selectFrontParameters) === false
        ? isNil(
            props.selectFrontParameters[
              FRONT_PARAMETERS_CONSTANTS.PARAMETERS.LOCAL_OFFSET
            ],
          ) === false
          ? props.selectFrontParameters[
              FRONT_PARAMETERS_CONSTANTS.PARAMETERS.LOCAL_OFFSET
            ].paramValue
          : '-5'
        : '-5',
    );
  }

  componentWillMount() {
    const { dataProfile, history } = this.props;
    if (dataProfile.acceptedTerms === true) {
      this.postGetTransactionCoincidences();
    } else {
      history.push('/condiciones');
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { idLanguage } = this.props;
    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(nextProps.selectMessages);
    }
    return true;
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  togglelist(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  showToastrMessage = (error, alertType = ALERT_TYPE.ERROR) => {
    const { showToasterMessage } = this.props;
    const messageCode = this.handlerErrorResponse.getMessageErrorResponse(
      error,
    );

    if (isEmpty(messageCode) === false) {
      showToasterMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        alertType,
      );
    }
  };

  toggleWarning = () => {
    this.setState({
      warning: !this.state.warning,
    });
  };

  toggleWarning2 = () => {
    this.setState({
      openTransactionInfo: !this.state.openTransactionInfo,
    });
  };

  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  };

  postGetTransactionById = async (data) => {
    try {
      const { postGetTransactionById } = this.props;
      const response = await postGetTransactionById(data);
      return response.result;
    } catch (error) {
      this.showToastrMessage(error);
    }
  };

  postGetTransactionCoincidences = async () => {
    try {
      const { postGetTransactionCoincidences } = this.props;
      const response = await postGetTransactionCoincidences({
        idTransactionCategory: 1,
        idTransactionType: 1,
        jsonConditions: [],
      });

      if (isNil(response.result) === false) {
        this.setState({
          transactionData: response.result,
        });
      }
    } catch (error) {
      this.showToastrMessage(error);
    }
  };

  setCommercialInvoice = async (idTransaction) => {
    try {
      this.postGetTransactionById({
        idTransaction,
      }).then((transactionInfo) => {
        this.setState({
          openTransactionInfo: true,
          transactionInfo,
        });
      });
    } catch (error) {
      this.showToastrMessage(error);
    }
  };

  render() {
    const { amount, isOpenYPC } = this.state;
    const {
      transactionData,
      transactionInfo,
      openTransactionInfo,
    } = this.state;

    const columns = [
      {
        Header: this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000071',
          '',
        ),
        accessor: 'detalle',
        Cell: (row) => {
          const { original } = row;
          const style =
            isNil(original.styleDetail) || isEmpty(original.styleDetail)
              ? { className: 'fa fa-eye ml-1', labelCode: 'AFL0000000000001' }
              : JSON.parse(original.styleDetail);

          return (
            <i
              onClick={() => {
                this.setCommercialInvoice(original.idTransaction);
              }}
              style={{ cursor: 'pointer' }}
              className={style.className}
            ></i>
          );
        },
        width: 100,
      },
      {
        Header: this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000072',
          '',
        ),
        accessor: 'no',
        Cell: (row) => {
          const { original } = row;
          return original.transactionNumber;
        },
      },
      {
        Header: this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000073',
          '',
        ),
        accessor: 'aplicacion',
        Cell: (row) => {
          const { original } = row;
          return this.dateFunctions.dateFormat(
            this.dateFunctions.globalDateToLocalDate(original.transactionDate),
            this.dateFunctions._dateFormat_2,
          );
        },
      },
      {
        Header: this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000074',
          '',
        ),
        accessor: 'monto',
        Cell: (row) => {
          const { original } = row;
          return (
            <div style={{ paddingRight: '15%', textAlign: 'right' }}>
              {original.amount}
            </div>
          );
        },
      },
      {
        Header: this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000075',
          '',
        ),
        accessor: 'metodo',
        Cell: (row) => {
          const { original } = row;
          return this.messagesFunctions.getMessageFromListMessagesCode(
            original.paymentType,
            original.paymentType,
          );
        },
      },
      {
        Header: this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000076',
          '',
        ),
        accessor: 'estado',
        Cell: (row) => {
          const { original } = row;
          const style =
            isNil(original.styleTransactionStatus) ||
            isEmpty(original.styleTransactionStatus)
              ? { className: 'success' }
              : JSON.parse(original.styleTransactionStatus);
          return (
            <Badge color={style.className}>
              {this.messagesFunctions.getMessageFromListMessagesCode(
                original.transactionStatus,
                original.transactionStatus,
              )}
            </Badge>
          );
        },
      },
    ];

    return (
      <div className="animated fadeIn">
        <PaymentMethods
          onSearch={() => {
            this.postGetTransactionCoincidences();
          }}
        />

        <CustomRow>
          <CustomCol xs="12">
            <h1 className="title-h1">
              {this.messagesFunctions.getMessageFromListMessagesCode(
                'FRL0000000000068',
                '',
              )}
            </h1>
            <p>
              {this.messagesFunctions.getMessageFromListMessagesCode(
                'FRL0000000000069',
                '',
              )}
            </p>

            <CustomCard>
              <CustomCardHeader>
                <i className="fa fa-credit-card yellow"></i>{' '}
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  'FRL0000000000070',
                  '',
                )}
              </CustomCardHeader>
              <CustomCardBody>
                <ReactTable
                  data={transactionData}
                  columns={columns}
                  pageSize={5}
                  showPageSizeOptions={false}
                  nextText={<i className="fa fa fa-arrow-right"></i>}
                  previousText={<i className="fa fa fa-arrow-left"></i>}
                  pageText={this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000077',
                    '',
                  )}
                  ofText={this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000078',
                    '',
                  )}
                  noDataText={'No hay datos para visualizar'}
                />
              </CustomCardBody>
            </CustomCard>
          </CustomCol>
        </CustomRow>
        {/* Modales ver detalle Depósitos */}
        <Modal
          isOpen={openTransactionInfo}
          toggle={() => {
            this.setState({
              openTransactionInfo: false,
              transactionInfo: {},
            });
          }}
          className={'modal-cabinet modal-lg ' + this.props.className}
        >
          <ModalHeader
            className="modal-header"
            toggle={() => {
              this.setState({
                openTransactionInfo: false,
                transactionInfo: {},
              });
            }}
          >
            <i className="fa fa-file-text-o ml-1"></i>{' '}
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000079',
              '',
            )}
          </ModalHeader>
          <ModalBody>
            {isNil(transactionInfo) === false ? (
              // <CustomCard>
              <CustomCardBody>
                <CustomRow>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000080',
                    '',
                  )}
                  :&nbsp; <strong>{transactionInfo.transactionNumber}</strong>
                </CustomRow>
                <CustomRow>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000081',
                    '',
                  )}
                  :&nbsp;
                  <strong>
                    {this.dateFunctions.dateFormat(
                      this.dateFunctions.globalDateToLocalDate(
                        transactionInfo.transactionDate,
                      ),
                      this.dateFunctions._dateFormat_2,
                    )}
                  </strong>
                </CustomRow>
                <CustomRow>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000082',
                    '',
                  )}
                  :&nbsp; <strong>{transactionInfo.amount}</strong>
                </CustomRow>
                <CustomRow>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000083',
                    '',
                  )}
                  :&nbsp;
                  <strong>
                    {this.messagesFunctions.getMessageFromListMessagesCode(
                      transactionInfo.paymentType,
                      transactionInfo.paymentType,
                    )}
                  </strong>
                </CustomRow>
                <CustomRow>
                  {this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000084',
                    '',
                  )}
                  : &nbsp;
                  <strong>
                    {this.messagesFunctions.getMessageFromListMessagesCode(
                      transactionInfo.transactionStatus,
                      transactionInfo.transactionStatus,
                    )}
                  </strong>
                </CustomRow>
              </CustomCardBody>
            ) : // </CustomCard>
            null}

            <CardsAccountDocuments
              idTransactionCL={
                isEmpty(transactionInfo) ? '' : transactionInfo.idTransaction
              }
              idPaymentType={
                isEmpty(transactionInfo) ? '' : transactionInfo.idPaymentType
              }
              documentType={
                isEmpty(transactionInfo) ? '' : transactionInfo.documentType
              }
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectMessages: selectMessages(),
  selectFrontParameters: selectFrontParameters(),
  idLanguage: selectIdLanguage(),
  dataProfile: makeSelectDataProfile(),
});

const mapDispatchToProps = (dispatch) => ({
  postGetTransactionById: (message, messageType) =>
    dispatch(alphaDepositActions.postGetTransactionById(message, messageType)),
  postGetTransactionCoincidences: (data) =>
    dispatch(alphaDepositActions.postGetTransactionCoincidences(data)),
  showToasterMessage: (data) => dispatch(showToastrMessage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Depositos);
