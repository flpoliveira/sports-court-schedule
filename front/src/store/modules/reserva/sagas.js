import { takeLatest, call, put, all } from 'redux-saga/effects';

import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../../services/api';
import { push } from 'connected-react-router';

import { getReservaSuccess } from './actions';

export function* getReserva({ payload }) {
  try {
    const response = yield call(api.get, 'reserva');

    if (response) {
      const reserva = response.data;
      yield put(getReservaSuccess(reserva));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao pegar lista de reservas ##${Math.random()}`,
    }))
  }
}

export function* newReserva({ payload }) {
  
  try {
    const response = yield call(api.post, 'reserva', payload.reserva);

    const reserva = response.data;
    if (reserva.error) {
      yield put(toastrActions.add({
        type: 'error',
        title: reserva.error,
      }));
    } else {
      yield put(toastrActions.add({
        type: 'success',
        title: `Reserva criado com sucesso #${Math.random()}`,
      }));
      yield put(push('/reserva'));
    }
  } catch (err) {

    yield put(toastrActions.add({
      type: 'error',
      title: `Falha ao criar o Reserva #${Math.random()}`,
    }))
  }
}

export default all([
  takeLatest('@reserva/GET_RESERVA_REQUEST', getReserva),
  takeLatest('@reserva/NEW_RESERVA_REQUEST', newReserva),
]);