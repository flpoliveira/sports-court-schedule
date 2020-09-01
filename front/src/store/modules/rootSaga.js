import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import gerenciador from './gerenciador/sagas';
import bloco from './bloco/sagas';
import quadra from './quadra/sagas';
import usuario from './usuario/sagas';
import reserva from './reserva/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    gerenciador,
    bloco,
    quadra,
    usuario,
    reserva,
  ]);
}
