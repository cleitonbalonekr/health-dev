import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const BaseButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`rounded-md bg-rose-600 hover:bg-rose-700 py-3 px-6 text-white ${rest.className}`}
    >
      {children}
    </button>
  );
};

export default BaseButton;
