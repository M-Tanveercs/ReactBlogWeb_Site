
import React,{useState,useEffect} from 'react'
import { Container,PostForm } from '../components'
import authService from '../appwrite/config'
import { useParams,useNavigate } from 'react-router-dom'
const EditPost = () => {
    const [post, setpost] = useState(null)
const {slug} = useParams()
const navigate=useNavigate()
useEffect(() => {
if (slug) {
    appwriteService.getPosts(slug).than((post)=>{
        if (post) {
            setpost(post)
 } })
    
}else{
    navigate('/')
}
}, [slug,navigate])

  return post ?(
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>

    </div>
  ): null
}

export default EditPost