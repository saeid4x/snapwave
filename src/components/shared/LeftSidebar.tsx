import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/libs/appwrite/react-query/queriesAndMutations'
import { INavLink } from '@/types';
import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const LeftSidebar = () => {
  const {mutate:signOut , isSuccess} = useSignOutAccount();
  const {user} = useUserContext();

  const navigate = useNavigate();

  // for get current active line and change background of leftSide menu
  const {pathname} = useLocation();

  useEffect(() => {
    if(isSuccess) navigate(0);
  } , [isSuccess])

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>

        <Link to="/" className="flex gap-3 items-center  ">
            <img src="images/logo.svg" alt="" width={170}  height={36}/>
            

        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img src={user.imageUrl || '/icons/profile-placeholder.svg'} 
              alt="profile" className='h-14 w-14 rounded-full ' />

              <div className='flex flex-col '>
                <p className='body-bold'>{user.name}</p>
                <p className='small-regular text-light-3'>@{user.username}</p>
              </div>
                
        </Link>

        <ul className='flex flex-col gap-6 '>
          {sidebarLinks.map((link:INavLink) => {

             // for get current active line and change background of leftSide menu
            const isActive = pathname === link.route ;

            return (
              <li className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`} key={link.label}>
                <NavLink to={link.route} className="flex gap-4 items-center p-4 " >
                  <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                  {link.label}
                </NavLink>

              </li>
            )
          })}
        </ul>




        
      </div>

          <button onClick={() => signOut()} className='shad-button_ghost mt-10'>
              <img src="/icons/logout.svg" alt="logout" />
              <p className='small-medium lg:base-medium '>
                خروج
              </p>
          </button>

    </nav>
  )
}

export default LeftSidebar