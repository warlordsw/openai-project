import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { signin } from '../context/action'
import { useDispatch, useMainState } from '../context/context'

const SignInPage = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { dispatchSignin } = useDispatch()
  const { stateSignin } = useMainState()
  const { dispatchRegister } = useDispatch()
  const { userInfo } = stateSignin
  const [error, setError] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    signin(dispatchSignin, email, password)
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push('/')
    }
  }, [userInfo, props.history])

  useEffect(() => {
    setError(stateSignin.error)
    dispatchRegister({ type: 'USER_REGISTER_RESET' })
    const timeout = setTimeout(() => {
      setError('')
    }, 2000)
    return () => clearTimeout(timeout)
  }, [stateSignin.error, dispatchRegister])

  return (
    <form onSubmit={submitHandler} className='autosize m-auto px-20'>
      <div className='form-control p-4'>
        <label className='label'>
          <span className='label-text '>Email</span>
        </label>
        <input
          required
          type='email'
          id='email'
          placeholder='Enter Email...'
          className='input input-bordered'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-control p-4'>
        <label className='label'>
          <span className='label-text '>Password</span>
        </label>
        <input
          required
          id='password'
          type='password'
          placeholder='Enter Password...'
          className='input input-bordered'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error ? (
        <div className='alert alert-error'>
          <div className='flex-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-6 h-6 mx-2 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
              ></path>
            </svg>
            <label>{error}</label>
          </div>
        </div>
      ) : (
        <div className='p-4 h-14 form-control'>{error}</div>
      )}
      <div className='p-4 form-control'>
        <button type='submit' className='btn btn-primary '>
          Login
        </button>
      </div>
      <div className='p-4'>
        <label />
        <div>
          New customer?{' '}
          <Link className='link link-primary' to='/register'>
            Create your account
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignInPage
