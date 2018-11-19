const SET_LOADING = 'SET_LOADING'

export const setLoading = loading => ({ type: SET_LOADING, payload: loading })

const initialState = {
  loading: true
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}
