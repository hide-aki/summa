export const GENERICS_MESSAGES_REQUESTER = {
  MESSAGES_CODES: {
    UIREQ00000000000: {
      CODE: 'UIREQ00000000000',
      DEFAULT:
        'Session expired. Please try again or check with the administrator.',
    }, // 'ECONNABORTED'
    UIREQ00000000001: {
      CODE: 'UIREQ00000000001',
      DEFAULT:
        'Unexpected Error. Please try again or contact the administrator.',
    }, // status400BadRequest
    UIREQ00000000002: {
      CODE: 'UIREQ00000000002',
      DEFAULT:
        'Log in failed. Please try again or check with the administrator.',
    }, // status401Unauthorized
    UIREQ00000000003: {
      CODE: 'UIREQ00000000003',
      DEFAULT:
        'Permission denied. Please try again or contact the administrator.',
    }, // status403Forbidden
    UIREQ00000000004: {
      CODE: 'UIREQ00000000004',
      DEFAULT:
        'Service is not available. Please try again or contact the administrator.',
    }, // status404NotFound
    UIREQ00000000005: {
      CODE: 'UIREQ00000000005',
      DEFAULT:
        'Unexpected Error. Please try again or contact the administrator.',
    }, // status500InternalServerError
    UIREQ00000000006: {
      CODE: 'UIREQ00000000006',
      DEFAULT:
        'Unexpected Error. Please try again or contact the administrator.',
    }, // other status
  },
};

export const ERROR_NETWORK_CONNECTION_MESSAGE_CODE = 'UISGEN0000000031';
