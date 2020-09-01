
import produce from 'immer';

const INITIAL_STATE = {
  reserva: [],
};

export default function reservas(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@reserva/GET_RESERVA_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@reserva/GET_RESERVA_SUCCESS': {
        draft.reserva = action.payload.reserva;
        break;
      }
      default:
    }
  });
}