import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './context/action'
import { useDispatch, useMainState } from './context/context'
import HomePage from './Pages/HomePage'
import MovieToEmoji from './Pages/MovieToEmoji'
import RegisterPage from './Pages/RegisterPage'
import Services from './Pages/Services'
import SignInPage from './Pages/SignInPage'

function App() {
  const { dispatchSignin } = useDispatch()
  const { stateSignin } = useMainState()
  const { userInfo } = stateSignin
  const { dispatchMovie } = useDispatch()

  const signoutHandler = () => {
    signout(dispatchSignin)
    dispatchMovie({ type: 'SET_MOVIE_RESET' })
  }

  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header className='px-4 text-white bg-gray-700 row'>
          {userInfo ? (
            <>
              <div>
                <Link className='text-xl font-bold ' to='/'>
                  Memoji
                </Link>
              </div>
              <div>
                <div>{userInfo.name}</div>
              </div>
              <div>
                <Link to='/' onClick={signoutHandler}>
                  Sign Out
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link className='text-xl font-bold ' to='/'>
                  Memoji
                </Link>
              </div>
              <div>
                <Link to='/signin'>Sign In</Link>
              </div>
            </>
          )}
        </header>
        <main>
          <Route
            path='/'
            component={userInfo ? Services : HomePage}
            exact
          ></Route>
          <Route path='/movietoemoji' component={MovieToEmoji}></Route>
          <Route path='/signin' component={SignInPage}></Route>
          <Route path='/register' component={RegisterPage}></Route>
        </main>
        <footer className='flex justify-center items-center text-white bg-gray-700'>
          All right reserved
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
