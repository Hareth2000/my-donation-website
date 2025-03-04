import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';

function HeroSection() {
  const navigate= useNavigate();
  return (
    <>
    <div className='w-full h-2 bg-[#E3007E]'></div>
      <div className="relative w-full h-130 flex items-center text-white" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif"}}>
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-[0px_-1500px]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/5469629/5469629-uhd_1440_2560_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay with Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left,rgba(102, 36, 128, 0.7) 0%, transparent 100%)',
          }}
        ></div>

        {/* Content - Aligned to the Right */}
        <div className="relative z-10 max-w-4xl ml-auto px-10 lg:px-20 text-right">
          <h1 className="text-3xl md:text-4xl max-w-[500px] mb-[40px] font-bold">
            ساهم في توفير الأجهزة والمستلزمات الطبية لمن هم بحاجة إليها
          </h1>
          <p className="mt-4 text-md max-w-[500px] text-white">
          في "أفق"، نؤمن أن كل محتاج له حق، وكل قادر على العطاء له فرصة!
          تبرع الآن، فخيرُ الناس أنفعهم للناس
          </p>

          {/* CTA Button */}
          <button className="overflow-hidden mt-[30px] relative w-52 p-2 h-10 bg-[#E3007E] text-white border-none rounded-md text-md font-bold cursor-pointer relative z-10 group">
            <Link to="/Donations">
              كن عوناً
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-8 transform scale-x-0 group-hover:scale-x-200 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-[#E3007E] rotate-8 transform scale-x-0 group-hover:scale-x-200 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-[#662480] rotate-8 transform scale-x-0 group-hover:scale-x-200 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
              <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-18 z-10">
                تبرع!
              </span>
            </Link>
          </button>
        </div>

        {/* Custom Clip Path for Diagonal Shape */}
        <style>{`
            .clip-diagonal {
            clip-path: polygon(0 0, 50% 0, 35% 100%, 0% 100%);
            }
        `}</style>
      </div>
      <div className='w-full h-2 bg-[#E3007E]'></div>
    </>
  );
}

export default HeroSection;