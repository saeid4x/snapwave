import { useUserContext } from '@/context/AuthContext'
import { multiFormatDateString } from '@/libs/utils'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'


type PostCardProps = {
    post:Models.Document
}
const PostCard = ({post}:PostCardProps) => {

    const {user} = useUserContext();
    // if(!post.creator) return;
  return (
    <div className='post-card'>
     <div className="flex-between">
        <div className='flex items-center gap-3'>
            <Link to={`/profile/${post.creator.$id}`}>
              <img src={post?.creator?.imageUrl || '/icons/profile-placeholder.svg'} 
                   alt="creator"
                   className='rounded-full w-12 lg:w-12 '
                   />
            </Link>

            <div className='flex flex-col '>
                <p className='base-medium lg:body-bold text-light-1'>{post.creator.name}</p>
                <div className='flex-center gap-2 text-light-3 '>
                    <p className='subtle-semibold lg:small-regular'>
                    {multiFormatDateString(post.$createdAt)}
                    </p> -
                    <p className='subtle-semibold lg:small-regular'>
                        {post.location}
                    </p>


                </div>
            </div>
        </div>

        <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id && 'hidden'}`}>
          <img src="icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
     </div>

     <Link to={`/posts/${post.$id}`} >
        <div className='small-medium  lg:base-medium py-5 '>
            <p>{post.caption}</p>          
            <ul className='flex gap-1 mt-2 '>
                {
                    post.tags.map((tag:string) => (
                        <li key={tag} className='text-light-3 '>
                            #{tag}
                        </li>
                    ))
                }
            </ul>
        </div>  

        <img src={post.imageUrl || '/icons/profile-placeholder.svg'} 
             className='post-card_img' 
             alt="post image" />   
     </Link>

     <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard