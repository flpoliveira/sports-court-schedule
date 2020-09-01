import { combineReducers } from 'redux';

import auth from './auth/reducer';
import gerenciador from './gerenciador/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import { connectRouter } from 'connected-react-router';

export default history => combineReducers({
  auth,
  toastr,
  gerenciador,
  router: connectRouter(history)
});
