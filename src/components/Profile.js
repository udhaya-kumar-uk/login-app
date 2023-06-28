import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.pic.png'
import styles from '../styles/Username.module.css'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from "formik"
import {profilevalidation} from '../helper/validate'
import convertToBase64 from '../helper/convert'
import usefetch from '../hooks/hook.fetch'
import {updateuser} from '../helper/helper.js'


import extend from '../styles/Profile.module.css'

export default function Profile() {
 
      const [file,setfile]=useState()   
      const[{isLoading,apidata,serverError}]= usefetch()
      const navigate=useNavigate()
     const formik=useFormik({
      initialValues:{
        firstname: apidata?.firstname ||"",
        lastname: apidata?.lastname ||"",
        email: apidata?.email ||"",
        mobile: apidata?.mobile ||"",
        address: apidata?.address ||""
      },
      enableReinitialize:true,
      validate:profilevalidation,
      validateOnBlur:false,
      validateOnChange:false,
      onSubmit:async values => {
        values=await Object.assign(values,{profile:file || apidata?.profile|| ''})
        let updatepromise=updateuser(values)
        toast.promise(updatepromise,{
          loading:'updating',
          success:<b>update successfully</b>,
          error:<b>could not update</b>
        })
         
      }
     })

    const onUpload=async e => {
       const base64=await convertToBase64(e.target.files[0])
       setfile(base64)
    }   

     function userlogout(){
      localStorage.removeItem('token')
      navigate('/')
     }

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <div className='container mx-auto' >
     
        <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className='flex justify-center items-center h-screen-'> 
         <div className={`${styles.glass} ${extend.glass}`} style={{width:"45%"}} >
           <div className='title flex flex-col items-center'> 
             <h4 className='text-5xl font-bold' >Profile</h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-5' >
              You Can Update The Details
             </span>
           </div>
             <form className='py-1' onSubmit={formik.handleSubmit}>
               <div className='profile flex justify-center py-4'>
                <label htmlFor='profile'>
                <img src={apidata?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt='avatar' ></img>
                </label>
                   <input onChange={onUpload} type='file' id='profile' name='profile' />

               </div>
               <div className='textbox flex flex-col items-center gap-6'>
                 <div className='name flex w-3/4 gap-10'>
                 <input {...formik.getFieldProps('firstname')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='FirstName*'/>     
                 <input {...formik.getFieldProps('lastname')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='LastName*'/>
                 </div>
                 <div className='name flex w-3/4 gap-10'>
                 <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Mobile No*'/>     
                 <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Email*'/>
                 </div>
                 
                 <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Address*'/>     
                 <button  className={styles.btn} type='submit' >Register</button>
                 
                
                 
               </div>
                 <div className='text-center py-4'>
                  <span className='text-gray-500' >Come Back Later?<Link onClick={userlogout} className='text-red-500' to='/' >Logout</Link></span>
                 </div>
             </form>
         </div>
      </div>
    </div>
  )
}
