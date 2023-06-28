import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.pic.png'
import styles from '../styles/Username.module.css'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from "formik"
import {registervalidation} from '../helper/validate'
import convertToBase64 from '../helper/convert'
import {registeruser} from '../helper/helper.js'

export default function Register() {

      const navigate=useNavigate()
      const [file,setfile]=useState()   

     const formik=useFormik({
      initialValues:{
        email:"",
        Username:"",
        password:""
      },
      validate:registervalidation,
      validateOnBlur:false,
      validateOnChange:false,
      onSubmit:async values => {
        values=await Object.assign(values,{profile:file || ''})
        let registerpromise=registeruser(values)
        toast.promise(registerpromise,{
          loading:'Creating...',
          success:<b>register successfully</b>,
          error:<b>Register could not found</b>
        })

        registerpromise.then(function(){navigate('/')})
      }
     })

    const onUpload=async e => {
       const base64=await convertToBase64(e.target.files[0])
       setfile(base64)
    }   

  return (
    <div className='container mx-auto' >
     
        <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className='flex justify-center items-center h-screen-'> 
         <div className={styles.glass} style={{width:"45%",paddingTop:'3rem'}} >
           <div className='title flex flex-col items-center'> 
             <h4 className='text-5xl font-bold' >Register Now</h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-500' >
              Happy To Join You
             </span>
           </div>
             <form className='py-1' onSubmit={formik.handleSubmit}>
               <div className='profile flex justify-center py-4'>
                <label htmlFor='profile'>
                <img src={ file || avatar} className={styles.profile_img} alt='avatar' ></img>
                </label>
                   <input onChange={onUpload} type='file' id='profile' name='profile' />

               </div>
               <div className='textbox flex flex-col items-center gap-6'>
                 <input {...formik.getFieldProps('email')} className={styles.textbox} type='text' placeholder='Email*'/>
                 <input {...formik.getFieldProps('Username')} className={styles.textbox} type='text' placeholder='UserName*'/>
                 <input {...formik.getFieldProps('password')} className={styles.textbox} type='text' placeholder='password*'/>
                 <button  className={styles.btn} type='submit' >Register</button>
               </div>
                 <div className='text-center py-4'>
                  <span className='text-gray-500' >Already Register<Link className='text-red-500' to='/' >Login Now</Link></span>
                 </div>
             </form>
         </div>
      </div>
    </div>
  )
}
