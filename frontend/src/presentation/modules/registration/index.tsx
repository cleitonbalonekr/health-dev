import React from 'react';
import { useParams } from 'react-router-dom';

const Registration: React.FC = () => {
  const { extensionId } = useParams();
  return (
    <div>
      <h1>OLA</h1>
      <p>{extensionId}</p>
    </div>
  );
};

export default Registration;
