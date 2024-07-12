 
 
import { CreateUserAccount } from "../../libs/appwrite/api";
import Loader from "../../components/shared/Loader"
import { Button, Input } from '@nextui-org/react'
import React, { FormEvent, useEffect } from 'react'
import { Link } from "react-router-dom";
import {toast as toastify} from 'react-toastify'
import {   useCreateUserAccount, useSignInAccount  } from "../../libs/appwrite/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
 

const SignupForm = () => {

 

 

  const {mutateAsync:signInAccount , isPending:isSigningIn} = useSignInAccount();

  const {mutateAsync:createUserAccount , isPending: isCreatingUser} = useCreateUserAccount()
  const {checkAuthUser , isLoading:isUserLoading} = useUserContext();

  const navigate = useNavigate();

  // defint form 
  // const form = useForm({
  //   defaultValues:{
  //     name:'',
  //     username:'',
  //     email:'',
  //     password:''
  //   }
  // })
 
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // @ts-ignore
    const formData = new FormData(e.target)
    const data ={
      username:formData.get("username") as string,
      name:formData.get("name") as string,
      email:formData.get("email") as string,
      password:formData.get("password") as string
    }

    
      const newUser = await CreateUserAccount(data);
      if(!newUser){
        return toastify.error("Sign up failed, plaese try again")
      }

      const session = await signInAccount({
        email:data.email,
        password:data.password
      })

      if(!session){
        return toastify.error("Sign in failed, plaese try again")
      }

      const isLoggedIn = await checkAuthUser();
      if(isLoggedIn) {
        // form.reset();
        navigate('/');
      } else{
        return toastify.error('Sign in error. Please Try again...')
      }
       

  }

 

  return (
    <>
         <div className='sm:w-420 flex-center flex-col '>
                  <img src="/images/logo.svg" alt="" className="mt-10"/>

                  <h2 className='h3-bold md:h2-bold sm:pt-12 -mt-5'>عضویت در سایت </h2>
                  {/* <p className='text-blue-500 small-mediumm md:base-regular mt-4'>برای استفاده از SnapWave لطفا فرم زیر را کامل کنید</p> */}

            <form className='flex flex-col gap-5 w-full mt-4 ' onSubmit={handleSubmit}>

              <div className="">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">نام </label>
                <input type="text"  name="name"  className='shad-input rounded-md w-full' />                
              </div>


              <div className="">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">نام کاربری</label>
                <Input type="text"  name="username"   className='shad-input rounded-md' style={{direction:"ltr"}} />                
              </div>

              <div className="">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">ایمیل </label>
                <Input type="email" name="email" style={{direction:"ltr"}}  className='shad-input rounded-md px-2' />                
              </div>


              <div className="">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">کلمه عبور </label>
                <Input type="password" name="password" style={{direction:"ltr"}}  className='shad-input rounded-md px-2' />                
              </div>

             <Button type='submit' className='shad-button_primary rounded-md'>
               {
                isCreatingUser ? (
                  <div className='flex-center gap-2'>
                     <Loader />  Loading...
                  </div>
                ) : "عضویت"
               }
               </Button>

               <p className="text-small-regular tetx-light-2 text-center mt-2 ">
               قبلا حساب کاربری ایجاد کرده اید؟  &nbsp;
                <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1 "> ورود به حساب کاربری</Link>
               </p>




            </form>
         </div>
    </>
  )
}

export default SignupForm