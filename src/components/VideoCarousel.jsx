import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
import { HightlightsVideo1, HightlightsVideo2, HightlightsVideo3, HightlightsVideo4, PlayIcon, PauseIcon, ReplayIcon } from '../assets/export';

const VideoCarousel = () => {
    const hightlightsSlides = [
        {
            id: 1,
            textLists: ["Enter A17 Pro.", "Game-changing chip.", "Groundbreaking performance."],
            video: HightlightsVideo1,
            videoDuration: 4,
        },
        {
            id: 2,
            textLists: ["Titanium.", "So strong. So light. So Pro."],
            video: HightlightsVideo2,
            videoDuration: 5,
        },
        {
            id: 3,
            textLists: ["iPhone 15 Pro Max has the", "longest optical zoom in", "iPhone ever. Far out."],
            video: HightlightsVideo3,
            videoDuration: 2,
        },
        {
            id: 4,
            textLists: ["All-new Action button.", "What will yours do?."],
            video: HightlightsVideo4,
            videoDuration: 3.63,
        },
    ];
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({ startPlay: false, isPlaying: false, isEnd: false, videoId: 0, isLastVideo: false });
    const [loadedData, setLoadedData] = useState([]);
    const { startPlay, isPlaying, isEnd, videoId, isLastVideo } = video;

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress != currentProgress) {
                        currentProgress = progress;
                        gsap.to(videoDivRef.current[videoId], { width: window.innerWidth < 1200 ? "10vw" : "4vw" });
                        gsap.to(span[videoId], { width: `${currentProgress}%`, backgroundColor: "white" });
                    }
                },

                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], { width: "12px" });
                        gsap.to(span[videoId], { backgroundColor: "#afafaf" });
                    }
                },
            });

            if (videoId == 0) {
                anim.restart();
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut",
        });

        gsap.to("#video", {
            scrollTrigger: { trigger: "#video", toggleActions: "restart none none none" },
            onComplete: () => {
                setVideo((pre) => ({ ...pre, startPlay: true, isPlaying: true }));
            },
        });
    }, [isEnd, videoId]);

    const handleProcess = (type, index) => {
        switch (type) {
            case "video-end":
                setVideo((prev) => ({ ...prev, isEnd: true, videoId: index + 1 }));
                break;

            case "video-last":
                setVideo((prev) => ({ ...prev, isLastVideo: true }));
                break;

            case "video-reset":
                setVideo((prev) => ({ ...prev, videoId: 0, isLastVideo: false }));
                break;

            case "pause":
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;

            case "play":
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;

            default:
                return video;
        }
    }

    const handleLoadedMetaData = (e) => {
        setLoadedData((prev) => [...prev, e]);
    }

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((item, index) => (
                    <div id="slider" className="sm:pr-20 pr-10" key={item.id}>
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    className={`${item.id === 2 && "translate-x-44"} pointer-events-none`}
                                    preload="auto"
                                    muted
                                    ref={(e) => (videoRef.current[index] = e)}
                                    onEnded={() => index !== 3 ? handleProcess("video-end", index) : handleProcess("video-last")}
                                    onPlay={() => setVideo((pre) => ({ ...pre, isPlaying: true }))}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(e)}
                                >
                                    <source src={item.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10">
                                {item.textLists.map((item, index) => (
                                    <p className="md:text-2xl text-xl font-medium" key={index}>
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((item, index) => (
                        <div
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                            ref={(e) => (videoDivRef.current[index] = e)}
                            key={index}
                        >
                            <span className="absolute h-full w-full rounded-full" ref={(e) => (videoSpanRef.current[index] = e)} />
                        </div>
                    ))}
                </div>

                <button className="control-btn">
                    <img
                        src={isLastVideo ? ReplayIcon : !isPlaying ? PlayIcon : PauseIcon}
                        alt={isLastVideo ? "Replay-Icon" : !isPlaying ? "Play-Icon" : "Pause-Icon"}
                        onClick={isLastVideo ? () => handleProcess("video-reset") : !isPlaying ? () => handleProcess("play") : () => handleProcess("pause")}
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel;