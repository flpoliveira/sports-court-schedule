export function getUsuarioRequest() {
    return {
      type: '@usuario/GET_USUARIO_REQUEST',
    };
  }
  
export function getUsuarioSuccess(usuario) {
    return {
        type: '@usuario/GET_USUARIO_SUCCESS',
        payload: { usuario },
    };
}

export function newUsuarioRequest(usuario) {
    return {
        type: '@usuario/NEW_USUARIO_REQUEST',
        payload: { usuario },
    };
}

export function newUsuarioSuccess(usuario) {
    return {
        type: '@usuario/NEW_USUARIO_SUCCESS',
        payload: { usuario },
    };
}