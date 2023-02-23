import React from 'react';

interface Props {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Container: React.FC<Props> = ({ children, showHeader, ...rest }) => {
  return (
    <main className=" flex flex-1 flex-col h-64 w-48 " {...rest}>
      {children}
    </main>
  );
};

export default Container;
