export function getQuadraRequest() {
    return {
      type: '@quadra/GET_QUADRA_REQUEST',
    };
  }
  
export function getQuadraSuccess(quadra) {
    return {
        type: '@quadra/GET_QUADRA_SUCCESS',
        payload: { quadra },
    };
}

export function newQuadraRequest(quadra) {
    return {
        type: '@quadra/NEW_QUADRA_REQUEST',
        payload: { quadra },
    };
}

export function newQuadraSuccess(quadra) {
    return {
        type: '@quadra/NEW_QUADRA_SUCCESS',
        payload: { quadra },
    };
}