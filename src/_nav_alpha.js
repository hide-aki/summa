export default [
  {
    title: true,
    name: '',
    wrapper: {
      // optional wrapper object
      element: '', // required valid HTML5 element tag
      attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    },
    class: '', // optional class names space delimited list for title item ex: "text-center"
  },
  {
    name: 'CUENTA',
    url: '/datos',
    icon: 'fa fa-user',
    class: 'nav-link-bb',
    children:[
      {
        name: 'Validación de correo',
        url: '/',
        icon: 'fa fa-info-circle',
        class: 'nav-link-bb subMenu',
        isEnabled: true,
      },
    ]
  },
  // Submenu de "CUENTA"
  {
    name: 'Datos Generales',
    url: '/datos',
    icon: 'fa fa-adjust',
    class: 'nav-link-bb subMenu',
    isEnabled: true,
  },
  {
    name: 'Terminos y condiciones',
    url: '/terminosycondiciones',
    icon: 'fa fa-check-square',
    class: 'nav-link-bb subMenu',
    isEnabled: true,
  },
  // {
  //   name: 'Documentación',
  //   url: '/',
  //   icon: 'fa fa-file',
  //   class: 'nav-link-bb subMenu',
  //   isEnabled: true,
  // },
  // Termina submenu de "CUENTA"
  {
    name: 'OPERACIONES',
    url: '/cuentas',
    icon: 'fa fa-money',
    class: 'nav-link-bb',
    icon: 'fa fa-money',
    isEnabled: true,
  },
  {
    name: 'BALANCE',
    url: '/balance',
    icon: 'fa fa-line-chart',
    class: 'nav-link-bb',
    isEnabled: true,
  },
  {
    name: 'SALIR',
    url: '/logout',
    icon: 'fa fa-sign-out',
    class: 'nav-link-bb navExit',
    isEnabled: true,
  },
];
