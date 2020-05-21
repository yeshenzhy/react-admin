import * as actionTypes from '../actionTypes';

export function setCollapse(data) {
  return {
    type: actionTypes.SET_COLLAPSE,
    data,
  };
}
