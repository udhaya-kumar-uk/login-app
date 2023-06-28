import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN

export async function getusername(){
    const token=localStorage.getItem('token')
    if(!token) return Promise.reject("cannot find token")
    let decode=jwt_decode(token)
    return decode;

}

//athentication
export async function authentication(Username){
    try {
        return await axios.post("/api/authenticate",{Username})
    } catch (error) {
        return {error:"Username doesn't exist"}
    }
}

export async function getuser(Username){
    try {
       const{data}= await axios.get(`/api/user/${Username}`)
       return{data}
    } catch (error) {
        return {error:"password doesn't match"}
    }
}

export async function registeruser(credentials){
  try {
    const {data:{msg},status} = await axios.post(`/api/register`,credentials)
    let {Username,email}=credentials;

    if(status===201){
        await axios.post('/api/registermail',{Username,userEmail:email,text:msg})
    }
       return Promise.resolve(msg)
  } catch (error) {
    return Promise.reject({error})
  }
}

export async function verifypassword({Username,password}){
    try {
        if(Username){
            const{data}= await axios.post('/api/login',{Username,password})
            return Promise.resolve({data})
        }
    } catch (error) {
        return Promise.reject({error:"password doesn't match"})
    }
}

export async function updateuser(response){
   try {
     const token=await localStorage.getItem('token')
     const data=await axios.put('/api/updateuser',response,{headers:{"Authorization":`Bearer${token}`}})
     return Promise.resolve({data})
   } catch (error) {
    return Promise.reject({error:"couldn't update your profile"})
   }
}

export async function generateOTP(Username){
    try {
        const {data:{code},status}=await axios.get('/api/generateOTP',{params:{Username}})
        if(status===201){
            let {data:{email}}= await getuser({Username})
            let text=`your password recovery OTP is ${code}.verify and recover your password`
            await axios.post('/api/registermail',{Username,userEmail:email,text,subject:"password recovery OTP"})
        }
        return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({error})
    }
}

export async function verifyOTP({Username,code}){
    try {
         const {data,status}=await axios.get('/api/verifyOTP',{params:{Username,code}})
         return{data,status}
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function resetpassword({Username,password}){
   try {
       const{data,status}=await axios.put('/api/resetpassword',{Username,password})
       return Promise.resolve({data,status})
   } catch (error) {
     return Promise.reject({error})
   }
}