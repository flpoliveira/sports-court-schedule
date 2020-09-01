import { takeLatest, call, put, all } from 'redux-saga/effects';

import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../../services/api';
import { push } from 'connected-react-router';

import { getGerenciadorSuccess } from './actions';

export function* getGerenciador({ payload }) {
  try {
    const response = yield call(api.get, 'gerenciador');

    if (response) {
      const gerenciador = response.data;

      yield put(getGerenciadorSuccess(gerenciador));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao pegar lista de gerenciadores ##${Math.random()}`,
    }))
  }
}

export function* newGerenciador({ payload }) {
  
  try {
    const response = yield call(api.post, 'gerenciador', payload.gerenciador);

    const gerenciador = response.data;
    if (gerenciador.error) {
      yield put(toastrActions.add({
        type: 'error',
        title: gerenciador.error,
      }));
    } else {
      yield put(toastrActions.add({
        type: 'success',
        title: `Gerenciador criado com sucesso #${Math.random()}`,
      }));
      yield put(push('/gerenciador'));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao criar o Gerenciador #${Math.random()}`,
    }))
  }
}

export default all([
  takeLatest('@gerenciador/GET_GERENCIADOR_REQUEST', getGerenciador),
  takeLatest('@gerenciador/NEW_GERENCIADOR_REQUEST', newGerenciador),
]);