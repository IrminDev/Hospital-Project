import React from 'react'

const ComboBox = ({options, handleChange, name, children, placeholder, required, disabled, value}) => {
  disabled = disabled ? disabled : false
  return (
    <div className=" rounded-lg w-[100%] px-[0.4rem] bg-zinc-300 grid grid-cols-10 items-center py-2 mb-5">
        {children}
        <select className=' w-full col-span-8 text-neutral-800 placeholder:text-neutral-700 bg-zinc-300 outline-none border-none text-lg"'
        onChange={handleChange}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        defaultValue='default'>
            <option disabled id='default' value="default">{placeholder}</option>
            {options?.map((option) => {
                const disabledOpt = option.disabled ? option.disabled : false
                return (
                <option disabled={disabledOpt} className='text-neutral-800' key={option.id} value={option.id}>{option.value}</option>
                )
            })}
        </select>
    </div>
  )
}

export default ComboBox