// https://github.com/alom2/react-input-currency
// Modification(15/07/2019):  add placeholder and maxlength
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
};

var createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var inherits = function(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass,
    );
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
};

var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }

  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
};

var ReactInputCurrency = (function(_Component) {
  inherits(ReactInputCurrency, _Component);

  function ReactInputCurrency() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ReactInputCurrency);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret =
        ((_temp =
          ((_this = possibleConstructorReturn(
            this,
            (_ref =
              ReactInputCurrency.__proto__ ||
              Object.getPrototypeOf(ReactInputCurrency)).call.apply(
              _ref,
              [this].concat(args),
            ),
          )),
          _this)),
        (_this.unmaskNumber = function(value) {
          var replacedValue = value.replace(/[^\d]/g, '');
          var numbers = replacedValue.split('');
          while (numbers[0] === '0') {
            numbers.shift();
          }
          return numbers.join('');
        }),
        (_this.maskNumber = function(value) {
          var _this2 = _this,
            props = _this2.props;
          var decimal = props.decimal || '.';
          var prefix = isNil(props.prefix) ? '$ ' : props.prefix;
          var thousands = props.thousands || ',';

          if (!value) return '';

          var finalValue = _this.unmaskNumber(value);
          if (finalValue.length < 3) {
            if (finalValue.length === 1)
              finalValue = '0' + decimal + '0' + finalValue;
            if (finalValue.length === 2)
              finalValue = '0' + decimal + finalValue;
            return prefix + finalValue;
          }

          // add decimal
          finalValue = finalValue.split('').reverse();
          finalValue.splice(2, 0, decimal);
          finalValue = finalValue.join('');

          // add thousands indicators
          while (finalValue.search(/[\d]{4}/) !== -1) {
            var index = finalValue.search(/[\d]{4}/);
            finalValue = finalValue.split('');
            finalValue.splice(index + 3, 0, thousands);
            finalValue = finalValue.join('');
          }

          return (
            prefix +
            finalValue
              .split('')
              .reverse()
              .join('')
          );
        }),
        (_this.handleOnChange = function(event) {
          event.preventDefault();
          var value = _this.unmaskNumber(event.target.value);
          if (typeof _this.props.onChange === 'function') {
            _this.props.onChange({
              name: _this.props.name,
              value: _this.maskNumber(value),
            });
          }
        }),
        _temp)),
      possibleConstructorReturn(_this, _ret)
    );
  }

  createClass(ReactInputCurrency, [
    {
      key: 'render',
      value: function render() {
        var _props = this.props,
          required = _props.required,
          className = _props.className,
          name = _props.name,
          id = _props.id,
          value = _props.value,
          placeholder = _props.placeholder,
          maxlength = _props.maxlength;

        return React__default.createElement('input', {
          className: className || '',
          required: required,
          value: this.maskNumber(value),
          name: name,
          id: id,
          onChange: this.handleOnChange,
          placeholder: placeholder || '',
          maxlength: maxlength || '',
        });
      },
    },
  ]);
  return ReactInputCurrency;
})(React.Component);

ReactInputCurrency.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default ReactInputCurrency;
