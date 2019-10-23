import ENVIRONMENTS from './environments';

let GENERAL_PORT = {
  YPC: 31012,
  ORION: 3,
};
let environment = 'ypc-test';

const getPort = () => {
  let env = 'ypc-test';
  if (window.location.port === '21011') {
    GENERAL_PORT = {
      YPC: 21012,
      ORION: 5,
    };
    environment = 'ypc-prod';
    env = environment;
  }

  return env;
};

function getInstance(instance) {
  let ENVIRONMENT_CONSTANTS = {
    IP_DOMAIN: {
      ORION: 'client.ypc.biz',
    },
    PORT: GENERAL_PORT,
    KAFKA_NUMBER: '00',
    PROTOCOL: {
      ORION: 'https',
      YPC: 'https',
    },
    KAFKA_PROTOCOL: 'ws',
    SOFT_PHONE_TOPIC: 'softphone',
    NAME: ENVIRONMENTS.TEST_YPC,
    LOGS: true,
  };

  switch (instance) {
    case 'ypc-prod':
      ENVIRONMENT_CONSTANTS = {
        IP_DOMAIN: {
          ORION: 'client.ypc.biz',
        },
        PORT: GENERAL_PORT,
        KAFKA_NUMBER: '00',
        PROTOCOL: {
          ORION: 'https',
          YPC: 'https',
        },
        KAFKA_PROTOCOL: 'ws',
        SOFT_PHONE_TOPIC: 'softphone',
        NAME: ENVIRONMENTS.PROD_YPC,
        LOGS: true,
      };
      break;
    case 'ypc-test':
      ENVIRONMENT_CONSTANTS = {
        IP_DOMAIN: {
          ORION: 'client.ypc.biz',
        },
        PORT: GENERAL_PORT,
        KAFKA_NUMBER: '00',
        PROTOCOL: {
          ORION: 'https',
          YPC: 'https',
        },
        KAFKA_PROTOCOL: 'ws',
        SOFT_PHONE_TOPIC: 'softphone',
        NAME: ENVIRONMENTS.TEST_YPC,
        LOGS: true,
      };
      break;
    default:
  }
  return ENVIRONMENT_CONSTANTS;
}

const instance = getPort(window.location.href);
const ENVIRONMENT_CONSTANTS = getInstance(instance);

export { ENVIRONMENT_CONSTANTS, instance };
