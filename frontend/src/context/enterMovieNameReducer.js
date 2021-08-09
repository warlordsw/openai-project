export const movieState = {}

export const enterMovieNameReducer = (userSigninState, action) => {
  switch (action.type) {
    case 'SET_MOVIE_REQUEST':
      return {
        loading: true,
      }
    case 'SET_MOVIE_SUCCESS':
      return {
        loading: false,
        movieText: action.payload,
      }
    case 'SET_MOVIE_FAIL':
      return { loading: false, error: action.payload }
    case 'SET_MOVIE_RESET':
      return {}
    default:
      return userSigninState
  }
}
