import { createAction, handleActions } from 'redux-actions'

const SET_LOADING = 'app/SET_LOADING'

export const setLoading = createAction(SET_LOADING)

const initialState = {
  loading: true
}

export default handleActions({
  [SET_LOADING]: (state, action) => ({ ...state, loading: action.payload })
}, initialState)
