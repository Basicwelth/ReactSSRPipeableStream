import { all, put, take, takeEvery } from 'redux-saga/effects';
import { APP_START } from '../actions/StartActions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

function* appStart() {
  yield take(APP_START);
}

export default function* rootSaga() {
  yield all([
	appStart(),
	watchIncrementAsync(),
  ]);
}
