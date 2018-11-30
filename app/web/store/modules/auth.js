import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'
import Cookies from 'js-cookie'

const SAVE_TOKEN = 'SAVE_TOKEN'
const SET_USER_DATA = 'SET_USER_DATA'
const CLEAR_AUTH = 'CLEAR_AUTH'

export const saveToken = createAction(SAVE_TOKEN)
export const clearAuth = createAction(CLEAR_AUTH)
export const setUserData = createAction(SET_USER_DATA)

export const login = token => dispatch => {
  return axios.get('/api/users/me', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => {
      Cookies.set('token', token)
      dispatch(saveToken(token))
      dispatch(setUserData(res.data))
    })
    .catch(() => dispatch(clearAuth()))
}

export const logout = cb => dispatch => {
  Cookies.remove('token')
  return axios.post('/api/logout')
    .then(() => dispatch(clearAuth()))
    .catch(() => dispatch(clearAuth()))
}

export const initAuthFromExistingToken = cb => dispatch => {
  const token = Cookies.get('token')
  if (!token) return cb()

  axios.get('/api/users/me', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => {
      dispatch(saveToken(token))
      dispatch(setUserData(res.data))
    })
    .catch(() => {
      dispatch(clearAuth())
    })
    .then(cb)
}

const initialState = {
  user: null,
  token: null,
  authenticated: false
}

export default handleActions({
  [SAVE_TOKEN]: (state, action) => ({ ...state, token: action.payload, authenticated: true }),
  [SET_USER_DATA]: (state, action) => ({ ...state, user: action.payload }),
  [CLEAR_AUTH]: (state, action) => ({ ...state, ...initialState })
}, initialState)
