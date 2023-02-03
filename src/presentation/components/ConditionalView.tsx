import React from 'react';

interface Props {
  visible: boolean;
  children: React.ReactNode;
}

const ConditionalView: React.FC<Props> = ({ visible, children }) => {
  return <>{visible && children}</>;
};

export default ConditionalView;
