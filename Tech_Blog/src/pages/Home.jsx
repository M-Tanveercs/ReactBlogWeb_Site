import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
    if (posts) {
      setposts(posts.documents);
    }
  })
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center ">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-grap-500">
      
                Login to read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8  ">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div className="p-2 w-full" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
            </div>
          </Container>
    </div>
    )
};

export default Home;
