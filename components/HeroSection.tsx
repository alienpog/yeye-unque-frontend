
import VideoPlayer from './VideoPlayer'

async function fetchvideo() {
  const response = await fetch('http://127.0.0.1:8000/videoplay/',{next: {revalidate:5}})
  const data = await response.json()
  return data
}

async function HeroSection() {
    const videoplayer=await fetchvideo();
  return (
 <div>
     <VideoPlayer videoSrc={videoplayer}/>
     
 </div>
  )
}

export default HeroSection