import React from 'react'
import { Link } from 'react-router-dom'

const ButtonLink = ({url, text}) => {
  return (
    <div className="  w-[100%] flex items-center justify-around">
        <Link to={url} className=" w-full col-span-2 font-semibold text-white text-center bg-sky-600 rounded-xl py-2 ">{text}</Link>
    </div>
  )
}

export default ButtonLink