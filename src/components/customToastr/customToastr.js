import React, { Component } from 'react';
import { CustomCard, CustomCardBody } from '@pleedtech/pt-components';
import { Fade, Collapse } from 'reactstrap';
import { ALERT_TYPE } from './constants';

class CustomToastr extends Component {
  constructor(props) {
    super(props);
    const { triggerAlert, message, alertType } = props;
    this.state = {
      triggerAlert,
      message,
      alertType,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { triggerAlert, message, alertType } = nextProps;
    const { showToaster } = this.props;

    if (
      nextProps.triggerAlert !== this.state.triggerAlert ||
      nextProps.message !== this.state.message
    ) {
      this.setState(() => ({
        triggerAlert,
        message,
        alertType,
      }));

      setTimeout(() => {
        this.setState(
          () => ({
            triggerAlert: false,
            message: '',
            alertType: ALERT_TYPE.INFO,
          }),
          () => {
            return showToaster(false);
          },
        );
      }, 3000);
    }
    return true;
  }

  toggleFade = () => {
    const { showToaster } = this.props;
    this.setState(
      (state) => ({
        triggerAlert: false,
        message: '',
        alertType: ALERT_TYPE.INFO,
      }),
      () => {
        return showToaster(false);
      },
    );
  };

  render() {
    const { triggerAlert, message, alertType } = this.state;

    return (
      <div className="animated fadeIn">
        <Fade timeout={1000} in={triggerAlert} className="messageControl_bb">
          <CustomCard className={`text-white ${alertType} boxShadow_bb`}>
            <div className="card-header-actions">
              <a
                className="card-header-action btn btn-close"
                onClick={() => {
                  this.toggleFade();
                }}
              >
                <i className="icon-close" />
              </a>
            </div>
            <Collapse isOpen={triggerAlert}>
              <CustomCardBody>{message}</CustomCardBody>
            </Collapse>
          </CustomCard>
        </Fade>
      </div>
    );
  }
}

export { CustomToastr, ALERT_TYPE };
