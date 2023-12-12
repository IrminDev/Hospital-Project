import React from 'react'

const ButtonSubmit = ({text}) => {
  return (
        <div className="  w-[100%] flex items-center justify-around">
            <button type="submit" className=" w-full col-span-2 font-semibold text-white text-center bg-sky-600 rounded-xl py-2 ">{text}</button>
        </div>
    )
}

export default ButtonSubmit