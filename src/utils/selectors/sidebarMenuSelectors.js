import { createSelector } from 'reselect';

const makeSelectGetSidebarMenuJson = () =>
  createSelector(
    (state) => state.sidebarMenu.getIn(['sidebarMenu']),
    (data) => {
      if (data) {
        if (typeof data.toJS === 'function') {
          return data.toJS();
        } else {
          return data;
        }
      }
    },
  );

const makeSelectActiveUrl = () =>
  createSelector(
    (state) => state.getIn(['sidebarMenu', 'activeUrl']),
    (data) => {
      if (data) {
        if (typeof data.toJS === 'function') {
          return data.toJS();
        } else {
          return data;
        }
      }
    },
  );

const makeSelectIdActiveUrl = () =>
  createSelector(
    (state) => state.getIn(['sidebarMenu', 'idActiveUrl']),
    (data) => {
      if (data) {
        if (typeof data.toJS === 'function') {
          return data.toJS();
        } else {
          return data;
        }
      }
    },
  );

export {
  makeSelectGetSidebarMenuJson,
  makeSelectActiveUrl,
  makeSelectIdActiveUrl,
};
