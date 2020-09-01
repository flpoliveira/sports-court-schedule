export function getReservaRequest() {
    return {
      type: '@reserva/GET_RESERVA_REQUEST',
    };
  }
  
export function getReservaSuccess(reserva) {
    return {
        type: '@reserva/GET_RESERVA_SUCCESS',
        payload: { reserva },
    };
}

export function newReservaRequest(reserva) {
    return {
        type: '@reserva/NEW_RESERVA_REQUEST',
        payload: { reserva },
    };
}

export function newReservaSuccess(reserva) {
    return {
        type: '@reserva/NEW_RESERVA_SUCCESS',
        payload: { reserva },
    };
}