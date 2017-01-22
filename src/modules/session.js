import { push } from 'react-router-redux'

export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAIL = 'SESSION_LOGIN_FAIL';

/**
 * Actions
 */
export function loginSuccess(value) {
  return {
    type: SESSION_LOGIN_SUCCESS,
    payload: value
  }
}

export function loginFail(value) {
  return {
    type: SESSION_LOGIN_FAIL,
    payload: value
  }
}

export const loginAsync = (loginObj) => {
  console.log('loginAsync', loginObj);
  return async (dispatch, getState) => {
    let loginToken = await new Promise((resolve) => {
      setTimeout( () => {
        resolve()
      }, 200)
    }).then ( () => {

      if (loginObj.username === 'admin' && loginObj.password === 'admin') {
        return 'mockedToken'
      } else {
        return 'invalid'
      }
    })

    console.log(loginToken);
    if (loginToken !== 'invalid') {
      dispatch(loginSuccess(loginToken))
      dispatch(push('/dashboard'))
    } else {
      dispatch(loginFail(loginToken))
    }
  }
}

/**
 * Action Handers
 */

const ACTION_HANDERS = {
  [SESSION_LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      loginToken: action.payload,
      isNotLoggedIn: false
    }
  },
  [SESSION_LOGIN_FAIL]: (state, action) => {
    return {
      ...state,
      loginToken: action.payload
    }
  }
}

/**
 * Reducer
 */

const initialState = {
  count: 0,
  isNotLoggedIn: true,
  loginToken: 'none'
}

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDERS[action.type]

  return handler? handler(state, action): state
}
