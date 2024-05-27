import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HeroVideoSmall, HeroVideoLarge } from '../assets/export';

const Hero = () => {
  const [videoSource, setVideoSource] = useState(window.innerWidth < 760 ? HeroVideoSmall : HeroVideoLarge);

  useEffect(() => {
    window.addEventListener("resize", handleVideoSource);
    return () => {
      window.removeEventListener("resize", handleVideoSource);
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero-title', { opacity: 1, delay: 2 });
    gsap.to('#hero-description', { opacity: 1, y: -50, delay: 2 });
  }, [])

  const handleVideoSource = () => {
    if (window.innerWidth < 760) {
      setVideoSource(HeroVideoSmall);
    }
    else {
      setVideoSource(HeroVideoLarge);
    }
  }

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero-title" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video className="pointer-events-none" autoPlay muted playsInline={true}>
            <source src={videoSource} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id="hero-description" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights-container" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero;