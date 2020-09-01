
import produce from 'immer';

const INITIAL_STATE = {
  bloco: [],
};

export default function blocos(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@bloco/GET_BLOCO_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@bloco/GET_BLOCO_SUCCESS': {
        draft.bloco = action.payload.bloco;
        break;
      }
      default:
    }
  });
}