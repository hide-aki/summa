import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';

const propTypes = {
  id: PropTypes.string,
  right: PropTypes.bool,
  left: PropTypes.bool,
  data: PropTypes.array,
  disabled: PropTypes.bool,
  classInput: PropTypes.string,
  defaultValue: PropTypes.string,
  classButtonDropDown: PropTypes.string,
  classDropdownToggle: PropTypes.string,
  classIconDropdownToggle: PropTypes.string,
  classDropdownItem: PropTypes.string,
  classDropdownItemText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  onChange: PropTypes.func,
};

class CustomSelectLanguage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      value: '',
      inputText: '',
      InputIcon: '',
    };
  }

  componentDidMount() {
    if (
      isNil(this.props.defaultValue) === false &&
      isEmpty(this.props.defaultValue) === false &&
      isEmpty(this.props.data) === false
    ) {
      const select = this.props.data.filter((item) => {
        return item.id === this.props.defaultValue;
      });
      if (isEmpty(select) === false) {
        const iconStyle =
          isEmpty(select[0].value.style) === false &&
          isNil(select[0].value.style) === false
            ? JSON.parse(select[0].value.style)
            : [{ classIcon: '' }];
        this.setState({
          inputText: select[0].text,
          iconStyle: iconStyle[0].classIcon,
        });
      } else {
        this.setState({
          inputText: this.props.floatingLabelText,
        });
      }
    } else {
      this.setState({
        inputText: this.props.floatingLabelText,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      if (
        isNil(this.props.defaultValue) === false &&
        isEmpty(this.props.defaultValue) === false &&
        isEmpty(this.props.data) === false
      ) {
        const select = this.props.data.filter((item) => {
          return item.id === this.props.defaultValue;
        });
        if (isEmpty(select) === false) {
          const iconStyle =
            isEmpty(select[0].value.style) === false &&
            isNil(select[0].value.style) === false
              ? JSON.parse(select[0].value.style)
              : [{ classIcon: '' }];
        } else {
          this.setState({
            inputText: this.props.floatingLabelText,
          });
        }
      } else {
        this.setState({
          inputText: this.props.floatingLabelText,
        });
      }
    }
    return true;
  }

  toggleDropDown = async () => {
    if (this.props.disabled !== true) {
      await this.setState({
        dropdownOpen: !this.state.dropdownOpen,
      });
    }
  };

  toggleSplit = () => {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen,
    });
  };

  handleSelectItem = async (event, index, value, data) => {
    let select;
    if (isEmpty(this.props.data) === false) {
      select = await this.props.data.filter((item) => {
        return item.id === value;
      });
    }

    const iconStyle =
      isEmpty(select[0].value.style) === false &&
      isNil(select[0].value.style) === false
        ? await JSON.parse(select[0].value.style)
        : [{ classIcon: '' }];

    this.setState({
      inputText: select[0].text,
      iconStyle: iconStyle[0].classIcon,
    });
    this.props.onChange(event, index, value, data);
  };

  render() {
    const { inputText, iconStyle } = this.state;
    const {
      right,
      left,
      data,
      disabled,
      classButtonDropDown,
      classDropdownToggle,
      classDropdownItem,
      classDropdownItemText,
      className,
    } = this.props;

    return (
      <div
        className={isNil(className) === false ? className : 'languagePicker'}
      >
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropDown}
          className={
            isNil(classButtonDropDown) === false ? classButtonDropDown : ''
          }
        >
          <DropdownToggle
            caret
            disabled={isBoolean(disabled) ? disabled : false}
            caret
            className={
              isNil(classDropdownToggle) === false ? classDropdownToggle : ''
            }
          >
            <i className={iconStyle} />
            <h4>{inputText}</h4>
          </DropdownToggle>

          <DropdownMenu className="">
            {data.map((item, index) => {
              const iconStyle =
                isEmpty(item.value.style) === false &&
                isNil(item.value.style) === false
                  ? JSON.parse(item.value.style)
                  : [{ classIcon: '' }];

              return (
                <DropdownItem
                  key={item.id}
                  className={
                    isNil(classDropdownItem) === false
                      ? classDropdownItem
                      : 'coinControl'
                  }
                  onClick={(event) => {
                    this.handleSelectItem(event, index, item.id, item);
                  }}
                >
                  {(isNil(right) === false || isNil(left) === false) &&
                  right !== left ? (
                    <div
                      className={
                        isNil(classDropdownItemText) === false
                          ? classDropdownItemText
                          : ''
                      }
                    >
                      {right === true || left === false ? (
                        <div>
                          {item.text}
                          <i
                            className={
                              isNil(iconStyle[0].classIcon) === false &&
                              isEmpty(iconStyle[0].classIcon) === false
                                ? iconStyle[0].classIcon
                                : ''
                            }
                          />
                        </div>
                      ) : (
                        ''
                      )}
                      {right === false || left === true ? (
                        <div>
                          <i
                            className={
                              isNil(iconStyle[0].classIcon) === false &&
                              isEmpty(iconStyle[0].classIcon) === false
                                ? iconStyle[0].classIcon
                                : ''
                            }
                          />
                          {item.text}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    <div
                      className={
                        isNil(classDropdownItemText) === false
                          ? classDropdownItemText
                          : ''
                      }
                    >
                      {item.text}
                      <i
                        className={
                          isNil(iconStyle[0].classIcon) === false &&
                          isEmpty(iconStyle[0].classIcon) === false
                            ? iconStyle[0].classIcon
                            : ''
                        }
                      />
                    </div>
                  )}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

CustomSelectLanguage.propTypes = propTypes;

export { CustomSelectLanguage };
