import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.pic.png'
import styles from '../styles/Username.module.css'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from "formik"
import {passwordvalidate} from '../helper/validate'
import usefetch from '../hooks/hook.fetch'
import {useAuthStore} from '../store/store.js'
import {verifypassword} from '../helper/helper.js'

export default function Password() {
     const navigate=useNavigate()
      const {Username}=useAuthStore(state => state.auth)
      const[{isLoading,apidata,serverError}]= usefetch(`/user/${Username}`)

     const formik=useFormik({
      initialValues:{
        password:'admin@123'
      },
      validate:passwordvalidate,
      validateOnBlur:false,
      validateOnChange:false,
      onSubmit:async values => {
         let loginpromise=verifypassword({Username,password:values.password})
         toast.promise(loginpromise,{
          loading:'checking',
          success:<b>Login successfully</b>,
          error:<b>password not match</b>
         })
         loginpromise.then(res=>{
          let {token}=res.data;
          localStorage.setItem('token',token)
          navigate('/profile')
         })
      }
     })

     if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
     if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <div className='container mx-auto' >
     
        <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className='flex justify-center items-center h-screen-'> 
         <div className={styles.glass} >
           <div className='title flex flex-col items-center'> 
             <h4 className='text-5xl font-bold' >hello {apidata?.firstname || apidata?.Username}</h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-5' >
              Explore More by Connecting With Us.
             </span>
           </div>
             <form className='py-1' onSubmit={formik.handleSubmit}>
               <div className='profile flex justify-center py-4'>
                  <img src={apidata?.profile || avatar} className={styles.profile_img} alt='avatar' ></img>
               </div>
               <div className='textbox flex flex-col items-center gap-6'>
                 <input {...formik.getFieldProps('password')} className={styles.textbox} type='text' placeholder='password'/>
                 <button  className={styles.btn} type='submit' >Sign In</button>
               </div>
                 <div className='text-center py-4'>
                  <span className='text-gray-500' >Forgot password<Link className='text-red-500' to='/recovery' >Recover Now</Link></span>
                 </div>
             </form>
         </div>
      </div>
    </div>
  )
}
