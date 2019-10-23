import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { MessagesFunctions } from '@pleedtech/pt-components';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';

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

class CustomSelectDefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      value: '',
      inputText: '',
      selectedItem: false,
    };
    this.messagesFunctions = new MessagesFunctions(props.selectMessages);
  }

  componentDidMount() {
    if (isEmpty(this.props.data) === false) {
      const select = this.props.data.filter((item) => {
        return item.id === this.props.defaultValue;
      });
      if (isEmpty(select) === false) {
        this.setState({
          inputText: select[0].text,
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

  componentWillReceiveProps(nextProps) {
    this.setLabel(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.cleanInput === true && nextProps.changeTab === false) {
      this.setState(
        (state) => ({
          inputText: '',
          selectedItem: true,
        }),
        () => {
          this.setLabel(nextProps, this.state.inputText, true);
        },
      );
    }

    if (this.props.params !== nextProps.params) {
      let inputText = '';
      nextProps.data.map((item, index) => {
        if (nextProps.defaultValue == item.id) {
          inputText = item.value.transactionStatus;
        }
      });

      this.setState(
        {
          inputText,
          selectedItem: true,
        },
        () => {
          this.setLabel(nextProps);
        },
      );
    }

    if (this.props.idLanguage !== nextProps.idLanguage) {
      this.messagesFunctions = new MessagesFunctions(nextProps.selectMessages);
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

    this.setState(
      {
        inputText: isNil(select[0].value.transactionStatus)
          ? select[0].text
          : select[0].value.transactionStatus,
        selectedItem: true,
      },
      () => {
        this.setLabel(this.props.data);
      },
    );

    this.props.onChange(event, index, value, data);
  };

  setLabel(
    nextProps,
    inputText = null,
    selectedItem = this.state.selectedItem,
  ) {
    if (
      isEmpty(nextProps.data) === false &&
      selectedItem === false &&
      isNil(inputText)
    ) {
      nextProps.data.map((item, index) => {
        if (nextProps.defaultValue == item.id) {
          inputText = item.value.transactionStatus;
        }
      });
      this.setState({
        inputText,
      });
    }
  }

  render() {
    const { inputText } = this.state;

    const {
      id,
      right,
      left,
      data,
      disabled,
      classInput,
      classButtonDropDown,
      classDropdownToggle,
      classIconDropdownToggle,
      classDropdownItem,
      classDropdownItemText,
      value,
      messages,
      toBlock,
      errorText,
      hintStyle,
      underlineStyle,
      underlineFocusStyle,
      floatingLabelStyle,
      errorStyle,
      underlineDisabledStyle,
      listStyle,
      menuItemStyle,
      menuStyle,
      selectedMenuItemStyle,
      style,
      floatingLabelFixed,
      fullWidth,
      autoWidth,
      hintText,
    } = this.props;

    return (
      <InputGroup onClick={this.toggleDropDown}>
        <Input
          type="text"
          id={isNil(id) === false ? id : 'input2-group3'}
          name={isNil(id) === false ? id : 'input2-group3'}
          placeholder=""
          value={this.messagesFunctions.getMessageFromListMessagesCode(
            inputText,
            inputText,
          )}
          disabled
          className={
            isNil(classInput) === false
              ? classInput
              : 'roundedControl inputControl'
          }
        />
        <InputGroupAddon addonType="append">
          <ButtonDropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropDown}
            className={
              isNil(classButtonDropDown) === false
                ? classButtonDropDown
                : 'dropDownRounded'
            }
          >
            <DropdownToggle
              disabled={isBoolean(disabled) ? disabled : false}
              caret
              color="primary"
              className={
                isNil(classDropdownToggle) === false
                  ? classDropdownToggle
                  : 'toggleControl'
              }
            >
              <span
                className={
                  isNil(classIconDropdownToggle) === false
                    ? classIconDropdownToggle
                    : ''
                }
              />
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
                            {this.messagesFunctions.getMessageFromListMessagesCode(
                              item.text,
                              item.text,
                            )}
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
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

CustomSelectDefault.propTypes = propTypes;
export { CustomSelectDefault };
