import React from 'react';

interface Props {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Container: React.FC<Props> = ({ children, showHeader, ...rest }) => {
  return (
    <main className=" flex flex-1 flex-col h-[561px] w-[350px] " {...rest}>
      {children}
    </main>
  );
};

export default Container;
