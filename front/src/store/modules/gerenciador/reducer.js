
import produce from 'immer';

const INITIAL_STATE = {
  gerenciador: [],
};

export default function gerenciadores(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@gerenciador/GET_GERENCIADOR_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@gerenciador/GET_GERENCIADOR_SUCCESS': {
        draft.gerenciador = action.payload.gerenciador;
        break;
      }
      default:
    }
  });
}