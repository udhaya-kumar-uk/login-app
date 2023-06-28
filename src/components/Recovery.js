import React, { useEffect, useState } from 'react'
import styles from '../styles/Username.module.css'
import {Toaster, toast} from 'react-hot-toast'
import {useAuthStore} from '../store/store.js'
import { generateOTP,verifyOTP } from '../helper/helper.js'
import { useNavigate } from 'react-router-dom'

export default function Recovery() {
    
    const{Username}=useAuthStore(state => state.auth);
    const[OTP,setOTP]=useState()
    const navigate=useNavigate()

    useEffect(()=>{
       generateOTP(Username).then((OTP)=>{
        if(OTP) return toast.success('OTP has been send your email')
         return toast.error("problem while generatin OTP")
       })
    },[Username])

     async function onsubmit(e){
      e.preventDefault();
      try {
        let{status}=await verifyOTP({Username,code:OTP})
        if(status===201){
          toast.success('verify successfully')
          return navigate('/reset')
        }
      } catch (error) {
        return toast.error('wrong OTP check email again')
      }  
     }

     function resendotp(){
      let sendpromise=generateOTP(Username);

      toast.promise(sendpromise,{
        loading:'sendding',
        success:<b>OTP has been send your email</b>,
        error:<b>could not send it</b>
      })
      sendpromise.then(OTP =>{
        
      })
     }
      
  return (
    <div className='container mx-auto' >
     
        <Toaster position='top-center' reverseOrder={false} ></Toaster>

      <div className='flex justify-center items-center h-screen-'> 
         <div className={styles.glass} >
           <div className='title flex flex-col items-center'> 
             <h4 className='text-5xl font-bold' >Recovery</h4>
             <span className='py-4 text-xl w-2/3 text-center text-gray-5' >
               Enter OTP To Recover Password
             </span>
           </div>
             <form className='pt-20' onSubmit={onsubmit}>
              
               <div className='textbox flex flex-col items-center gap-6'>
                <div className='input text-center'>
                <span className='py-4 text-sm text-left text-gray-500'>
                  Enter 6 Digit OTP Sent Your Email Address.
                 </span>
                 <input  onChange={(e)=> setOTP(e.target.value)} className={styles.textbox} type='text' placeholder='Enter OTP'/>
                </div>
                 <button  className={styles.btn} type='submit' >Recover</button>
               </div>
                
             </form>
                  <div className='text-center py-4'>
                  <span className='text-gray-500' >Can't Get OTP? <button onClick={resendotp} className='text-red-500'>Resend</button></span>
                  </div>
         </div>
      </div>
    </div>
  )
}
