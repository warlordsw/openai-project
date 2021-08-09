import { createContext, useContext, useReducer } from 'react'
import { movieState, enterMovieNameReducer } from './enterMovieNameReducer'
import { userRegisterReducer, userRegisterState } from './userRegisterReducer'
import { userSigninReducer, userSigninState } from './userSigninReducer'

const MaintStateContext = createContext()
const DispatchContext = createContext()

export const useMainState = () => {
  const context = useContext(MaintStateContext)
  if (context === undefined) {
    throw new Error('mainState must be used within a StoreProvider')
  }
  return context
}

export function useDispatch() {
  const context = useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useDispatch must be used within a StoreProvider')
  }

  return context
}

export const StoreProvider = ({ children }) => {
  const [stateRegister, dispatchRegister] = useReducer(
    userRegisterReducer,
    userRegisterState
  )
  const [stateSignin, dispatchSignin] = useReducer(
    userSigninReducer,
    userSigninState
  )

  const [stateMovie, dispatchMovie] = useReducer(
    enterMovieNameReducer,
    movieState
  )
  return (
    <MaintStateContext.Provider
      value={{ stateRegister, stateSignin, stateMovie }}
    >
      <DispatchContext.Provider
        value={{ dispatchRegister, dispatchSignin, dispatchMovie }}
      >
        {children}
      </DispatchContext.Provider>
    </MaintStateContext.Provider>
  )
}
