import { takeLatest, call, put, all } from 'redux-saga/effects';

import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../../services/api';
import { push } from 'connected-react-router';

import { getQuadraSuccess } from './actions';

export function* getQuadra({ payload }) {
  try {
    const response = yield call(api.get, 'quadra');

    if (response) {
      const quadra = response.data;
      yield put(getQuadraSuccess(quadra));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao pegar lista de quadras ##${Math.random()}`,
    }))
  }
}

export function* newQuadra({ payload }) {
  
  try {
    const response = yield call(api.post, 'quadra', payload.quadra);

    const quadra = response.data;
    if (quadra.error) {
      yield put(toastrActions.add({
        type: 'error',
        title: quadra.error,
      }));
    } else {
      yield put(toastrActions.add({
        type: 'success',
        title: `Quadra criado com sucesso #${Math.random()}`,
      }));
      yield put(push('/quadra'));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao criar o Quadra #${Math.random()}`,
    }))
  }
}

export default all([
  takeLatest('@quadra/GET_QUADRA_REQUEST', getQuadra),
  takeLatest('@quadra/NEW_QUADRA_REQUEST', newQuadra),
]);