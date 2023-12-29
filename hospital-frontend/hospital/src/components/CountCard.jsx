import React from 'react'

const CountCard = ({count, text}) => {
  return (
    <div className=' w-25 p-4 rounded-lg bg-sky-600 flex flex-col items-center justify-evenly'>
        <h1 className='text-white text-3xl font-bold'>{count}</h1>
        <p className='text-white text-md font-normal'>{text}</p>
    </div>
  )
}

export default CountCard