import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import VideoCarousel from './VideoCarousel';
import { ChevronRightIcon, WatchIcon } from '../assets/export';

const Highlights = () => {
    useGSAP(() => {
        gsap.to('#highlights-title', { opacity: 1, y: 0 });
        gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
    }, [])

    return (
        <section id="highlights-container" className="w-screen overflow-hidden h-full common-padding bg-zinc">
            <div className="screen-max-width">
                <div className="mb-12 w-full md:flex items-end justify-between">
                    <h1 id="highlights-title" className="section-heading">Get the highlights.</h1>

                    <div className="flex flex-wrap items-end gap-5">
                        <p className="link">
                            Watch the film
                            <img src={WatchIcon} alt="Watch-Icon" className="ml-2" />
                        </p>
                        <p className="link">
                            Watch the event
                            <img src={ChevronRightIcon} alt="Chevron-Right Icon" className="ml-2" />
                        </p>
                    </div>
                </div>

                <VideoCarousel />
            </div>
        </section>
    )
}

export default Highlights;