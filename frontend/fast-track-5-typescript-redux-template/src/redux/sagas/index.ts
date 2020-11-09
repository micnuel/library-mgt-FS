import { all, select, takeLatest } from 'redux-saga/effects'

//saving state on localstorage
function* saveState() {
  const state = yield select()
  yield localStorage.setItem('library-state', JSON.stringify(state))
}

export default function* rootSaga() {
  yield all([takeLatest('*', saveState)])
}
