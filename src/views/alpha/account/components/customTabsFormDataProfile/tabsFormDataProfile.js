import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { MessagesFunctions } from '@pleedtech/pt-components/dist';

import {
  selectMessages,
  selectIdLanguage,
} from '../../../../../containers/languageProvider/selectors';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CustomButton,
  CustomCardBody,
  CustomCard,
  CustomCardGroup,
  CustomCol,
  CustomContainer,
  CustomForm,
  CustomInput,
  CustomInputGroup,
  CustomInputGroupAddon,
  CustomInputGroupText,
  CustomRow,
  CustomCheckBox,
  CustomDatePicker,
  CustomAppSwitch,
  CustomSelect,
  CustomRadioButton,
  CustomCardHeader,
  CustomToastr,
  ALERT_TYPE,
} from '@pleedtech/pt-components';
import classnames from 'classnames';

import { notification } from 'antd';

import {
  makeSelectDataProfile,
  selectIdCompany,
  selectIdEmployee,
  selectIdSystemUser,
} from '../../../../../utils/selectors/dataUserProfileSelectors';
import { postGetAnswersAccount, putAnswersAccount } from './actions';
import { showToastrMessage } from '../../../../../utils/actions/toastrActions';

class TabsFormDataProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accordion: [true, false, false],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: '1',
      activeTab2: '1',
      temporalData: {},
      tabsArray: {},
      maxTab: 0,
      isAnswered: false,
    };
    this.messagesFunctions = new MessagesFunctions(props.messages);
  }

  componentWillMount() {
    const { postGetAnswersAccount, triggerShowToastrMessage } = this.props;

    this.postGetAnswersAccount();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { idLanguage } = this.props;
    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(nextProps.messages);
    }
    return true;
  }

  async postGetAnswersAccount() {
    return new Promise(async (resolve, reject) => {
      const {
        postGetAnswersAccount,
        triggerShowToastrMessage,
        dataProfile,
      } = this.props;
      try {
        const data = {
          idCompany: dataProfile.idCompany,
          idSystemUser: dataProfile.idSystemUser,
          idCustomer: dataProfile.idCustomer,
          idReviewTest: null,
          idReviewSection: null,
          idReviewGrade: null,
        };
        const responde = await postGetAnswersAccount(data);

        const tabsResult = responde.result;

        if (isNil(tabsResult) === false && tabsResult.length <= 0) {
          return;
        }

        const temporalData = {};
        let isAnswered = false;

        // To do remove temporal logic block at questionnaire
        /*
        for(let indexOne in tabsResult) {
          if(tabsResult[indexOne].isAnswered === true) {
            isAnswered = tabsResult[indexOne].isAnswered;
            break;
          }
        }
        */

        this.setState({
          isAnswered,
        });
        for (let index in tabsResult) {
          if (tabsResult[index]) {
            if (isEmpty(tabsResult[index].answers) === false) {
              const answers = JSON.parse(tabsResult[index].answers);
              for (let indexAnswer in answers) {
                if (answers[indexAnswer]) {
                  if (answers[indexAnswer].isChecked !== undefined) {
                    temporalData[
                      tabsResult[index].idReviewSection.toString() +
                        tabsResult[index].idReviewGrade.toString() +
                        answers[indexAnswer].idReviewOption.toString()
                    ] = {
                      value:
                        tabsResult[index].idComponentTypeAnswer == 1
                          ? answers[indexAnswer].openAnswer
                          : answers[indexAnswer].isChecked === true
                          ? true
                          : false,
                      idReviewGrade: tabsResult[index].idReviewGrade,
                      idReviewOption: answers[indexAnswer].idReviewOption,
                      idComponentTypeAnswer:
                        tabsResult[index].idComponentTypeAnswer,
                      idReviewTemplate: tabsResult[index].idReviewTemplate,
                    };
                  }
                }
              }
            }
          }
        }
        this.setState({
          temporalData,
        });

        let tabsArray = [
          {
            idReviewSection: '1',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '2',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '3',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '4',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '5',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '6',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '7',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '8',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '9',
            reviewSection: '',
            questions: [],
          },
          {
            idReviewSection: '10',
            reviewSection: '',
            questions: [],
          },
        ];

        for (let tabIndex in tabsResult) {
          for (let indexOne in tabsArray) {
            if (
              tabsResult[tabIndex].idReviewSection ==
              tabsArray[indexOne].idReviewSection
            ) {
              tabsArray[indexOne].reviewSection =
                tabsResult[tabIndex].reviewSection;
              tabsArray[indexOne].questions.push({
                idComponentTypeAnswer: tabsResult[
                  tabIndex
                ].idComponentTypeAnswer.toString(),
                idReviewGrade: tabsResult[tabIndex].idReviewGrade,
                reviewGrade: tabsResult[tabIndex].reviewGrade,
                questionCols: tabsResult[tabIndex].questionCols,
                description: tabsResult[tabIndex].description,
                answersCols: tabsResult[tabIndex].answersCols,
                idReviewTemplate: tabsResult[tabIndex].idReviewTemplate,
                answers: JSON.parse(tabsResult[tabIndex].answers),
              });
            }
          }
        }

        let maxTab = 0;
        for (let count in tabsArray) {
          if (tabsArray[count]) {
            if (tabsArray[count].questions.length <= 0) {
              maxTab = tabsArray[parseInt(count, 10) - 1].idReviewSection;
              break;
            }
          }
        }

        this.setState({
          tabsArray,
          maxTab: parseInt(maxTab, 10),
        });
        const TABS_ARRAY = tabsArray;
        this.forceUpdate();
        /*
        const TABS_ARRAY = [
          {
            idReviewSection: '1',
            reviewSection:'Formación',
            questions: [
              {
                idComponentTypeAnswer: '20',
                idReviewGrade: '1',
                reviewGrade : 'Nivel de estudios',
                questionCols: '3',
                description: '',
                answersCols: '9',
                answers: [
                  {
                    idReviewOption: '1',
                    reviewOption: 'Sin estudios',
                    isChecked: false,
                    openAnswer: "hola"
                  },
                  {
                    idReviewOption: '2',
                    reviewOption: 'Estudios primarios',
                    isChecked: false,
                    openAnswer: null
                  },
                  {
                    idReviewOption: '3',
                    reviewOption: 'Estudios secundarios',
                    isChecked: false,
                    openAnswer: null
                  },
                ]
              },
              {
                idComponentTypeAnswer: '20',
                idReviewGrade: '2',
                reviewGrade : ' Experiencia profesional',
                questionCols: '3',
                description: 'Su actividad laboral respecto al sector financiero',
                answersCols: '9',
                answers: [
                  {
                    idReviewOption: '1',
                    reviewOption: 'Nunca he trabajado en el sector financiero ni en departamentos financieros de empresas',
                    isChecked: false,
                    openAnswer: "hola"
                  },
                  {
                    idReviewOption: '2',
                    reviewOption: 'En los últimos 3 años he trabajado o trabajó en el sector financiero en puestos ajenos a los mercados de valores.',
                    isChecked: false,
                    openAnswer: null
                  },
                  {
                    idReviewOption: '3',
                    reviewOption: 'En los últimos 3 años he trabajado en el sector financiero o en el departamento financiero de una empresa y conozco la operativa de mercados de valores o mercado de capitales.',
                    isChecked: false,
                    openAnswer: null
                  },
                ]
              }
            ]
          },
          
          {
            idReviewSection: '2',
            reviewSection:'Patrimonio financiero',
            questions: [
              {
                idComponentTypeAnswer: '1',
                idReviewGrade: '1',
                reviewGrade : 'Otro tipo de patrimonio',
                questionCols: '3',
                description: '',
                answersCols: '9',
                answers: [
                  {
                    idReviewOption: '1',
                    reviewOption: '',
                    isChecked: false,
                    openAnswer: null
                  },
                ]
              },
    
              {
                idComponentTypeAnswer: '1',
                idReviewGrade: '2',
                reviewGrade : 'Ingresos netos por trabajo',
                questionCols: '3',
                description: '',
                answersCols: '9',
                answers: [
                  {
                    idReviewOption: '1',
                    reviewOption: '',
                    isChecked: false,
                    openAnswer: null
                  }
                ]
              },
    
    
              {
                idComponentTypeAnswer: '2',
                idReviewGrade: '3',
                reviewGrade : ' ¿Podría describir su situación financiera?, es decir, ¿cómo se componen sus gastos?',
                questionCols: '3',
                description: '',
                answersCols: '9',
                answers: [
                  {
                    idReviewOption: '1',
                    reviewOption: 'Ingresos netos por trabajo',
                    isChecked: false,
                    openAnswer: null
                  },
                  {
                    idReviewOption: '2',
                    reviewOption: 'Ingresos por actividades económicas independientes',
                    isChecked: false,
                    openAnswer: null
                  },
                  {
                    idReviewOption: '3',
                    reviewOption: 'Otros ingresos',
                    isChecked: false,
                    openAnswer: null
                  }
                ]
              }
    
    
    
            ]
          },
          
        ];
        */

        resolve(responde);
        return responde;
      } catch (error) {
        this.openNotification(error.message, ALERT_TYPE.ERROR);
      }
    });
  }

  openNotification = (description, messageType) => {
    let className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';

    switch (messageType) {
      case ALERT_TYPE.SUCCESS:
        className = 'ntfctnANTCtrl_bb successNtfctnCtrl';
        break;
      case ALERT_TYPE.WARNING:
        className = 'ntfctnANTCtrl_bb warningNtfctnCtrl';
        break;
      case ALERT_TYPE.ERROR:
        className = 'ntfctnANTCtrl_bb dangerNtfctnCtrl';
        break;
      case ALERT_TYPE.INFO:
        className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
        break;

      default:
        className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
        break;
    }

    notification.open({
      message: '',
      description,
      style: {},
      className,
    });
  };

  togglelist2 = (tab) => {
    tab = tab.toString();
    if (this.state.activeTab2 !== tab) {
      this.setState({
        activeTab2: tab,
      });
    }
  };

  idGenerator() {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  switchRenderComponents(answer, question, idReviewSection) {
    const { temporalData } = this.state;
    if (this.state.activeTab2 == idReviewSection) {
      switch (question.idComponentTypeAnswer) {
        //radio = 67
        case '67':
          return (
            <div>
              <input
                type="radio"
                name={answer.reviewOption}
                value={answer.idReviewOption}
                checked={
                  isNil(
                    temporalData[
                      idReviewSection +
                        question.idReviewGrade +
                        answer.idReviewOption
                    ],
                  ) === true
                    ? answer.isChecked
                    : temporalData[
                        idReviewSection +
                          question.idReviewGrade +
                          answer.idReviewOption
                      ].value
                }
                onClick={(event) => {
                  if (this.state.isAnswered === true) {
                    return;
                  }
                  //alert("a")
                  const isChecked =
                    isNil(
                      temporalData[
                        idReviewSection +
                          question.idReviewGrade +
                          answer.idReviewOption
                      ],
                    ) === true
                      ? answer.isChecked
                      : temporalData[
                          idReviewSection +
                            question.idReviewGrade +
                            answer.idReviewOption
                        ].value;

                  //isChecked
                  if (isChecked === true) {
                    return null;
                  }

                  const data = { ...temporalData };
                  data[
                    idReviewSection +
                      question.idReviewGrade +
                      answer.idReviewOption
                  ] = {
                    value: !isChecked,
                    idReviewGrade: question.idReviewGrade,
                    idReviewOption: answer.idReviewOption,
                    idComponentTypeAnswer: question.idComponentTypeAnswer,
                    idReviewTemplate: question.idReviewTemplate,
                  };
                  this.setState(
                    {
                      temporalData: data,
                    },
                    () => {
                      this.togglelist2(idReviewSection);
                      this.forceUpdate();

                      const newTempData = { ...this.state.temporalData };
                      for (let index in newTempData) {
                        if (
                          newTempData[index].idReviewGrade ===
                            question.idReviewGrade &&
                          question.idReviewTemplate ===
                            newTempData[index].idReviewTemplate
                        ) {
                          if (
                            newTempData[index].idReviewOption !==
                            answer.idReviewOption
                          ) {
                            newTempData[index].value = false;
                          }
                        }
                      }
                      this.setState({
                        temporalData: newTempData,
                      });
                    },
                  );
                }}
              />
              <span>
                {' '}
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  answer.reviewOption,
                  '',
                )}
              </span>
            </div>
          );
          break;
        //input = 1
        case '1':
          return (
            <div>
              <CustomInput
                isVisible
                disabled={false}
                toBlock={false}
                type="text"
                id="patrimonio-input"
                name="patrimonio-input"
                value={
                  isNil(
                    temporalData[
                      idReviewSection +
                        question.idReviewGrade +
                        answer.idReviewOption
                    ],
                  ) === true
                    ? answer.openAnswer
                    : temporalData[
                        idReviewSection +
                          question.idReviewGrade +
                          answer.idReviewOption
                      ].value
                }
                className="inputBordered"
                onChange={(event, value) => {
                  if (this.state.isAnswered === true) {
                    return;
                  }
                  const data = { ...temporalData };
                  data[
                    idReviewSection +
                      question.idReviewGrade +
                      answer.idReviewOption
                  ] = {
                    value: value,
                    idReviewGrade: question.idReviewGrade,
                    idReviewOption: answer.idReviewOption,
                    idComponentTypeAnswer: question.idComponentTypeAnswer,
                    idReviewTemplate: question.idReviewTemplate,
                  };
                  this.setState({
                    temporalData: data,
                  });
                }}
              />
            </div>
          );
          break;

        //checkbox = 2
        case '2':
          return (
            <div>
              <input
                //className="form-check-input"
                type="checkbox"
                name={answer.reviewOption}
                value={answer.idReviewOption}
                checked={
                  isNil(
                    temporalData[
                      idReviewSection +
                        question.idReviewGrade +
                        answer.idReviewOption
                    ],
                  ) === true
                    ? answer.isChecked
                    : temporalData[
                        idReviewSection +
                          question.idReviewGrade +
                          answer.idReviewOption
                      ].value
                }
                onClick={(event) => {
                  if (this.state.isAnswered === true) {
                    return;
                  }
                  const isChecked =
                    isNil(
                      temporalData[
                        idReviewSection +
                          question.idReviewGrade +
                          answer.idReviewOption
                      ],
                    ) === true
                      ? answer.isChecked
                      : temporalData[
                          idReviewSection +
                            question.idReviewGrade +
                            answer.idReviewOption
                        ].value;
                  const data = { ...temporalData };
                  data[
                    idReviewSection +
                      question.idReviewGrade +
                      answer.idReviewOption
                  ] = {
                    value: !isChecked,
                    idReviewGrade: question.idReviewGrade,
                    idReviewOption: answer.idReviewOption,
                    idComponentTypeAnswer: question.idComponentTypeAnswer,
                    idReviewTemplate: question.idReviewTemplate,
                  };
                  this.setState(
                    {
                      temporalData: data,
                    },
                    () => {},
                  );
                }}
              />
              <span>
                {' '}
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  answer.reviewOption,
                  '',
                )}
              </span>{' '}
            </div>
          );
          break;
      }
    } else {
      return null;
    }
  }

  async postQuestionnaire() {
    const { temporalData } = this.state;
    const { dataProfile } = this.props;
    const answers = [];
    for (let index in temporalData) {
      const answer = {};
      if (temporalData[index]) {
        //{ "idReviewTemplate":"DD74314C-C0C3-4099-B166-6CD5BEF31F54", "idReviewOption":1, "isChecked":null, "openAnswer":"holaaaaaaaaaaa" },

        if (temporalData[index].idComponentTypeAnswer == 1) {
          answer.openAnswer = temporalData[index].value;

          answer.idReviewTemplate = temporalData[index].idReviewTemplate;
          answer.idReviewOption = temporalData[index].idReviewOption;
        }
        if (
          temporalData[index].idComponentTypeAnswer ==
          67 /*&& temporalData[index].value === true*/
        ) {
          answer.isChecked = temporalData[index].value;

          answer.idReviewTemplate = temporalData[index].idReviewTemplate;
          answer.idReviewOption = temporalData[index].idReviewOption;
        }
        if (temporalData[index].idComponentTypeAnswer == 2) {
          answer.isChecked = temporalData[index].value;

          answer.idReviewTemplate = temporalData[index].idReviewTemplate;
          answer.idReviewOption = temporalData[index].idReviewOption;
        }
      }
      if (isEmpty(answer) === false) {
        answers.push(answer);
      }
    }

    const data = {
      idCompany: dataProfile.idCompany,
      updatedByUser: dataProfile.idSystemUser,
      idCustomer: dataProfile.idCustomer,
      answers: answers,
      idScreenCode: null,
      idSection: null,
    };
    const { putAnswersAccount } = this.props;
    try {
      const responde = await putAnswersAccount(data, dataProfile.idCustomer);
      await this.postGetAnswersAccount();
      this.openNotification(
        this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000052',
          '',
        ),
        ALERT_TYPE.SUCCESS,
      );
    } catch (err) {
      this.openNotification(
        this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000053',
          '',
        ),
        ALERT_TYPE.ERROR,
      );
    }
  }

  render() {
    const TABS_ARRAY = [
      {
        idReviewSection: '1',
        reviewSection: 'Formación',
        questions: [
          {
            idComponentTypeAnswer: '20',
            idReviewGrade: '1',
            reviewGrade: 'Nivel de estudios',
            questionCols: '3',
            description: '',
            answersCols: '9',
            answers: [
              {
                idReviewOption: '1',
                reviewOption: 'Sin estudios',
                isChecked: false,
                openAnswer: 'hola',
              },
              {
                idReviewOption: '2',
                reviewOption: 'Estudios primarios',
                isChecked: false,
                openAnswer: null,
              },
              {
                idReviewOption: '3',
                reviewOption: 'Estudios secundarios',
                isChecked: false,
                openAnswer: null,
              },
            ],
          },
          {
            idComponentTypeAnswer: '20',
            idReviewGrade: '2',
            reviewGrade: ' Experiencia profesional',
            questionCols: '3',
            description: 'Su actividad laboral respecto al sector financiero',
            answersCols: '9',
            answers: [
              {
                idReviewOption: '1',
                reviewOption:
                  'Nunca he trabajado en el sector financiero ni en departamentos financieros de empresas',
                isChecked: false,
                openAnswer: 'hola',
              },
              {
                idReviewOption: '2',
                reviewOption:
                  'En los últimos 3 años he trabajado o trabajó en el sector financiero en puestos ajenos a los mercados de valores.',
                isChecked: false,
                openAnswer: null,
              },
              {
                idReviewOption: '3',
                reviewOption:
                  'En los últimos 3 años he trabajado en el sector financiero o en el departamento financiero de una empresa y conozco la operativa de mercados de valores o mercado de capitales.',
                isChecked: false,
                openAnswer: null,
              },
            ],
          },
        ],
      },

      {
        idReviewSection: '2',
        reviewSection: 'Patrimonio financiero',
        questions: [
          {
            idComponentTypeAnswer: '1',
            idReviewGrade: '1',
            reviewGrade: 'Otro tipo de patrimonio',
            questionCols: '3',
            description: '',
            answersCols: '9',
            answers: [
              {
                idReviewOption: '1',
                reviewOption: '',
                isChecked: false,
                openAnswer: null,
              },
            ],
          },

          {
            idComponentTypeAnswer: '1',
            idReviewGrade: '2',
            reviewGrade: 'Ingresos netos por trabajo',
            questionCols: '3',
            description: '',
            answersCols: '9',
            answers: [
              {
                idReviewOption: '1',
                reviewOption: '',
                isChecked: false,
                openAnswer: null,
              },
            ],
          },

          {
            idComponentTypeAnswer: '2',
            idReviewGrade: '3',
            reviewGrade:
              ' ¿Podría describir su situación financiera?, es decir, ¿cómo se componen sus gastos?',
            questionCols: '3',
            description: '',
            answersCols: '9',
            answers: [
              {
                idReviewOption: '1',
                reviewOption: 'Ingresos netos por trabajo',
                isChecked: false,
                openAnswer: null,
              },
              {
                idReviewOption: '2',
                reviewOption:
                  'Ingresos por actividades económicas independientes',
                isChecked: false,
                openAnswer: null,
              },
              {
                idReviewOption: '3',
                reviewOption: 'Otros ingresos',
                isChecked: false,
                openAnswer: null,
              },
            ],
          },
        ],
      },
    ];

    //components type:
    // 67 radio button
    // 19 label
    const { tabsArray } = this.state;
    return (
      <CustomRow>
        <CustomCol>
          {/* Cuestionario registro perfil */}
          <h1>
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000048',
              '',
            )}
          </h1>
          <p>
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000049',
              '',
            )}
          </p>
          {/* Navs */}
          <Nav tabs>
            {isNil(tabsArray) === false &&
              Array.isArray(tabsArray) === true &&
              tabsArray.map((tab, index) => {
                if (
                  isNil(tab.questions) === false &&
                  Array.isArray(tab.questions) === true &&
                  isEmpty(tab.questions) === true
                ) {
                  return null;
                } else {
                  return (
                    <NavItem id={'tab_id_' + tab.idReviewSection}>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab2 === tab.idReviewSection,
                        })}
                        onClick={() => {
                          this.togglelist2(tab.idReviewSection);
                        }}
                      >
                        {this.messagesFunctions.getMessageFromListMessagesCode(
                          tab.reviewSection,
                          '',
                        )}
                      </NavLink>
                    </NavItem>
                  );
                }
              })}
          </Nav>

          <TabContent activeTab={this.state.activeTab2}>
            {isNil(tabsArray) === false &&
              Array.isArray(tabsArray) === true &&
              tabsArray.map((tab, index) => {
                return (
                  <TabPane tabId={tab.idReviewSection}>
                    <div className="form-horizontal">
                      {isNil(tab.questions) === false &&
                        Array.isArray(tab.questions) === true &&
                        tab.questions.map((question, indexQuestion) => {
                          return (
                            <FormGroup row>
                              <CustomCol md={question.questionCols}>
                                <h6>
                                  <i class="fa fa-check-circle mt-0 mr-1 yellow"></i>{' '}
                                  {this.messagesFunctions.getMessageFromListMessagesCode(
                                    question.reviewGrade,
                                    '',
                                  )}
                                </h6>
                                {isEmpty(question.description) === false &&
                                  isNil(question.description) === false && (
                                    <small>
                                      {this.messagesFunctions.getMessageFromListMessagesCode(
                                        question.description,
                                        '',
                                      )}
                                    </small>
                                  )}
                              </CustomCol>
                              <CustomCol md={question.answersCols}>
                                {isNil(question.answers) === false &&
                                  Array.isArray(question.answers) === true &&
                                  question.answers.map(
                                    (answer, indexAnswer) => {
                                      return (
                                        <div>
                                          {this.switchRenderComponents(
                                            answer,
                                            question,
                                            tab.idReviewSection,
                                          )}
                                        </div>
                                      );
                                    },
                                  )}
                              </CustomCol>
                            </FormGroup>
                          );
                        })}
                      {this.state.maxTab ==
                      parseInt(this.state.activeTab2, 10) ? (
                        <div>
                          <CustomButton
                            onClick={() => {
                              document
                                .getElementById(
                                  'tab_id_' +
                                    (parseInt(this.state.activeTab2, 10) - 1),
                                )
                                .click();
                              this.togglelist2(
                                parseInt(this.state.activeTab2, 10) - 1,
                              );
                            }}
                            label={this.messagesFunctions.getMessageFromListMessagesCode(
                              'FRL0000000000051',
                              '',
                            )}
                            //classIcon="fa fa-lock mr-1"
                            isVisible
                            type="submit"
                            size="md"
                            color="warning"
                            className=" btn btn-md buttonControlCheck"
                          />
                          <span>&nbsp;</span>
                          <CustomButton
                            onClick={() => {
                              this.postQuestionnaire();
                            }}
                            label={this.messagesFunctions.getMessageFromListMessagesCode(
                              'FRL0000000000050',
                              '',
                            )}
                            //classIcon="fa fa-lock mr-1"
                            isVisible={
                              this.state.isAnswered == true ? false : true
                            }
                            type="submit"
                            size="md"
                            color="warning"
                            className=" btn btn-md buttonControlCheck"
                          />
                        </div>
                      ) : (
                        <div style={{ display: 'flex' }}>
                          {parseInt(this.state.activeTab2, 10) - 1 ==
                          0 ? null : (
                            <div>
                              <CustomButton
                                onClick={() => {
                                  document
                                    .getElementById(
                                      'tab_id_' +
                                        (parseInt(this.state.activeTab2, 10) -
                                          1),
                                    )
                                    .click();
                                  this.togglelist2(
                                    parseInt(this.state.activeTab2, 10) - 1,
                                  );
                                }}
                                label={this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000051',
                                  '',
                                )}
                                //classIcon="fa fa-lock mr-1"
                                isVisible
                                type="submit"
                                size="md"
                                color="warning"
                                className=" btn btn-md buttonControlCheck"
                              />
                              <span>&nbsp;</span>
                            </div>
                          )}
                          <CustomButton
                            onClick={() => {
                              document
                                .getElementById(
                                  'tab_id_' +
                                    (parseInt(this.state.activeTab2, 10) + 1),
                                )
                                .click();
                              this.togglelist2(
                                parseInt(this.state.activeTab2, 10) + 1,
                              );
                            }}
                            label={this.messagesFunctions.getMessageFromListMessagesCode(
                              'FRL0000000000086',
                              '',
                            )}
                            //classIcon="fa fa-lock mr-1"
                            isVisible
                            type="submit"
                            size="md"
                            color="warning"
                            className=" btn btn-md buttonControlCheck"
                          />
                        </div>
                      )}
                    </div>
                  </TabPane>
                );
              })}
          </TabContent>
        </CustomCol>
      </CustomRow>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectDataProfile(),
  idSystemUser: selectIdSystemUser(),
  messages: selectMessages(),
  idLanguage: selectIdLanguage(),
});

const mapDispatchToProps = (dispatch) => ({
  postGetAnswersAccount: (data) => dispatch(postGetAnswersAccount(data)),
  putAnswersAccount: (data, idCustomer) =>
    dispatch(putAnswersAccount(data, idCustomer)),
  triggerShowToastrMessage: (message, type) =>
    dispatch(showToastrMessage(message, type)),
});

TabsFormDataProfile.defaultProps = {};
TabsFormDataProfile.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabsFormDataProfile);
