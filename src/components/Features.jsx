import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../assets/animations';
import { ExploreVideo, ExploreImage1, ExploreImage2 } from '../assets/export';

const Features = () => {
    const exploreVideoRef = useRef(null);

    useGSAP(() => {
        gsap.to('#explore-video', {
            scrollTrigger: { trigger: '#explore-video', toggleActions: 'play pause reverse restart', start: '-10% bottom' },
            onComplete: () => {
                exploreVideoRef.current.play();
            }
        });

        animateWithGsap('#features-title', { y: 0, opacity: 1 });
        animateWithGsap('.g_grow', { scale: 1, opacity: 1, ease: 'power1' }, { scrub: 5.5 });
    }, [])

    return (
        <section className="h-full common-padding bg-zinc relative overflow-hidden">
            <div className="screen-max-wdith">
                <div className="mb-12 w-full">
                    <h1 id="features-title" className="section-heading">Explore the full story.</h1>
                </div>

                <div className="flex flex-col justify-center items-center overflow-hidden">
                    <div className="mt-32 mb-24 sm:pl-24">
                        <h2 className="text-4xl text-center sm:text-5xl lg:text-7xl font-semibold">iPhone.</h2>
                        <h2 className="text-3xl text-center sm:text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
                    </div>

                    <div className="flex-center flex-col sm:px-10">
                        <div className="relative h-[50vh] w-full flex items-center">
                            <video playsInline id="explore-video" className="w-full h-full object-cover object-center" preload="none" muted autoPlay ref={exploreVideoRef}>
                                <source src={ExploreVideo} type="video/mp4" />
                            </video>
                        </div>

                        <div className="flex flex-col w-full relative">
                            <div className="feature-video-container">
                                <div className="overflow-hidden flex-1 h-[50vh]">
                                    <img src={ExploreImage1} alt="Explore Image-1" className="feature-video g_grow" />
                                </div>
                                <div className="overflow-hidden flex-1 h-[50vh]">
                                    <img src={ExploreImage2} alt="Explore Image-2" className="feature-video g_grow" />
                                </div>
                            </div>

                            <div className="feature-text-container">
                                <div className="flex-1 flex-center">
                                    <p className="feature-text g_text">
                                        iPhone 15 Pro is {' '}
                                        <span className="text-white">
                                            the first iPhone to feature an aerospace-grade titanium design
                                        </span>,
                                        using the same alloy that spacecrafts use for missions to Mars.
                                    </p>
                                </div>

                                <div className="flex-1 flex-center">
                                    <p className="feature-text g_text">
                                        Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                                        <span className="text-white">
                                            lightest Pro models ever.
                                        </span>
                                        You&apos;ll notice the difference the moment you pick one up.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features;