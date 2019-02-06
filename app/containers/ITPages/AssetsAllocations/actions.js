/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  CLEAR_STATE,
  GET_ASSETSLIST,
  GET_ASSETSLIST_SUCCESS,
  GET_ASSETSLIST_ERROR,
  GET_ASSETSLIST_NORESET,
  GET_EMPLIST,
  GET_EMPLIST_SUCCESS,
  GET_EMPLIST_ERROR,
  GET_EMPLIST_NORESET,
} from './constants';

/**
 * Clear the state on component unmount
 */
export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

/**
 * Retrieve the asset list
 */
export function getAssetList(search) {
  return {
    type: GET_ASSETSLIST,
    search,
  };
}
export function getAssetListSuccess(data, pages) {
  return {
    type: GET_ASSETSLIST_SUCCESS,
    data,
    pages,
  };
}
export function getAssetListError(error) {
  return {
    type: GET_ASSETSLIST_ERROR,
    error,
  };
}
export function getAssetListNoReset(page, search) {
  return {
    type: GET_ASSETSLIST_NORESET,
    page,
    search,
  };
}
/**
 * Retrieve the employee list
 */
export function getEmpList(search) {
  return {
    type: GET_EMPLIST,
    search,
  };
}
export function getEmpListSuccess(data, pages) {
  return {
    type: GET_EMPLIST_SUCCESS,
    data,
    pages,
  };
}
export function getEmpListError(error) {
  return {
    type: GET_EMPLIST_ERROR,
    error,
  };
}
export function getEmpListNoReset(page, search) {
  return {
    type: GET_EMPLIST_NORESET,
    page,
    search,
  };
}
