import React, { useState } from 'react';
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
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import {
  CustomCol,
  CustomRow,
  CustomInput,
  CustomSelectOption,
} from '@pleedtech/pt-components';
import { MessagesFunctions } from '@pleedtech/pt-components/dist';

const TabQuestionnaire = (props) => {
  const { messages, isVisible } = props;
  const [activeTab, setActiveTab] = useState('1');
  const messagesFunctions = new MessagesFunctions(messages);
  let component = <div />;

  const TABS_ARRAY = [
    {
      idCustomer: '72fe95c2-2614-49ca-9d4b-0267ca7b5188',
      idReviewTemplate: 'a3466ab3-4961-4398-a27a-3dfa55cb053b',
      idReviewTest: 1,
      reviewTest: 'SVC0000000000001',
      idReviewSection: 1,
      reviewSection: 'SVC0000000000002',
      idReviewGrade: 1,
      reviewGrade: 'SVC0000000000004',
      description: null,
      idComponentTypeAnswer: 1,
      questionCols: '3',
      answersCols: '9',
      answers:
        '[{"idReviewOption":1,"reviewOption":"SVC0000000000008","isChecked":null,"openAnswer":"hola1"}]',
      isAnswered: false,
    },
    {
      idCustomer: '72fe95c2-2614-49ca-9d4b-0267ca7b5188',
      idReviewTemplate: '6d845b51-5f37-4f6a-804e-23639c6da713',
      idReviewTest: 1,
      reviewTest: 'SVC0000000000001',
      idReviewSection: 1,
      reviewSection: 'SVC0000000000002',
      idReviewGrade: 2,
      reviewGrade: 'SVC0000000000005',
      description: 'SVC0000000000100',
      idComponentTypeAnswer: 1,
      questionCols: '3',
      answersCols: '9',
      answers:
        '[{"idReviewOption":7,"reviewOption":"SVC0000000000014","isChecked":null,"openAnswer":"Hola2"}]',
      isAnswered: false,
    },
    {
      idCustomer: '72fe95c2-2614-49ca-9d4b-0267ca7b5188',
      idReviewTemplate: '0f754e8e-8b61-4ebe-8dea-5fc02549da5a',
      idReviewTest: 1,
      reviewTest: 'SVC0000000000001',
      idReviewSection: 2,
      reviewSection: 'SVC0000000000003',
      idReviewGrade: 3,
      reviewGrade: 'SVC0000000000006',
      description: 'SVC0000000000101',
      idComponentTypeAnswer: 4,
      questionCols: '3',
      answersCols: '9',
      answer: '11',
      options:
        '[{"id":10,"text":"SVC0000000000017"},{"id":11,"text":"SVC0000000000046"}]',
      isAnswered: false,
    },
    {
      idCustomer: '72fe95c2-2614-49ca-9d4b-0267ca7b5188',
      idReviewTemplate: '24daf850-12ff-4714-8a1e-1c039f34717e',
      idReviewTest: 1,
      reviewTest: 'SVC0000000000001',
      idReviewSection: 2,
      reviewSection: 'SVC0000000000003',
      idReviewGrade: 4,
      reviewGrade: 'SVC0000000000007',
      description: 'SVC0000000000102',
      idComponentTypeAnswer: 4,
      questionCols: '3',
      answersCols: '9',
      answers:
        '[{"idReviewOption":13,"reviewOption":"SVC0000000000048","isChecked":null,"openAnswer":null},{"idReviewOption":14,"reviewOption":"SVC0000000000049","isChecked":null,"openAnswer":null},{"idReviewOption":15,"reviewOption":"SVC0000000000050","isChecked":null,"openAnswer":null},{"idReviewOption":16,"reviewOption":"SVC0000000000052","isChecked":null,"openAnswer":null}]',
      isAnswered: false,
    },
    {
      idCustomer: '72fe95c2-2614-49ca-9d4b-0267ca7b5188',
      idReviewTemplate: 'dd74314c-c0c3-4099-b166-6cd5bef31f54',
      idReviewTest: 1,
      reviewTest: 'SVC0000000000001',
      idReviewSection: 3,
      reviewSection: 'SVC0000000000020',
      idReviewGrade: 5,
      reviewGrade: 'SVC0000000000024',
      description: null,
      idComponentTypeAnswer: 1,
      questionCols: '3',
      answersCols: '9',
      answers:
        '[{"idReviewOption":17,"reviewOption":"SVC0000000000051","isChecked":null,"openAnswer":null},{"idReviewOption":18,"reviewOption":"SVC0000000000053","isChecked":null,"openAnswer":null},{"idReviewOption":19,"reviewOption":"SVC0000000000054","isChecked":null,"openAnswer":null},{"idReviewOption":20,"reviewOption":"SVC0000000000055","isChecked":null,"openAnswer":null},{"idReviewOption":21,"reviewOption":"SVC0000000000056","isChecked":null,"openAnswer":null}]',
      isAnswered: false,
    },
  ];

  const selectComponentDynamic = (type, question, row) => {
    let componentRender = <div />;
    console.log('type, question, row', type, question, row);
    switch (type) {
      case 1:
        componentRender = (
          <CustomInput
            isVisible
            type="text"
            id="phone-input"
            name="phone-input"
            placeholder="55 2330 3928"
            className="inputBordered"
            value=""
            toBlock={false}
            disabled={false}
            onChange={(event, value) => {}}
          />
        );
        break;
      case 4:
        componentRender = (
          <CustomSelectOption
            selected={''}
            defaultValue={''}
            value={''}
            classButtonDropDown=""
            classDropdownToggle="btn-warning"
            classIconDropdownToggle=" fa fa-check"
            classDropdownItem="coinControl"
            classInput="input_upload"
            disabled={false}
            data={[]}
            onChange={(event, index, value, data) => {}}
            selectMessages={messages}
          />
        );
        break;

      default:
        componentRender = <div />;
        break;
    }
    return componentRender;
  };

  if (isVisible === true) {
    component = (
      <CustomRow>
        <CustomCol xs="12">
          <h1>Completa tu información</h1>
          <p>
            Para finalizar, seleccione la opción correspondiente para concluir
            su perfil.
          </p>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  setActiveTab('1');
                }}
              >
                Información
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {TABS_ARRAY.map((rowMap) => {
                const questions =
                  isNil(rowMap.answers) === false &&
                  isEmpty(rowMap.answers) === false
                    ? JSON.parse(rowMap.answers)
                    : [];
                return (
                  <FormGroup row>
                    <CustomCol md={rowMap.questionCols}>
                      <h6>
                        <i className="fa fa-check-circle colorCheck" />{' '}
                        {messagesFunctions.getMessageFromListMessagesCode(
                          rowMap.reviewGrade,
                          rowMap.reviewGrade,
                        )}
                      </h6>
                    </CustomCol>
                    <CustomCol md={rowMap.answersCols}>
                      {selectComponentDynamic(
                        rowMap.idComponentTypeAnswer,
                        questions,
                        rowMap,
                      )}
                    </CustomCol>
                  </FormGroup>
                );
              })}
            </TabPane>
          </TabContent>
        </CustomCol>
      </CustomRow>
    );
  }

  return component;
};

export default TabQuestionnaire;
