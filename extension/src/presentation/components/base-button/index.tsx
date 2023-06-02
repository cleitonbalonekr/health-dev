import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const BaseButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`text-white items-center justify-center font-medium py-2 px-4 rounded-lg bg-buttonPrimary hover:opacity-70 ${rest.className}`}
    >
      {children}
    </button>
  )
}

export default BaseButton
