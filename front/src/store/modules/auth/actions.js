export function signInRequest(login, senha) {
    return {
      type: '@auth/SIGN_IN_REQUEST',
      payload: { login, senha },
    };
  }
  
export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function setError(error) {
  return {
    type: '@auth/SET_ERROR',
    payload: { error },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
