import  { create } from 'zustand'

export const useAuthStore= create ((set)=>({
      auth:{
        Username:'',
        active:false
      },
      setUsername:(name) => set((state) => ({auth : {...state.auth,Username:name}}))
}))