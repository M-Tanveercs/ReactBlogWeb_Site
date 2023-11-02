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
    { name: "Signup", slug: "/signup", active: !authStatus },
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
   <header className='py-3 sha bg-violet-700'>
    <Container>
      <nav className='flex text-cyan-50'>
<div className='mr-4'>
  <Link to='/'>
  <Logo width='70px'/>
  </Link>
</div>
<ul className='flex ml-auto'>
{navItems.map((item)=>
item.active? (
<<<<<<< HEAD
  <li key={item.name} className='inline-box px-6 py-2 duration-200 hover:bg-slate-400  hover:text-violet-600 rounded-full'>
=======
  <li key={item.name} className='inline-box px-6 py-2 duration-200 hover:bg-slate-400 rounded-full'>
>>>>>>> 9a133fe9c98b5e7cbc4683e981772c98ebaf8b85
    <button onClick={()=>navigate(item.slug)}>

      {item.name}
    </button>
  </li>
):null
)}

{
  authStatus && (
    <li >
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