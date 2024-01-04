import React from 'react'

const TextArea = ({placeholder, handleChange, required, name, value}) => {
  return (
    <div className=" rounded-lg w-[100%] px-[0.4rem] bg-zinc-300 grid grid-cols-10 items-center py-2 mb-5">
        <textarea className=" resize-none col-span-9 text-neutral-800 placeholder:text-neutral-700 bg-zinc-300 outline-none border-none text-lg font-semibold"
        type='text'
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        />
    </div>
  )
}

export default TextArea