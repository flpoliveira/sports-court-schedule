export function getBlocoRequest() {
    return {
      type: '@bloco/GET_BLOCO_REQUEST',
    };
  }
  
export function getBlocoSuccess(bloco) {
    return {
        type: '@bloco/GET_BLOCO_SUCCESS',
        payload: { bloco },
    };
}

export function newBlocoRequest(bloco) {
    return {
        type: '@bloco/NEW_BLOCO_REQUEST',
        payload: { bloco },
    };
}

export function newBlocoSuccess(bloco) {
    return {
        type: '@bloco/NEW_BLOCO_SUCCESS',
        payload: { bloco },
    };
}