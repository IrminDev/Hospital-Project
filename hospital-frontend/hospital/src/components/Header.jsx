import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({children}) => {
  return (
    <div className=" fixed left-0 top-0 w-[100%] bg-blue-500 z-10 shadow-md">
        <div className=" ml-[1rem] mr-[1rem] h-[3rem] flex justify-between items-center min-[780px]:h-[4.5rem] min-[1024px]:w-[100%] min-[1024px]:px-[10%] min-[1024px]:justify-between">
            <Link to={'./'} className=" text-slate-200 text-2xl font-bold"><span className=" text-blue-900">H</span>ospital</Link>
            <div className="max-md:fixed max-md:bottom-0 max-md:left-0 max-md:bg-blue-500 max-md:shadow-[0_-1px_12px_hsla(207, 89%, 15%, 0.15)] max-md:w-[100%] max-md:h-[4rem] max-md:py-[1rem] max-md:grid max-md:content-center max-md:rounded-[1.25rem_1.25rem_0_0]">
                <ul className="flex justify-around sm:justify-center sm:gap-x-10">
                    {children}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header