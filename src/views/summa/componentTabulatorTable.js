import { createElement } from 'react';
import 'react-tabulator/lib/css/tabulator.min.css';
import { React15Tabulator } from 'react-tabulator';
import moment from 'moment';

const div = createElement;

const CustomTabulatorTable = (props) => {
  let component = div('div');
  const { columns, data, options, isVisible, id, className } = props;

  if (isVisible === true) {
    component = div(
      'div',
      { class: className, id },
      div(React15Tabulator, { columns, data, options: { ...options } }),
    );
  }
  return component;
};


export default CustomTabulatorTable;
