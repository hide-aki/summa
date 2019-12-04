import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { notification } from 'antd';
import { ALERT_TYPE } from '@pleedtech/pt-components';

export default class ToasterMessages extends Component {
  openNotification = (
    description,
    messageType,
    redirect = false,
    path = '',
  ) => {
    console.log('description', description);
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

  render() {
    return (
      <Row>
        <Col>
          <button
            type="button"
            className="btnIcon"
            onClick={() => {
              this.openNotification('Success', 'bg-success');
            }}
          >
            Success
          </button>
        </Col>
        <Col>
          <button
            type="button"
            className="btnIcon"
            onClick={() => {
              this.openNotification('Warning', 'bg-warning');
            }}
          >
            Warning
          </button>
        </Col>
        <Col>
          <button
            type="button"
            className="btnIcon"
            onClick={() => {
              this.openNotification('Error', 'bg-danger');
            }}
          >
            Error
          </button>
        </Col>
        <Col>
          <button
            type="button"
            className="btnIcon"
            onClick={() => {
              this.openNotification('Info', 'bg-info');
            }}
          >
            Info
          </button>
        </Col>
      </Row>
    );
  }
}
