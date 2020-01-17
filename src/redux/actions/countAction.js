import * as actionTypes from '../actionTypes';
export function addCount(data) {
  return {
    type: actionTypes.ADD_COUNT,
    data
  }
}