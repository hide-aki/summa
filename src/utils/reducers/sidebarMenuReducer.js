import { fromJS } from 'immutable';

const initialStateSidebarMenu = fromJS({
  sidebarMenu: [],
  activeUrl: '',
  idActiveUrl: '',
});

const sidebarMenuReducer = (state = initialStateSidebarMenu, action) => {
  switch (action.type) {
    case 'SET_SIDEBAR_MENU_TO_STATE':
      return state.set('sidebarMenu', action.sidebarMenu);
    case 'SET_SIDEBAR_MENU_ACTIVE_URL_TO_STATE':
      return state
        .setIn(['activeUrl'], action.sidebarMenuActiveData.url)
        .setIn(['idActiveUrl'], action.sidebarMenuActiveData.idElement);
    case 'CLEAR_SIDEBAR_MENU':
      return initialStateSidebarMenu;
    default:
      return state;
  }
};

export default sidebarMenuReducer;
