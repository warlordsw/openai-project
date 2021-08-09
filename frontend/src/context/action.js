import axios from 'axios'

export const register = async (dispatch, name, email, password) => {
  dispatch({ type: 'USER_REGISTER_REQUEST', payload: { email, password } })
  try {
    const { data } = await axios.post('/api/users/register', {
      name,
      email,
      password,
    })
    if (!data.message) {
      dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const signin = async (dispatch, email, password) => {
  dispatch({ type: 'USER_SIGNIN_REQUEST', payload: { email, password } })
  try {
    const { data } = await axios.post('/api/users/signin', {
      email,
      password,
    })
    dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: 'USER_SIGNIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const setMovie = async (dispatch, movieText, token) => {
  dispatch({ type: 'SET_MOVIE_REQUEST', payload: { movieText } })
  try {
    const { data } = await axios.post(
      '/api/users/openai',
      { movieText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!data.message) {
      dispatch({ type: 'SET_MOVIE_SUCCESS', payload: data })
    }
  } catch (error) {
    dispatch({
      type: 'SET_MOVIE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const signout = (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: 'USER_SIGNOUT' })
}
