import { takeLatest, put, fork } from 'redux-saga/effects';

import AppFlowActions from '../../Constants';

function* reloadPageFunction() {
  // yield put({
  //   type: AppFlowActions.RELOAD_PAGE_REQUEST,
  // data: {
  //   sendingData: {
  //     filter: {
  //       type: undefined,
  //       notificationCursor: undefined,
  //       sortOrder: 'desc',
  //       sortField: '_id',
  //     },
  //     limit: parseInt(window.innerHeight / 120, 10) + 1,
  //   },
  //   isLoadMore: false,
  // },
  // });
}

function* reloadPageRequest() {
  yield takeLatest(AppFlowActions.RELOAD_PAGE_REQUEST, reloadPageFunction);
}

export default function* reloadFlow() {
  yield fork(reloadPageRequest);
}
