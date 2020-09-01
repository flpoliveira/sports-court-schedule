
import produce from 'immer';

const INITIAL_STATE = {
  usuario: [],
};

export default function usuarioes(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@usuario/GET_USUARIO_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@usuario/GET_USUARIO_SUCCESS': {
        draft.usuario = action.payload.usuario;
        break;
      }
      default:
    }
  });
}