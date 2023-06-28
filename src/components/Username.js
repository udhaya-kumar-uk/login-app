import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.pic.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import {useFormik} from "formik"
import {usernamevalidate} from '../helper/validate'
import {useAuthStore} from '../store/store.js'

export default function Username() {
  
  const navigate=useNavigate()
  const setUsername = useAuthStore(state => state.setUsername)
  //const Username= useAuthStore(state => state.auth.Username)

  useEffect(()=>{
    console.log(Username)
  })

     const formik=useFormik({
      initialValues:{
        Username:''
      },
      validate:usernamevalidate,
      validateOnBlur:false,
      validateOnChange:false,
      onSubmit:async values => {
         setUsername(values.Username)
         navigate('password')
      }
     })
  return (
    <div className='container mx-auto' >
     
        <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className=' flex justify-center items-center h-screen-'> 
         <div className={styles.glass} >
           <div className='title flex flex-col items-center'> 
             <h4 className='text-5xl font-bold' >hello again</h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-5' >
              Explore More by Connecting With Us.
             </span>
           </div>
             <form className='py-1' onSubmit={formik.handleSubmit}>
               <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt='avatar' ></img>
               </div>
               <div className='textbox flex flex-col items-center gap-6'>
                 <input {...formik.getFieldProps('Username')} className={styles.textbox} type='text' placeholder='UserName'/>
                 <button  className={styles.btn} type='submit' >Let's Go!</button>
               </div>
                 <div className='text-center py-4'>
                  <span className='text-gray-500' >Not a Member<Link className='text-red-500' to='/register' >Register Now</Link></span>
                 </div>
             </form>
         </div>
      </div>
    </div>
  )
}
