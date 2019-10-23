import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isBoolean from 'lodash/isBoolean';
import isNil from 'lodash/isNil';

class CustomAppSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked:
        isBoolean(props.checked) && isNil(props.checked) === false
          ? props.checked
          : false,
    };
  }

  setRef = (element) => {
    if (isNil(element) === false) {
      this.input = element;
      this.input.checked = this.state.checked;
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { checked } = this.props;
    if (nextProps.checked !== checked && isNil(this.input) === false) {
      this.input.checked = nextProps.checked;
      this.setState({
        checked: nextProps.checked,
      });
    }

    return true;
  }

  handleOnCheck = async (event, callBack) => {
    if (isNil(this.input) === false) {
      await this.setState({
        checked: !this.state.checked,
      });
      this.input.checked = this.state.checked;
      return callBack(event, this.state.checked);
    }
  };

  render() {
    let component = <div />;
    const {
      toBlock,
      classNameLabel,
      classNameInput,
      classNameSpan,
      dataChecked,
      dataUnchecked,
      onChange,
      onClick,
      isVisible,
    } = this.props;
    if (isVisible === true) {
      component = (
        <div>
          <label className={classNameLabel}>
            <input
              disabled={toBlock}
              ref={this.setRef}
              type="checkbox"
              className={classNameInput}
              onChange={(event) => {
                this.handleOnCheck(event, onChange);
              }}
              onClick={(event) => {
                this.handleOnCheck(event, onClick);
              }}
            />
            <span
              className={classNameSpan}
              data-checked={dataChecked}
              data-unchecked={dataUnchecked}
            />
          </label>
        </div>
      );
    }
    return component;
  }
}

CustomAppSwitch.propTypes = {
  toBlock: PropTypes.bool,
  classNameLabel: PropTypes.string,
  classNameInput: PropTypes.string,
  classNameSpan: PropTypes.string,
  dataChecked: PropTypes.string,
  dataUnchecked: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  isVisible: PropTypes.bool,
};

CustomAppSwitch.defaultProps = {
  dataChecked: '\u2713',
  dataUnchecked: '\u2715',
  classNameSpan: 'switch-slider',
  classNameInput: 'switch-input',
  classNameLabel: 'switch switch-pill switch-label switch-success',
};

export { CustomAppSwitch };
