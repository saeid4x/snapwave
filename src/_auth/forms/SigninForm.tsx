 
 
import { CreateUserAccount } from "../../libs/appwrite/api";
import Loader from "../../components/shared/Loader"
import { Button, Input } from '@nextui-org/react'
import React, { FormEvent, useEffect } from 'react'
import { Link } from "react-router-dom";
import {toast as toastify} from 'react-toastify'
import {    useSignInAccount  } from "../../libs/appwrite/react-query/queriesAndMutations";
import { useUserContext } from "../../../src/context/AuthContext";
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
 

const SigninForm = () => {

 

 

  const {mutateAsync: signInAccount , isPending} = useSignInAccount();

 
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

    
      // const newUser = await CreateUserAccount(data);
      // if(!newUser){
      //   return toastify.error("Sign up failed, plaese try again")
      // }

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

  useEffect(() => {
    console.log('signup form ')
  } , [])

  return (
    <>
         <div className='sm:w-420 flex-center flex-col '>
                  <img src="/images/logo.svg" alt="" />

                  <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12 '>Log in to your account</h2>
                  <p className='text-light-3 small-mediumm md:base-regular'>Welcome back! Please enter your details</p>

            <form className='flex flex-col gap-5 w-full mt-4 ' onSubmit={handleSubmit}>

              
              <div className="">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
                <Input type="email" name="email"  className='shad-input rounded-md' />                
              </div>


              <div className="">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                <Input type="password" name="password"  className='shad-input rounded-md' />                
              </div>

             <Button type='submit' className='shad-button_primary rounded-md'>
               {
                isUserLoading ? (
                  <div className='flex-center gap-2'>
                     <Loader />  Loading...
                  </div>
                ) : "Sign in"
               }
               </Button>

               <p className="text-small-regular tetx-light-2 text-center mt-2 ">
               Don't have an Account?
                <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1 ">Sign Up</Link>
               </p>




            </form>
         </div>
    </>
  )
}

export default SigninForm