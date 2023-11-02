// import { useDispatch } from 'react-redux'
// import { useState,useEffect } from 'react'
// import authService from './appwrite/auth'
// import './App.css'

// import {login,logout} from './store/authSlice'
// import {Header,Footer} from './components'
// import { Outlet } from 'react-router-dom'
// function App() {
// const [loading, setLoading] = useState(true)
// const dispatch=useDispatch()


// useEffect(() => {
// authService.getCurrentUser()
// .then((userData)=>{
//   if(userData){
//     dispatch(login({userData}))
//   }
// dispatch(logout())

// })
// .finally(()=>setLoading(false))


// }, [])
// return !loading? (
//   <div className='min-h-screen flex flex-wrap content-between bg-slate-300'> 
//   <div className='w-full block'>
// <Header/>
// <main>
//  <Outlet/>
// </main>

// <Footer/>
    
//   </div>
  
  
//   </div>
// ):null

  
// }

// export default App
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      // if (userData) {
      //   console.log(userData)
      //   dispatch(login({userData}))
      // } else {
      //   dispatch(logout())
      // }
       if (!userData) {
         dispatch(logout());
       }
    })
    .finally(() => setLoading(false))
  }, [])
 

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-slate-300">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App

