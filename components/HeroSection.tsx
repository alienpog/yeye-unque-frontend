
import VideoPlayer from './VideoPlayer'
interface player{
  video: object;
}
async function fetchvideo() {
  const response = await fetch(`${process.env.BACKEND_URL}/videoplay/`,{next: {revalidate:60*60*24}})
  const data:player[] = await response.json()
  return data
}

async function HeroSection() {
    const videoplayer=await fetchvideo();
  return (
 <>
     <VideoPlayer videoSrc={videoplayer}/>   
 </>
  )
}

export default HeroSection