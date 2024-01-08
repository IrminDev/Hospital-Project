import React from 'react'

const Input = ({children, type, placeholder, name, required, handleChange, disabled, min, max, value, maxlength}) => {
  disabled = disabled ? disabled : false
  return (
    <div className=" rounded-lg w-[100%] px-[0.4rem] bg-zinc-300 grid grid-cols-10 items-center py-2 mb-5">
        {children}
        <input className=" col-span-9 text-neutral-800 placeholder:text-neutral-700 bg-zinc-300 outline-none border-none text-lg font-semibold"
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        value={value}
        min={min}
        maxLength={maxlength}
        max={max}
        name={name} />
    </div>
  )
}

export default Input