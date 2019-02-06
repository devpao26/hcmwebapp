/**
 * Saga Listener
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
} from 'containers/App/constants';

import {
} from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
} from './constants';

import {
} from './actions';

import {
} from './selectors';

import request from 'utils/request';

let username;
let token;
const pageSize = 20;

/**
 * Root saga manages watcher lifecycle
 */
export default function* listenerSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());
}
