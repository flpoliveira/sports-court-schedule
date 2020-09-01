import { takeLatest, call, put, all } from 'redux-saga/effects';

import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../../services/api';
import { push } from 'connected-react-router';

import { getUsuarioSuccess } from './actions';

export function* getUsuario({ payload }) {
  try {
    const response = yield call(api.get, 'usuario');

    if (response) {
      const usuario = response.data;

      yield put(getUsuarioSuccess(usuario));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao pegar lista de usuario ##${Math.random()}`,
    }))
  }
}

export function* newUsuario({ payload }) {
  
  try {
    const response = yield call(api.post, 'usuario', payload.usuario);

    const usuario = response.data;
    if (usuario.error) {
      yield put(toastrActions.add({
        type: 'error',
        title: usuario.error,
      }));
    } else {
      yield put(toastrActions.add({
        type: 'success',
        title: `Usuario criado com sucesso #${Math.random()}`,
      }));
      yield put(push('/usuario'));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao criar o Usuario #${Math.random()}`,
    }))
  }
}

export default all([
  takeLatest('@usuario/GET_USUARIO_REQUEST', getUsuario),
  takeLatest('@usuario/NEW_USUARIO_REQUEST', newUsuario),
]);