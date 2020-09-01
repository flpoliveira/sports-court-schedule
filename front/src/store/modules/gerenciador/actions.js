export function getGerenciadorRequest() {
    return {
      type: '@gerenciador/GET_GERENCIADOR_REQUEST',
    };
  }
  
export function getGerenciadorSuccess(gerenciador) {
    return {
        type: '@gerenciador/GET_GERENCIADOR_SUCCESS',
        payload: { gerenciador },
    };
}

export function newGerenciadorRequest(gerenciador) {
    return {
        type: '@gerenciador/NEW_GERENCIADOR_REQUEST',
        payload: { gerenciador },
    };
}

export function newGerenciadorSuccess(gerenciador) {
    return {
        type: '@gerenciador/NEW_GERENCIADOR_SUCCESS',
        payload: { gerenciador },
    };
}