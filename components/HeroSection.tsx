
import VideoPlayer from './VideoPlayer'
interface player{
  video: object;
}
async function fetchvideo() {
  const response = await fetch('http://127.0.0.1:8000/videoplay/',{next: {revalidate:5}})
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