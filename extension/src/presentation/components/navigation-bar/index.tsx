import React, { useCallback } from 'react'
import { FaCog, FaClock, FaGlassWhiskey } from 'react-icons/fa'
import { IoIosAlbums} from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

const BUTTON_COLOR = {
  active: '#5454C2',
  inactive: '#545068',
}

const NavigationHeader: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const handleNavigate = (path:string) => {
    navigate(path)
  }
  const isActive = useCallback((path:string)=> {
    return location.pathname === path ? BUTTON_COLOR.active : BUTTON_COLOR.inactive
  },[location.pathname])
  
  return (
    <footer className="flex max-h-32 flex-row justify-evenly mt-2 py-4 px-1 rounded-lg border-t">
      <IoIosAlbums
        size={24}
        color={isActive('/notes')}
        onClick={()=>handleNavigate('/notes')}
      />
      <FaClock
        size={24}
        color={isActive('/')}
        onClick={()=>handleNavigate('/')}
      />
      <FaCog
        size={24}
        color={isActive('/settings')}
        onClick={()=>handleNavigate('/settings')}
      />
    </footer>
  )
}

export default NavigationHeader
