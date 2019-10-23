import React, { Component } from 'react';

import {
  CustomCardHeader,
  CustomCardBody,
  CustomRow,
  CustomCard,
  CustomCol,
  CustomInput,
  CustomInputGroupAddon,
  CustomInputGroup,
  CustomInputGroupText,
  CustomButton,
  DateFunctions,
  ListComponentsHandler,
  MessagesFunctions,
} from '@pleedtech/pt-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import img7 from '../../assets/img/avatars/7.jpg';

import {
  selectMessages,
  selectIdLanguage,
} from '../../containers/languageProvider/selectors';

const defaultState = {
  inputText: '',
};

class CustomCardComments extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.selectMessages =
      isNil(props.selectMessages) === false ? props.selectMessages : null;
    this.messagesFunctions = new MessagesFunctions(this.selectMessages);
    this.listComponentsHandler = new ListComponentsHandler();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { idLanguage, selectMessages } = this.props;

    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(selectMessages);
    }
    return true;
  }

  handleInput = async (event, value) => {
    await this.setState({
      inputText: value,
    });
  };

  handleButton = async (event) => {
    const value = this.state.inputText.trim();
    if (isEmpty(value) === false) {
      this.props.onClick(event, value);
      this.setState({
        inputText: '',
      });
    }
  };

  render() {
    const { inputText } = this.state;
    const {
      toBlockCommentsTextArea,
      toBlockCommentsButonSend,
      noComments,
      isVisibleTitleSection,
      isVisibleCustomText,
      isVisibleCustomButton,
      data,
      title,
      makeSelectDataProfile,
      titleNoComments,
    } = this.props;

    return (
      <div>
        <CustomCard className="commentsCARD">
          <CustomCardHeader className="DarkHeader">
            <strong className="headerTittle">
              <i className="fa fa-comments headerIcon" />
              {isVisibleTitleSection ? (
                <span className="headerTittle">{title} </span>
              ) : (
                ''
              )}
            </strong>
          </CustomCardHeader>
          <CustomCardBody>
            <CustomRow className="spacing" />

            <div className="commentsControl ">
              {Array.isArray(data) && isEmpty(data) === false ? (
                data.map((item, index) => {
                  return (
                    <CustomRow key={index} className="commentContainer">
                      <CustomCol xl="12" lg="12" md="12" sm="12" xs="12">
                        <div className="message">
                          <div className="py-3 pb-5 mr-3 float-left">
                            <div className="avatar">
                              <img
                                src={
                                  isEmpty(item.profilePicture)
                                    ? `data:image/png;base64,${
                                        makeSelectDataProfile.profilePicture
                                      }`
                                    : `data:image/png;base64,${
                                        item.profilePicture
                                      }`
                                }
                                className="img-avatar"
                                alt="admin@bootstrapmaster.com"
                              />
                              <span className="avatar-status badge-success" />
                            </div>
                          </div>
                          <div>
                            <small className="text-muted">
                              {isNil(item.userName) === false
                                ? item.userName
                                : ''}
                            </small>
                            <small className="text-muted float-right mt-1">
                              {isNil(item.commentedAt) === false
                                ? item.commentedAt
                                : ''}
                            </small>
                          </div>
                          <div className="text-truncate font-weight-bold">
                            {isNil(item.subject) === false
                              ? this.messagesFunctions.getMessageFromListMessagesCode(
                                  item.subject,
                                  item.subject,
                                )
                              : ''}
                          </div>
                          <small className="text-muted">
                            {isNil(item.comment) === false ? item.comment : ''}
                          </small>
                        </div>
                      </CustomCol>
                    </CustomRow>
                  );
                })
              ) : (
                <div className="avisoEmpty">
                  <i className="fa fa-comments helpIcon" /> <br />
                  <label htmlFor="" className="noCommentsLabel">
                    {titleNoComments}
                  </label>
                </div>
              )}
            </div>

            <CustomRow className=" spacingBordered-up" />
            <CustomRow>
              <CustomCol xl="1" lg="1" md="1" sm="1" xs="1" />
              <CustomCol xl="12" lg="12" md="12" sm="12" xs="12">
                <FormGroup />
                <CustomInputGroup>
                  <CustomInput
                    value={inputText}
                    type="textarea"
                    name="textarea-input"
                    id="textarea-input"
                    rows="2"
                    placeholder=""
                    className="inputBordered inputControl"
                    isVisible={isVisibleCustomText}
                    disable={false}
                    toBlock={toBlockCommentsTextArea}
                    onChange={(event, value) => {
                      this.handleInput(event, value);
                    }}
                  />
                  <CustomInputGroupAddon addonType="append">
                    <CustomInputGroupText className="addControl">
                      <CustomButton
                        block
                        color="success"
                        className="addCommentControl"
                        classIcon="fa fa-paper-plane"
                        isVisible={isVisibleCustomButton}
                        onClick={(event) => {
                          this.handleButton(event);
                        }}
                      />
                    </CustomInputGroupText>
                  </CustomInputGroupAddon>
                </CustomInputGroup>
              </CustomCol>
              <CustomCol xl="1" lg="1" md="1" sm="1" xs="1" />
            </CustomRow>
          </CustomCardBody>
        </CustomCard>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectMessages: selectMessages(),
  idLanguage: selectIdLanguage(),
});

export default connect(mapStateToProps)(CustomCardComments);
