

interface props {
  videoSrc: object[];
}

const VideoPlayer= ({ videoSrc }: props) => {
  return (
    <div className=" relative top-0 left-0 heightview">
      <div className='absolute h-full w-full bg-black opacity-20'></div>
    
    <video className=" w-full h-full object-cover" autoPlay={true} muted controls={false} playsInline loop={true} >
        {/* @ts-ignore */}
      <source src={videoSrc[1].video} type="video/webm" />
        {/* @ts-ignore */}
      <source src={videoSrc[0].video} type="video/mp4" />
      Your browser does not support the video tag.
      
    </video>
    </div>
  );
};

export default VideoPlayer;