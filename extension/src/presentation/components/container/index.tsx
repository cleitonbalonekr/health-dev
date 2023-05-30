import React from 'react'
import NavigationBar from '../navigation-bar'
interface Props {
  children: React.ReactNode
  showHeader?: boolean
}

const Container: React.FC<Props> = ({ children, showHeader, ...rest }) => {
  return (
    <main
      className="bg-teste flex flex-1 flex-col max-h-[440px] min-h-[440px] w-[280px] "
      {...rest}
    >
      {children}
      <NavigationBar />
    </main>
  )
}

export default Container
