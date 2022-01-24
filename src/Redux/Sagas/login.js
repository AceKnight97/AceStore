import { put, call, take, fork } from "redux-saga/effects";

import _ from "lodash";
import auth from "../../Helpers/auth";
import AppFlowActions from "../../Constants";

// import login from '../reducers/login';

export function* loginRequest() {
  const INFINITE = true;
  while (INFINITE) {
    const request = yield take(AppFlowActions.LOGIN_REQUEST);
    const { data } = request;
    const result = {
      isSuccess: true,
      user: _.cloneDeep(data.user),
      token: data.token,
    };
    // console.log({ result });
    auth.login(result);
    yield put({ type: AppFlowActions.LOGIN_COMPLETE, data: result });
    // if (result.isSuccess === true) {
    //   yield put({ type: AppFlowActions.GET_ALL_DATA_REQUEST });
    // }
  }
}

export default function* loginFlow() {
  yield fork(loginRequest);
}
