
import toast from 'react-hot-toast'
import {authentication} from './helper.js'

export async function usernamevalidate(values){
   const errors=usernameverify({},values);
   
   if(values.Username){
      const {status} = await authentication(values.Username)

      if(status !== 200){
         errors.exist = toast.error('user does not exist')
      }
   }
   return errors;
}

//password validate
export async function passwordvalidate(values){
    const errors=passwordverify({},values)
    return errors
}

export async function resetpasswordvalidation(values){
     const errors=passwordverify({},values)
     if(values.password !== values.confirm_pwd){
        errors.exist=toast.error("password not match...!")
     }
     return errors
}

export async function registervalidation(values){
    const errors=usernameverify({},values)
    passwordverify(errors,values)
    emailverify(errors,values)

    return errors
}

export async function profilevalidation(values){
 const errors=emailverify({},values);
 return errors
}

function passwordverify(errors={},values){
   const specialcharecters=/['!@#$%^7*()_+\-=\]{};':"\\|,.<>?~]/;
   if(!values.password){
    errors.password=toast.error("password required")
   }else if(values.password.includes(" ")){
      errors.password=toast.error("wrong password")
   }else if(values.password.length< 4 ){
      errors.password=toast.error("password must be more than 5 charecters")
   }else if(!specialcharecters.test(values.password)){
    errors.password=toast.error("password must have special charecters")
   }
   return errors
}


//username validate
function usernameverify(error={},values){
    if(!values.Username){
        error.Username=toast.error('User Name Required...!')
    }else if(values.Username.includes(" ")){
         error.Username=toast.error('Invalid Username...!')
         
    }
    return error
}

function emailverify(error={},values){
  if(!values.email){
      error.email=toast.error("Email Required...!");
  }else if(values.email.includes(" ")){
     error.email=toast.error("Wroang Email...!")
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
     error.email=toast.error("Invaild Email Address...!")

  }
  return error
}