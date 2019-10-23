const MODULE = 'crm';

const ROUTES_MODULE = {
  ROOT: {
    PATH: '/' + MODULE,
    NAME: MODULE,
    ROUTE: 'containers/' + MODULE,
    COMPLETE_PATH: '/' + MODULE,
  }, //ROOT
  LOGIN: {
    PATH: 'login',
    NAME: 'login',
    ROUTE: 'containers/login',
    COMPLETE_PATH: '/crm/login',
  }, //LOGIN
  LOGOUT: {
    AUT_USER: '/crm/modules/authUser',
    LOG_OUT: '/logout',
  }, //LOGOUT
}; //ROUTES_MODULE

export { ROUTES_MODULE, MODULE };
