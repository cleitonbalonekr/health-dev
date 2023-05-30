import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
}

const BaseInput: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <div className="m-2 flex flex-row items-center justify-center ">
      <input
        className="p-2 flex-1 rounded cursor-pointer text-gray-700 border-none"
        {...rest}
      />
      {children}
    </div>
  )
}

export default BaseInput
