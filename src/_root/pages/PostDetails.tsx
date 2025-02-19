import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/libs/appwrite/react-query/queriesAndMutations';
import { multiFormatDateString } from '@/libs/utils';
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostDetails = () => {

  const {id} = useParams();
  const {data:post , isPending} = useGetPostById(id || '');
  const {user} = useUserContext();

  const handleDeletePost = () => {

  }
  return (
    <div className='post_details-container'> 
      {
        isPending ? <Loader /> : (
          <div className='post_details-card'>
            <img src={post?.imageUrl}  alt="post" className='post_details-img' />

            
              <div className='post_details-info'>
                <div className='flex-between  w-full'>
                    <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3 '>
                      <img src={post?.creator?.imageUrl || '/icons/profile-placeholder.svg'} 
                          alt="creator"
                          className='rounded-full w-8 h-8  lg:w-12 lg:h-12 '
                          />
                  

                    <div className='flex flex-col '>
                        <p className='base-medium lg:body-bold text-light-1'>{post?.creator.name}</p>
                        <div className='flex-center gap-2 text-light-3 '>
                            <p className='subtle-semibold lg:small-regular'>
                            {multiFormatDateString(post?.$createdAt)}
                            </p> -
                            <p className='subtle-semibold lg:small-regular'>
                                {post?.location}
                            </p>


                        </div>
                    </div>

                    </Link>

                    <div className='flex-center gap-2 '>
                      <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                       <img src="/icons/edit.svg" alt="edit post " width={24} height={24}/>
                      </Link>

                      <button
                       onClick={handleDeletePost}
                       className={`${user.id !== post?.creator.$id && 'hidden'} p-2 text-center  text-white rounded-md`}
                      >
                        <img src="/icons/delete.svg" alt="delete post" width={24} height={24} />

                      </button>
                    </div>

                </div>

                <hr className='border w-full  border-dark-4/80' />

                <div className='flex flex-col justify-between flex-1 w-full small-medium lg:base-regular  '>
                    <p className='leading-[35px]'>{post?.caption}</p>          
                    <ul className='flex gap-1 mt-2 '>
                        {
                            post?.tags.map((tag:string) => (
                                <li key={tag} className='text-light-3 '>
                                    #{tag}
                                </li>
                            ))
                        }
                     </ul>
                  </div>  

                  <div className='w-full '>
                    {/* @ts-ignore */}
                    <PostStats post={post} userId={user.id} />
                  </div>

        </div>        
          </div>
        )
      }

    </div>
  )
}

export default PostDetails