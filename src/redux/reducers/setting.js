import * as actionTypes from '../actionTypes';

const collapse = (state = { isCollapsed: false }, action) => {
  switch (action.type) {
    case actionTypes.SET_COLLAPSE:
      const { data } = action;
      return { ...state, ...data };
    default:
      return state;
  }
};

export default collapse;

