import React from 'react';
import {  FaCog, FaClock, FaGlassWhiskey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  hideBackButton?: boolean;
  children?: React.ReactNode;
}

const NavigationHeader: React.FC<Props> = ({  }) => {
  const navigate = useNavigate();

  const handleNavigateTo= (to:string) => {
    navigate(to)
  };
  return (
    <footer className="flex  flex-row justify-evenly pb-4 px-1">
      <FaGlassWhiskey
            size={24}
            color="#545068"
            onClick={()=>handleNavigateTo('')}
      />    
      <FaClock
            size={24}
            color="#545068"
            onClick={()=>handleNavigateTo('/')}
      />      
      <FaCog
            size={24}
            color="#545068"
            onClick={()=>handleNavigateTo('settings')}
      />
    </footer>
  );
};

export default NavigationHeader;
