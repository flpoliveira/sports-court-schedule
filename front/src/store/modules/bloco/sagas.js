import { takeLatest, call, put, all } from 'redux-saga/effects';

import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../../services/api';
import { push } from 'connected-react-router';

import { getBlocoSuccess } from './actions';

export function* getBloco({ payload }) {
  try {
    const response = yield call(api.get, 'bloco');

    if (response) {
      const bloco = response.data;
      yield put(getBlocoSuccess(bloco));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao pegar lista de blocos ##${Math.random()}`,
    }))
  }
}

export function* newBloco({ payload }) {
  
  try {
    const response = yield call(api.post, 'bloco', payload.bloco);

    const bloco = response.data;
    if (bloco.error) {
      yield put(toastrActions.add({
        type: 'error',
        title: bloco.error,
      }));
    } else {
      yield put(toastrActions.add({
        type: 'success',
        title: `Bloco criado com sucesso #${Math.random()}`,
      }));
      yield put(push('/bloco'));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao criar o Bloco #${Math.random()}`,
    }))
  }
}

export default all([
  takeLatest('@bloco/GET_BLOCO_REQUEST', getBloco),
  takeLatest('@bloco/NEW_BLOCO_REQUEST', newBloco),
]);