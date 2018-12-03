import { createAction, handleActions } from 'redux-actions'

const SET_LOADING = 'app/SET_LOADING'

export const setLoading = createAction(SET_LOADING)

export default handleActions({
  [SET_LOADING]: (state, action) => ({ ...state, loading: action.payload })
}, { loading: true })
