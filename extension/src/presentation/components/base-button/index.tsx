import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const BaseButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      className="rounded-md bg-rose-600 hover:bg-rose-700 p-2 text-white"
      {...rest}
    >
      {children}
    </button>
  );
};

export default BaseButton;
