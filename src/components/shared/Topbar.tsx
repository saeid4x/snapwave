import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/libs/appwrite/react-query/queriesAndMutations'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Topbar = () => {

  const {mutate: signOut ,isSuccess } = useSignOutAccount();
  const {user} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {

    /**
     * navigate(0): In this context, navigate(0) is equivalent to
     *  reloading the current page.  It tells React Router to navigate 
     * to the current path, essentially causing a reload or refresh of the current page.
     */
    if(isSuccess) navigate(0)
  } , [isSuccess])

  return (
    <section className='topbar'>
       
        <div className='flex-between py-4 px-5'>


            <Link to="/" className='flex gap-3 items-center '>
              <img src="/images/logo.svg" alt="logo" width={130} height={325}/>
            </Link>

            <div className='flex gap-4'>
              <button onClick={() => signOut()}>
                <img src="/icons/logout.svg" alt="logout" />
              </button>

              <Link to={`/profile/${user.id}`} className='flex-center gap-3 ' >
                <img src={user.imageUrl || '/images/profile-placeholder.svg'} alt="profile" className='h-8 w-8   rounded-full ' />              
              </Link>
            </div>





        </div>
    </section>
  )
}

export default Topbar