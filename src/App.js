import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

//components
import Username from './components/Username'
import Reset from './components/Reset'
import Register from './components/Register'
import Recovery from './components/Recovery'
import Profile from './components/Profile'
import Password from './components/Password'
import PageNotFound from './components/PageNotFound'

import {Authorizeuser,Protectroute} from './middleware/auth.js'

//Routers
const router=createBrowserRouter([
    {
        path:'/',
        element:<Username></Username>
    },
    {
        path:'/register',
        element:<Register></Register>
    },
    {
      path:'/reset',
      element:<Reset></Reset>
    },
    {
      path:'/password',
      element:<Protectroute> <Password/> </Protectroute>
    },
    {
       path:'/profile',
       element: <Authorizeuser> <Profile/> </Authorizeuser>
    },
    {
       path:'/recovery',
       element:<Recovery></Recovery>
    },
    {
       path:'*',
       element:<PageNotFound></PageNotFound>
    }
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router} ></RouterProvider>
        
    </main>
  )
}
