/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Badge, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
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
import { selectMessages } from '../../../../containers/languageProvider/selectors';
import alphaDepositActions from '../../../../utils/actions/alphaDepositActions';
import { showToastrMessage } from '../../../../utils/actions/toastrActions';
import { selectFrontParameters } from '../../../../utils/selectors/frontParametersSelectors';
import { FRONT_PARAMETERS_CONSTANTS } from '../../../../utils/constants/frontParametersConstants';

class TableDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTransactionInfo: false,
      warning: false,
      accordion: [true, false, false],
      activeTab: 1,
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
          : '-6'
        : '-6',
    );
  }

  componentWillMount() {
    this.postGetTransactionCoincidences();
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
    const {
      transactionData,
      transactionInfo,
      openTransactionInfo,
    } = this.state;

    const columns = [
      {
        Header: 'No.',
        accessor: 'no',
        Cell: (row) => {
          const { original } = row;
          return original.transactionNumber;
        },
      },
      {
        Header: 'Fecha de depósito',
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
        Header: 'Monto',
        accessor: 'monto',
        Cell: (row) => {
          const { original } = row;
          return original.amount;
        },
      },
      {
        Header: 'Método',
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
        Header: 'Estado',
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
      {
        Header: 'Detalle',
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
              className={style.className}
            >
              <span className="vermas">
                {' '}
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  style.labelCode,
                  style.labelCode,
                )}
              </span>{' '}
            </i>
          );
        },
      },
    ];

    return (
      <div>
        <CustomRow>
          <CustomCol xs="12">
            <h1>Detalle depósitos</h1>
            <p>Visualice el estatus de los depósitos a su cuenta.</p>

            <CustomCard>
              <CustomCardHeader>
                <i className="fa fa-credit-card yellow"></i> Mis movimientos
              </CustomCardHeader>
              <CustomCardBody>
                <ReactTable
                  data={transactionData}
                  columns={columns}
                  pageSize={5}
                  showPageSizeOptions={false}
                  nextText={'Siguiente'}
                  previousText={'Anterior'}
                  pageText={'Página'}
                  ofText={'de'}
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
          className={'modal-warning modal-lg ' + this.props.className}
        >
          <ModalHeader
            toggle={() => {
              this.setState({
                openTransactionInfo: false,
                transactionInfo: {},
              });
            }}
          >
            <i className="fa fa-file-text-o ml-1"></i> Depósito a cuenta Your
            pay choice
          </ModalHeader>
          <ModalBody>
            <CustomCard>
              <CustomCardBody>
                <CustomRow className="mb-4">
                  Folio:&nbsp;{' '}
                  <strong>{transactionInfo.transactionNumber}</strong>
                </CustomRow>
                <CustomRow className="mb-4">
                  Fecha de depósito:&nbsp;
                  <strong>
                    {this.dateFunctions.dateFormat(
                      this.dateFunctions.globalDateToLocalDate(
                        transactionInfo.transactionDate,
                      ),
                      this.dateFunctions._dateFormat_2,
                    )}
                  </strong>
                </CustomRow>
                <CustomRow className="mb-4">
                  Monto:&nbsp; <strong>{transactionInfo.amount}</strong>
                </CustomRow>
                <CustomRow className="mb-4">
                  Método:&nbsp;
                  <strong>
                    {this.messagesFunctions.getMessageFromListMessagesCode(
                      transactionInfo.paymentType,
                      transactionInfo.paymentType,
                    )}
                  </strong>
                </CustomRow>
                <CustomRow className="mb-4">
                  Estado: &nbsp;
                  <strong>
                    {this.messagesFunctions.getMessageFromListMessagesCode(
                      transactionInfo.transactionStatus,
                      transactionInfo.transactionStatus,
                    )}
                  </strong>
                </CustomRow>
              </CustomCardBody>
            </CustomCard>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectMessages: selectMessages(),
  selectFrontParameters: selectFrontParameters(),
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
)(TableDetails);
