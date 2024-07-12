import React, { useState } from 'react'
import FileUploader from '../shared/FileUploader'
import { Models } from 'appwrite'
import { useCreatePost, useUpdatePost } from '@/libs/appwrite/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import {toast as toastify} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

type PostFormProps = {
    post?:Models.Document,
    action: 'Create' | 'Update'
}
const PostForm = ({post , action }:PostFormProps) => {

    const [file , setFile] = useState<File[]>([])

    const {mutateAsync: createPost , isPending: isLoadingCreate} = useCreatePost()
    const {mutateAsync:updatePost , isPending:isLoadingUpdate} = useUpdatePost();

    const {user} = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(post && action ==="Update"){
                  // @ts-ignore
              const formData = new FormData(e.target)
              //  const formData = new FormData()
              const data ={
                caption:formData.get("caption") as string,
                location:formData.get("location") as string,
                tags:formData.get("tags") as string,
                file
              }
          const updatedPost = await updatePost({
            ...data,
            postId:post.$id,
            imageId:post?.imageId,
            imageUrl:post?.imageUrl
          })

          if(!updatedPost) {
            return toastify.error("Please try again")
          }

          return navigate(`/posts/${post.$id}`)
        }
          // @ts-ignore
    const formData = new FormData(e.target)
    //  const formData = new FormData()
    const data ={
      caption:formData.get("caption") as string,
      location:formData.get("location") as string,
      tags:formData.get("tags") as string,
      file
    }


    console.log(data)

        const newPost = await createPost({
           ...data,
            userId:user.id
        })

        if(!newPost){
            return toastify.error("Please try again")
        }

        navigate("/");

    }

    const HandlePhotoUploadChange = (Files:File[]) => {
          setFile(Files)
    }
  return (
    <form className='flex flex-col gap-9 w-full max-w-5xl' onSubmit={handleSubmit}>

        <div className="">
            <label htmlFor="caption" className="block mb-2 text-sm font-medium text-white dark:text-white">کپشن پست</label>
            <input type="text"  name="caption"  className='shad-input rounded-md w-full  px-2' defaultValue={post?.caption} />                
        </div>

        {/* <div className="">
            <label htmlFor="caption" className="block mb-2 text-sm font-medium text-white dark:text-white">description</label>
            <textarea   name="caption"  className='shad-textarea custom-scrollbar w-full' value={post?.desc} > </textarea>
        </div> */}

        <div className="">
            <label htmlFor=" " className="block mb-2 text-sm font-medium text-white dark:text-white"> افزودن تصویر یا ویدیو</label>
              <FileUploader 
                fieldChange={HandlePhotoUploadChange}
                mediaUrl={post?.imageUrl}
              />

          </div>


          <div className="">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-white dark:text-white">لوکیشن </label>
            <input type="text"  name="location"  className='shad-input rounded-md w-full px-2' defaultValue={post?.location} />                
          </div>

          
          <div className="">
            <label htmlFor="tags" className="block mb-2 text-sm font-medium text-white dark:text-white"> افزودن تگ ( تگ ها را با کاما از یکدیگر جدا کنید)</label>
            <input type="text"  name="tags"  className='shad-input rounded-md w-full px-2' placeholder='برنامه نویسی , پایگاه داده , بلاکچین , طبیعت' defaultValue={post?.tags} />                
        </div>


        <div className='flex gap-4 items-center justify-end'>
            <button type='button' className='p-2 px-5 text-center bg-slate-600 text-white rounded-md'>لغو</button>
            <button type='submit' className=' p-2 px-10 text-center bg-primary-600 text-white rounded-md'
            disabled={isLoadingCreate || isLoadingUpdate}
            > 
            {isLoadingCreate || isLoadingUpdate && 'Loading...'}
            {action === 'Create' ? 'ایجاد' : 'ویرایش'} پست 
            </button>
        </div>

    </form>
  )
}

export default PostForm