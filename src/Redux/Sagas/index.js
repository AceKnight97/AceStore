import { fork } from 'redux-saga/effects';
import loginFlow from './login';
import reloadFlow from './reload';

export default function* root() {
  yield fork(loginFlow);
  yield fork(reloadFlow);
}
