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
    name: 'Cuenta',
    url: '/cuenta',
    icon: 'icon-user',
    class: 'nav-link-bb',
    isEnabled: true,
  },
  {
    name: 'Depósitos',
    url: '/depositos',
    icon: 'cui-credit-card',
    class: 'nav-link-bb',
    isEnabled: true,
  },
  {
    name: 'Cerrar sesión',
    url: '/logout',
    icon: 'icon-close',
    class: 'nav-link-bb',
    isEnabled: true,
  },
];
