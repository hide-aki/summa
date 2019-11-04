import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectDataProfile } from 'utils/selectors/dataUserProfileSelectors';
import TabAccountData from './components/tabAccountData';
import TabQuestionnaire from './components/tabQuestionnaire';
import CardsAccountDocuments from './components/customDocumentsCards/cardsAccountDocuments';
import TabsFormDataProfile from './components/customTabsFormDataProfile/tabsFormDataProfile';
import {
  selectMessages,
  selectIdLanguage,
} from '../../../containers/languageProvider/selectors';

class Cuenta extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      accordion: [true, false, false],
      collapse: true,
      activeTab: '1',
      activeTab2: '1',
    };
  }

  componentWillMount() {
    const { dataProfile, history } = this.props;
    if (dataProfile.acceptedTerms === false) {
      history.push('/condiciones');
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }
  togglelist(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  togglelist2 = (tab) => {
    if (this.state.activeTab2 !== tab) {
      this.setState({
        activeTab2: tab,
      });
    }
  };
  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <TabAccountData />
        {/* <CardsAccountDocuments /> */}

        {/* <TabsFormDataProfile /> */}
        <TabQuestionnaire messages={this.props.messages} isVisible={false} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectDataProfile(),
  messages: selectMessages(),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cuenta);
