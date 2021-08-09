import React, { useEffect, useState } from 'react'
import { setMovie } from '../context/action'
import { useDispatch, useMainState } from '../context/context'

const MovieToEmoji = () => {
  const [movieName, setMovieName] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { dispatchMovie } = useDispatch()
  const { stateSignin } = useMainState()
  const { userInfo } = stateSignin
  const { stateMovie } = useMainState()

  const submitHandler = (e) => {
    e.preventDefault()
    setMovie(dispatchMovie, movieName, userInfo.token)
    setName(movieName)
    setMovieName('')
  }

  useEffect(() => {
    setError(stateMovie.error)
    const timeout = setTimeout(() => {
      setError('')
    }, 2000)
    return () => clearTimeout(timeout)
  }, [stateMovie.error])

  return (
    <div className='autosize m-auto px-20'>
      <form onSubmit={submitHandler} className='form-control'>
        <label className='label'>
          <span className='label-text'>Enter a Movie Name </span>
        </label>
        <div className='relative'>
          <input
            value={movieName}
            required
            id='movieName'
            maxLength='50'
            type='text'
            placeholder='Enter Movie Name...'
            className='w-full pr-16 input input-primary input-bordered'
            onChange={(e) => setMovieName(e.target.value)}
          />
          <button
            type='submit'
            className='absolute top-0 right-0 rounded-l-none btn btn-primary'
          >
            go
          </button>
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
        {stateMovie.error ? (
          <div className='m-auto p-20 '></div>
        ) : stateMovie.loading ? (
          <div className='m-auto p-20 '>Loading ...</div>
        ) : (
          stateMovie.movieText && (
            <div className='m-auto p-20 '>
              {name}: {stateMovie.movieText}
            </div>
          )
        )}
      </form>
    </div>
  )
}

export default MovieToEmoji
