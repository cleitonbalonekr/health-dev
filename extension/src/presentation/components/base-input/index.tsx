import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  label?: string
}

const BaseInput: React.FC<Props> = ({ children,label, ...rest }) => {
  return (
    <div className="m-2 flex flex-1 flex-col">
      <label className="text-white">{label}</label>
      <input
        {...rest}
        className={`p-2 flex flex-1 rounded cursor-pointer text-gray-700 border-none ${rest.className}`}
      />
      {children}
    </div>
  )
}

export default BaseInput
