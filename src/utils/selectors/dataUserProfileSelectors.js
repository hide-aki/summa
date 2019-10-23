import { createSelector } from 'reselect';

export const selectDataProfile = (state) =>
  state.getIn(['dataProfile', 'dataProfile']);

export const makeSelectDataProfile = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile']),
    (data) => data,
  );

export const selectIdCompany = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'idCompany']),
    (idCompany) => idCompany,
  );

export const selectIdSystemUser = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'idSystemUser']),
    (idSystemUser) => idSystemUser,
  );

export const selectIdEmployee = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'idEmployee']),
    (idEmployee) => idEmployee,
  );

export const selectEmployeeEmailsAddresses = () =>
  createSelector(
    (state) => state.getIn(['emailsAddresses']),
    (data) => {
      if (data) {
        if (typeof data.toJS === 'function') {
          return data.toJS();
        }
        return data;
      }
      return [];
    },
  );

export const selectToken = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'token']),
    (token) => token,
  );

export const selectLastStartSession = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'lastStartSession']),
    (lastStartSession) => lastStartSession,
  );

export const selectAccount = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'account']),
    (account) => account,
  );

export const selectAccountType = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'accountType']),
    (accountType) => accountType,
  );

export const selectAccountStatus = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'accountStatus']),
    (accountStatus) => accountStatus,
  );

export const selectActivatedAt = () =>
  createSelector(
    (state) => state.dataProfile.getIn(['dataProfile', 'activatedAt']),
    (activatedAt) => activatedAt,
  );
