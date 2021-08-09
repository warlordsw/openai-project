import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../context/action'
import { useDispatch, useMainState } from '../context/context'

const RegisterPage = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { dispatchRegister } = useDispatch()
  const { dispatchSignin } = useDispatch()
  const { stateRegister } = useMainState()
  const { userInfo } = stateRegister

  //const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
    } else {
      register(dispatchRegister, name, email, password)
    }
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push('/')
    }
  }, [userInfo, props.history])

  useEffect(() => {
    setError(stateRegister.error)
    dispatchSignin({ type: 'USER_SIGNIN_RESET' })
    const timeout = setTimeout(() => {
      setError('')
    }, 2000)
    return () => clearTimeout(timeout)
  }, [stateRegister.error, dispatchSignin])

  return (
    <form onSubmit={submitHandler} className='autosize m-auto px-20'>
      <div className='form-control p-4'>
        <label className='label'>
          <span className='label-text '>Name</span>
        </label>
        <input
          required
          id='name'
          type='text'
          placeholder='Enter Name...'
          className='input input-bordered'
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-control p-4'>
        <label className='label'>
          <span className='label-text '>Email</span>
        </label>
        <input
          required
          id='email'
          type='email'
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
      <div className='form-control p-4'>
        <label className='label'>
          <span className='label-text '>Confirm Password</span>
        </label>
        <input
          required
          id='confirmPassword'
          type='password'
          placeholder='Confirm Password...'
          className='input input-bordered'
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Register
        </button>
      </div>
      <div className='p-4'>
        <label />
        <div>
          Already have an account?{' '}
          <Link className='link link-primary' to='/signin'>
            Sign In
          </Link>
        </div>
      </div>
    </form>
  )
}

export default RegisterPage
