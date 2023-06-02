

interface props {
  videoSrc: string;
}

const VideoPlayer= ({ videoSrc }: props) => {

  return (
    <div className=" relative top-0 left-0 heightview">
      <div className='absolute h-full w-full bg-black opacity-20'></div>
    <video className=" w-full h-full object-cover" autoPlay loop muted >
      <source src="/animehero.webm" type="video/webm" />
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
      
    </video>
    </div>
  );
};

export default VideoPlayer;