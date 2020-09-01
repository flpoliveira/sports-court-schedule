import { combineReducers } from 'redux';

import auth from './auth/reducer';
import gerenciador from './gerenciador/reducer';
import bloco from './bloco/reducer';
import quadra from './quadra/reducer';
import usuario from './usuario/reducer';
import reserva from './reserva/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import { connectRouter } from 'connected-react-router';

export default history => combineReducers({
  auth,
  toastr,
  gerenciador,
  bloco,
  quadra,
  usuario,
  reserva,
  router: connectRouter(history)
});
