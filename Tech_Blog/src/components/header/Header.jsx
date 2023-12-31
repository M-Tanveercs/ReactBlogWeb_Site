import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate=useNavigate()
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    { name: "Signup",
     slug: "/signup",
      active: !authStatus },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add-Post",
      slug: "/add-post",
      active: authStatus,
    },
   
  ];
  return (
   <header className='py-2 sha bg-violet-700 sticky top-0 z-50'>
    <Container>
      <nav className='flex text-cyan-50'>
<div className='mr-4 '>
  <Link to='/'>
  <Logo  classNam='w-10'/>
  </Link>
</div>
<ul className='flex ml-auto '>
{navItems.map((item)=>
item.active? (
  <li key={item.name} className='inline-box px-6 py-3  mt-3 duration-200 hover:bg-slate-400 rounded-full '>
    <button onClick={()=>navigate(item.slug)}>

      {item.name}
    </button>
  </li>
):null
)}

{
  authStatus && (
    <li className='mt-3'>
      <LogoutBtn/>
    </li>
  )
}
</ul>
      </nav>
    </Container>

   </header>
  )
}

export default Header



