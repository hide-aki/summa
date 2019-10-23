import { createSelector } from 'reselect';

const Parameters = (state) => state.frontParameters.getIn(['parameters']);

const selectFrontParameters = () =>
  createSelector(
    [
      (state) => {
        return state.frontParameters.getIn(['parameters']);
      },
      Parameters,
    ],
    (parameters) => {
      let parametersToJS = {};
      if (parameters) {
        parametersToJS = parameters;
      }

      return parametersToJS;
    },
  );

export const selectTypeParam = () =>
  createSelector(
    [
      (state) => {
        return state.frontParameters.getIn(['parameters', '76', 'paramValue']);
      },
    ],
    (parameters) => parameters,
  );

export { selectFrontParameters };
