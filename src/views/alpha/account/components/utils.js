import { ALERT_TYPE } from '@pleedtech/pt-components';
import { notification } from 'antd';

export const fn = () => {};

export const openNotification = (description, messageType) => {
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
