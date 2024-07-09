import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar';
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex    '> 
      <Topbar />

      {/* only display on desktop. not display on mobile */}
      <LeftSidebar />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>

    {/* only display on mobile. not display on desktop */}
      <Bottombar />

    </div>
  )
}

export default RootLayout