import React from 'react'
import { useDispatch } from 'react-redux'

import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(()=>{
      dispatch(logout())
    })
  }
  return (
    <button
      className="inline-block px-6 py-3 duration-200 hover:hover:bg-slate-400 rounded-full"
      onClick={logoutHandler}
    >
      {" "}
      logout
    </button>
  );
}

export default LogoutBtn