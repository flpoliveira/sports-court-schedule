import { takeLatest, call, put, all } from 'redux-saga/effects';

import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../../services/api';

import { signInSuccess, signFailure, } from './actions';
import { push } from 'connected-react-router';

export function* signIn({ payload }) {
  try {
    const { login, senha } = payload;

    const response = yield call(api.post, 'login', {
      cpf: login,
      senha,
    });

    if (response) {
      const { token, user } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;
      yield put(toastrActions.add({
        type: `success`,
        title: `Logado com sucesso #${Math.random()}`,
      }))
      yield put(signInSuccess(token, user));
      yield put(push('/admin'));
    }
  } catch (err) {
    yield put(toastrActions.add({
      type: `error`,
      title: `Falha no login #${Math.random()}`,
      message: 'Verifique seu cpf/senha!'
    }))
    yield put(signFailure());
    yield put(push('/login'));
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
