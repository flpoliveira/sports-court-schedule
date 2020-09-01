
import produce from 'immer';

const INITIAL_STATE = {
  quadra: [],
};

export default function quadras(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@quadra/GET_QUADRA_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@quadra/GET_QUADRA_SUCCESS': {
        draft.quadra = action.payload.quadra;
        break;
      }
      default:
    }
  });
}