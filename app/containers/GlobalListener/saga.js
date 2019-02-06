/**
 * Global saga
 */
// import { call, put, select, takeLatest } from 'redux-saga/effects';
// import request from 'utils/request';

/**
 * Root saga manages watcher lifecycle
 */
export default function* globalSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
}
