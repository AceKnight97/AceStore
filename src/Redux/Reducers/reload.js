import initialState from './initialState';
import AppFlowActions from '../../Constants';

const processReload = (state = initialState, action) => {
  if (action.type === AppFlowActions.RELOAD_PAGE_REQUEST) {
    const { login } = state;
    const returnValue = { ...initialState };
    returnValue.login = login;
    return returnValue;
  }
  return { ...state };
};

export default processReload;
