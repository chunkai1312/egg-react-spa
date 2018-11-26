import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'
import Cookies from 'js-cookie'

const SET_USER_DATA = 'SET_USER_DATA'
const SET_AUTHENTICATED = 'SET_AUTHENTICATED'

export const setUserData = createAction(SET_USER_DATA)
export const setAuthenticated = createAction(SET_AUTHENTICATED)

export const fetchUser = () => {
  return axios.get('/api/users/me', { headers: { 'Authorization': `Bearer ${Cookies.get('token')}` } })
    .then(res => Promise.resolve(res.data))
    .catch(error => Promise.reject(error))
}

export const updateUser = profile => dispatch => {
  return axios.put('/api/users/me', { headers: { 'Authorization': `Bearer ${Cookies.get('token')}` } })
    .then(res => Promise.resolve(res.data))
    .catch(error => Promise.reject(error))
}

export const clearAuth = () => dispatch => {
  Cookies.remove('token')
  dispatch(setUserData(null))
  dispatch(setAuthenticated(false))
}

export const login = credentials => dispatch => {
  return axios.post('/api/login', credentials).then(res => {
    Cookies.set('token', res.data.token)
    return fetchUser()
  })
    .then(data => {
      dispatch(setUserData(data))
      dispatch(setAuthenticated(true))
      return Promise.resolve(data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export const loginWithOauth = (token) => dispatch => {
  Cookies.set('token', token)
  return fetchUser()
    .then(data => {
      dispatch(setUserData(data))
      dispatch(setAuthenticated(true))
      return Promise.resolve(data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export const logout = cb => dispatch => {
  return axios.post('/api/logout')
    .then(response => {
      dispatch(clearAuth())
      cb()
    })
    .catch(anyError => {
      dispatch(clearAuth())
      cb()
    })
}

export const initAuthFromExistingToken = cb => dispatch => {
  const token = Cookies.get('token')
  if (!token) return cb()
  fetchUser()
    .then(data => {
      dispatch(setUserData(data))
      dispatch(setAuthenticated(true))
      cb(null, token)
    }).catch(err => {
      dispatch(clearAuth())
      cb(err)
    })
}

const initialState = {
  user: null,
  token: null,
  authenticated: false
}

export default handleActions({
  [SET_USER_DATA]: (state, action) => ({ ...state, user: action.payload }),
  [SET_AUTHENTICATED]: (state, action) => ({ ...state, authenticated: action.payload })
}, initialState)
