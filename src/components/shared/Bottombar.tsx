// rafce -> create component 

import { bottombarLinks } from '@/constants'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const Bottombar = () => {
  const {pathname} = useLocation()
  return (
    <section className='bottom-bar'>

    {bottombarLinks.map((link) => {

    // for get current active line and change background of leftSide menu
    const isActive = pathname === link.route ;

    return (
    
      <Link to={link.route} className={`  ${isActive && 'bg-primary-500 rounded-[10px] flex-center flex-col gap-1 p-2 transition'}`} key={link.label}>
        <img src={link.imgURL} alt={link.label} className={`  ${isActive && 'invert-white'}`} height={16} width={16} />
            <p className='tiny-medium  text-light-2'>{link.label}</p>
      </Link>

    
    )
    })}

        </section>
  )
}

export default Bottombar