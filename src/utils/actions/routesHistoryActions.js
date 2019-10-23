export const actionSetRoutesHistory = (routes) => {
  return { type: 'SET_ROUTES_HISTORY', routes };
};

export const actionClearRoutesHistory = () => {
  return { type: 'CLEAR_ROUTES_HISTORY' };
};
