/* reselect */
import { createSelector } from 'reselect';

const selectRoutesHistory = () =>
  createSelector(
    [(state) => state.routesHistory.getIn(['routes'])],
    (routes) => {
      if (routes) {
        if (typeof routes.toJS === 'function') {
          return routes.toJS();
        }
        return routes;
      }
    },
  );

export { selectRoutesHistory };
