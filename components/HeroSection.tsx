
import BACKEND_URL from '@/src/apiConfig';
import VideoPlayer from './VideoPlayer'
interface player{
  video: object;
}
async function fetchvideo() {
  const response = await fetch(`${BACKEND_URL}videoplay/`,{cache:"no-cache"})
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