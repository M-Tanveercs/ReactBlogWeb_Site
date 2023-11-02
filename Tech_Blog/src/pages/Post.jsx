// import React,{useEffect,useState} from 'react'
// import {Link,useNavigate,useParams} from 'react-router-dom'

// import {useSelector} from 'react-redux'
// import appwriteService from '../appwrite/config'
// import {Button,Container}
// from '../components'
// import parse from 'html-react-parser'

// const Post = () => {
//  const [post, setpost] = useState(null)
//  const {slug} = useParams()
//  const navigate = useNavigate()
//  const userData = useSelector((state)=>state.auth.userData)
//  const isAuthor=post && userData ? post.userId=== userData.$id:false
//  console.log(isAuthor);
//  useEffect(() => {
// if(slug){
//     appwriteService.getPost(slug).then((post)=>{
//         if(post){
//             setpost(post)
//         }else{
//             navigate('/')
//         }})
//     } else navigate('/')


//  }, [slug,navigate])
//  const deletePost=()=>{
//     appwriteService.deletePost(post.$id).then((status)=>{
//         if(status){
//             appwriteService.deleteFile(post.featuredImsge)
//             navigate('/')
//         }
//     })
//  }
 
//   return post ? (
//     <div className="py-8">
//       <Container>
//         <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//           <img
//             src={appwriteService.getFilePreview(post.featuredImage)}
//             alt={post.title}
//             className="rounded-xl"
//           />
   

//           {isAuthor && (
//           <div className="absolute right-6 top-6">
//             <Link to={`/edit-post/${post.$id}`}>
//               <Button bgColor="bg-green-500" className="mr-3">
//                 Edit
//               </Button>
//             </Link>
//             <Button bgColor="bg-red-500" onClick={deletePost}>
//               Delete
//             </Button>
//           </div>
//            )} 
//         </div>
      
//         <div className="w-full mb-6">
//           <h1 className="text-2xl font-bold">{post.title}</h1>
//         </div>
//         <div className="browser-css">{parse(post.content)}</div>
//       </Container>
//     </div>
//   ) : null;
// }

// export default Post


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";

import authService from "../appwrite/auth";
export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
const [Author, setAtuthor] = useState()
  // const userData = useSelector((state) => state.auth.userData);
  let isAuthor
  let userData
useEffect(() => {
   authService.getCurrentUser()
    .then((userData) => {
      if (userData){
 isAuthor= post && userData ? post.userId === userData.$id : false;
 setAtuthor(isAuthor)
 console.log("view post",post)
 console.log("view userdata",userData)
 console.log(" post.userId", post.userId);
 console.log("userData.$id", userData.$id);
 console.log("view is author in post",isAuthor);
}}) 
}, [userData,post])
console.log(Author)
  
//  console.log(userData);
//   console.log(post);
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-white mb-16 mt-10">
      <Container>
        <div className="w-full flex justify mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full  h-60 "
         
          />

          {Author && (
            <div className="absolute right-6 bottom-5">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
           )} 
        </div>
        <div className="w-full mb-6 ">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css text-left">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
