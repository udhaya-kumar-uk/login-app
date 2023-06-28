import axios from "axios";
import { useEffect, useState } from "react";
import {getusername} from '../helper/helper.js'

axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;

export default function Usefetch(query){
    const [getdata,setdata]=useState({isLoading:false,apidata:undefined,status:null,serverError:null})

    useEffect(() =>{
        
        const fetchdata=async ()=>{
            try {
                setdata(prev =>({...prev,isLoading:true}))
                const{Username}= !query? await getusername() : ''
                const {data,status}=!query ? await axios.get(`api/user/${Username}`) : await axios.get(`/api/${query}`)
                
                if(status===201){
                   setdata(prev => ({...prev,isLoading:false}));
                   setdata(prev => ({...prev,apidata:data,status:status}))
                }
                 setdata (prev => ({...prev,isLoading:false}))
            } catch (error) {
                setdata(prev => ({...prev,isLoading:false,serverError:error}))
            }
        }
        fetchdata()
    },[query])
    return [getdata,setdata]
}