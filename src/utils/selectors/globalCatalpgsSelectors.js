import { createSelector } from 'reselect';

const makeSelectConditionalCatalog = () => createSelector(
  (state) => state.getIn(['globalCatalogs', 'conditionalCatalog']),
  (data) => {
    if (data) {
      if (typeof data.toJS === 'function') {
        return data.toJS();
      } else {
        return data;
      }
    }
  }
)

const makeSelectEmailTemplatesCatalog = () => createSelector(
  (state) => state.getIn(['globalCatalogs', 'emailTemplatesCatalog']),
  (data) => {
    if (data) {
      if (typeof data.toJS === 'function') {
        return data.toJS();
      } else {
        return data;
      }
    }
  }
)

export {
    makeSelectConditionalCatalog,
    makeSelectEmailTemplatesCatalog,
};