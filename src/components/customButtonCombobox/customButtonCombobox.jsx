import React, { Component } from 'react';
import {
  Dropdown,
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';

class CustomButtonCombobox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
    };
  }

  toggleDD(i) {
    const { dropdownOpen } = this.state;
    const newArray = dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {
    let component = <div />;
    const {
      labelButton,
      isVisibleComponent,
      data,
      messagesFunctions,
      onClick,
    } = this.props;

    const { dropdownOpen } = this.state;

    if (isVisibleComponent === true) {
      component = (
        <Dropdown
          isOpen={dropdownOpen[0]}
          toggle={() => {
            this.toggleDD(0);
          }}
          className="yearControlClosging_bb"
        >
          <DropdownToggle caret>{labelButton}</DropdownToggle>
          <DropdownMenu>
            {isNil(data) === false
              ? data.map((row, index) => {
                  const item = row.value;
                  const status = JSON.parse(item.styleAccountClosingStatus)
                    .status;
                  return (
                    <DropdownItem
                      key={item.id}
                      onClick={(event) => {
                        return onClick(event, index, item.id, item);
                      }}
                    >
                      {row.value.text}{' '}
                      <Badge color={status}>
                        {messagesFunctions.getMessageFromListMessagesCode(
                          item.accountClosingStatus,
                          item.accountClosingStatus,
                        )}
                      </Badge>
                    </DropdownItem>
                  );
                })
              : ''}
          </DropdownMenu>
        </Dropdown>
      );
    }

    return component;
  }
}

CustomButtonCombobox.propTypes = {
  messagesFunctions: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  labelButton: PropTypes.string.isRequired,
  isVisibleComponent: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { CustomButtonCombobox };
