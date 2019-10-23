export default {
  items: [
    {
      name: 'BLACK BOX',
      url: '/dashboard',
      icon: 'cui-layers',
      class: 'nav-link-bb',
    },
    {
      title: true,
      name: 'HOME',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: 'tittleElement'             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Dashboard',
      url: '/base',
      icon: 'cui-dashboard',
      class: 'nav-link-bb',
    },
    {
      name: 'Home Cuentas',
      url: '/panel_cuentas',
      icon: 'cui-dashboard',
      class: 'nav-link-bb2',
    },
    {
      name: 'Home Empresas',
      url: '/panel_empresas',
      icon: 'cui-dashboard',
      class: 'nav-link-bb2',
    },
    {
      name: 'Reportes',
      url: '/charts',
      icon: 'cui-list',
      class: 'nav-link-bb',
    },
    {
      title: true,
      name: ' Operación',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: 'tittleElement'             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Depósitos',
      url: '/operacion/deposito',
      icon: 'cui-cloud-upload',
      class: 'nav-link-bb3',
    },
    {
      name: 'Depósitos Miranda',
      url: '/panel_miranda',
      icon: 'cui-cloud-upload',
      class: 'nav-link-bb3',
    },
    {
      name: 'Retiros Miranda',
      url: '/retiro_miranda',
      icon: 'cui-cloud-upload',
      class: 'nav-link-bb3',
    },
    {
      name: 'Depósitos MX',
      url: '/operacion/depositomx',
      icon: 'cui-cloud-upload',
      class: 'nav-link-bb3',
    },
    {
      name: 'Depósitos CO',
      url: '/operacion/depositoco',
      icon: 'cui-cloud-upload',
      class: 'nav-link-bb3',
    },
    {
      name: 'Retiros',
      url: '/operacion/retiro',
      icon: 'cui-cloud-download',
      class: 'nav-link-bb3',
    },
    {
      name: 'Retiros Efectivo',
      url: '/operacion/retirogen',
      icon: 'cui-cloud-download',
      class: 'nav-link-bb3',
    },
    {
      title: true,
      name: ' Administrativas',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: 'tittleElement'             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Depósitos',
      url: '/admin/deposito',
      icon: 'cui-cloud-upload',
      class: 'nav-link-bb3',
    },
    {
      name: 'Retiros',
      url: '/admin/retiro',
      icon: 'cui-cloud-download',
      class: 'nav-link-bb3',
    },
    {
      title: true,
      name: 'Cierres',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: 'tittleElement'             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Conciliación',
      url: '/panel_cierres',
      icon: 'cui-task',
      class: 'nav-link-bb',
    },
    {
      name: 'Reportes',
      url: '/forms',
      icon: 'cui-graph',
      class: 'nav-link-bb',
    },
    {
      title: true,
      name: 'Configuración',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: 'tittleElement'             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Empresas',
      url: '/tables',
      icon: 'cui-briefcase',
      class: 'nav-link-bb',
    },
     {
      name: 'Oficinas',
      url: '/operacion/inicio',
      icon: 'cui-puzzle',
      class: 'nav-link-bb',
    },
  ]
};
