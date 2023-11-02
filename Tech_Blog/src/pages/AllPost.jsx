

import React, { useState, useEffect } from "react";
import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
   const userData = useSelector((state) => state.auth.userData);
   const [post, setPost] = useState(null);
 console.log("userData", userData);
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
    if (userData) {
       const isAuthor = post && userData ? post.userId === userData.$id : false;
       console.log("allpost userData", userData);
       console.log("allpost",isAuthor)
      // Assuming userData contains the user's ID
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          // Filter posts to show only the ones by the current user
          const userPosts = posts.documents.filter(
            (post) => post.userId === userData.$id
          );
          setPosts(userPosts);
        }
      });
    }})
  }, [userData,posts]);
  // appwriteService.getPosts([]).then((posts) => {
  //   if (posts) {
  //     setPosts(posts.documents);
  //   }
  // });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;