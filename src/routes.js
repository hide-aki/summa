import React from 'react';
const Auth = React.lazy(() => import('./containers/authUser'));
const Cuenta = React.lazy(() => import('./views/alpha/account/account'));
const Depositos = React.lazy(() =>
  import('./views/alpha/transactions/depositos'),
);
const Retiros = React.lazy(() => import('./views/alpha/retiros'));
const Estados = React.lazy(() => import('./views/alpha/estados'));
const Privacidad = React.lazy(() => import('./views/alpha/privacidad'));
const Condiciones = React.lazy(() => import('./views/alpha/condiciones'));
const Dashboard = React.lazy(() => import('./views/alpha/dashboard/dashboard'));
const FAQ = React.lazy(() => import('./views/alpha/FAQ/faq'));
// vistas summa
const Datos = React.lazy(() => import('./views/summa/datos'));
const Cuentas = React.lazy(() => import('./views/summa/cuentas'));
const Terminos = React.lazy(() => import('./views/summa/terminosycondiciones'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/logout', name: 'Logout', component: Auth },
  { path: '/cuenta', name: 'Cuenta', component: Cuenta },
  { path: '/depositos', name: 'Depósitos', component: Depositos },
  { path: '/retiros', name: 'Retiros', component: Retiros },
  { path: '/estados', name: 'Estado de cuenta', component: Estados },
  { path: '/privacidad', name: 'Privacidad', component: Privacidad },
  { path: '/condiciones', name: 'Condiciones', component: Condiciones },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/faq', name: 'FAQ', component: FAQ },
  //vistas summa
  { path: '/datos', name: 'Datos', component: Datos },
  { path: '/cuentas', name: 'Cuentas', component: Cuentas },
  {path: '/terminosycondiciones', name:'Terminos y Condiciones', component: Terminos },
];

export default routes;
