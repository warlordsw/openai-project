import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from '../context/context'

const Services = () => {
  const { dispatchMovie } = useDispatch()

  useEffect(() => {
    dispatchMovie({ type: 'SET_MOVIE_RESET' })
  }, [dispatchMovie])

  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='btn btn-primary w-1/2 p-2 m-2'>
        <Link className='flex flex-grow justify-center' to='/movietoemoji'>
          Movie To Emoji
        </Link>
      </div>
      <div className='btn btn-primary w-1/2 p-2 m-2'>
        <Link className='flex flex-grow justify-center' to='/'>
          Other Service
        </Link>
      </div>
      <div className='btn btn-primary w-1/2 p-2 m-2'>
        <Link className='flex flex-grow justify-center' to='/'>
          Other Service
        </Link>
      </div>
    </div>
  )
}

export default Services
