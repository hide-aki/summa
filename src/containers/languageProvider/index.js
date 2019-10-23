/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { selectLocale } from './selectors';

export class LanguageProvider extends React.PureComponent {
  render() {
    const { locale, children, messages } = this.props;
    return (
      <IntlProvider
        locale={locale}
        key={locale || 'en'}
        messages={messages[locale]}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  idRole: PropTypes.string,
  children: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(LanguageProvider);
