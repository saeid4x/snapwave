import PostForm from '@/components/forms/PostForm'
import React from 'react'

const CreatePost = () => {
  return (
    <div className='flex flex-1 '> 
      <div className="common-container">
        <div className='max-w-5xl flex-start gap-3   justify-start  w-full'>
          <h2 className='h3-bold md:h2-bold text-right w-full'> ایجاد پست جدید </h2>
          <img src="/icons/add-post.svg" alt="add" width={36} height={36} />
        </div>

        <PostForm action='Create'/>
      </div>
    </div>
  )
}

export default CreatePost