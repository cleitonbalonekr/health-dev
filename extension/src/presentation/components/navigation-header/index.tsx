import React from 'react';
import { FaChevronLeft, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  hideBackButton?: boolean;
  children?: React.ReactNode;
}

const NavigationHeader: React.FC<Props> = ({ hideBackButton, children }) => {
  const navigate = useNavigate();

  const handleNavigationBack = () => {
    navigate(-1);
  };
  return (
    <header className="flex  flex-row justify-between py-2 px-1 mb-1 bg-rose-500 rounded-b-sm">
      <div className="cursor-pointer">
        {!hideBackButton && (
          <FaChevronLeft
            size={18}
            color="white"
            onClick={handleNavigationBack}
          />
        )}
      </div>
      <div className="cursor-pointer">{children}</div>
    </header>
  );
};

export default NavigationHeader;
