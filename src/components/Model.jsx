import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import ModelView from './ModelView';
import { BlackIPhone, BlueIPhone, WhiteIPhone, YellowIPhone } from '../assets/export';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { animateWithGsapTimeline } from '../assets/animations';

const Model = () => {
    const models = [
        {
            id: 1,
            title: "iPhone 15 Pro in Natural Titanium",
            color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
            img: YellowIPhone,
        },
        {
            id: 2,
            title: "iPhone 15 Pro in Blue Titanium",
            color: ["#53596E", "#6395ff", "#21242e"],
            img: BlueIPhone,
        },
        {
            id: 3,
            title: "iPhone 15 Pro in White Titanium",
            color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
            img: WhiteIPhone,
        },
        {
            id: 4,
            title: "iPhone 15 Pro in Black Titanium",
            color: ["#454749", "#3b3b3b", "#181819"],
            img: BlackIPhone,
        },
    ];
    const sizes = [
        { label: '6.1"', value: "small" },
        { label: '6.7"', value: "large" },
    ];
    const [size, setSize] = useState('small');
    const [activeModel, setActiveModel] = useState({ title: 'iPhone 15 Pro in Natural Titanium', color: ['#8F8A81', '#FFE7B9', '#6F6C64'], img: YellowIPhone });

    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);
    const tl = gsap.timeline();

    useEffect(() => {
        if (size === 'large') {
            animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
                transform: 'translateX(-100%)',
                duration: 2
            })
        }

        if (size === 'small') {
            animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
                transform: 'translateX(0)',
                duration: 2
            })
        }
    }, [size])

    useGSAP(() => {
        gsap.to('#model-heading', { y: 0, opacity: 1 });
    }, []);

    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="model-heading" className="section-heading">
                    Take a closer look.
                </h1>

                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControlSmall}
                            setRotationState={setSmallRotation}
                            item={activeModel}
                            size={size}
                        />

                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControlLarge}
                            setRotationState={setLargeRotation}
                            item={activeModel}
                            size={size}
                        />

                        <Canvas
                            className="w-full h-full"
                            style={{
                                position: 'fixed',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden'
                            }}
                            eventSource={document.getElementById('root')}
                        >
                            <View.Port />
                        </Canvas>
                    </div>

                    <div className="mx-auto w-full">
                        <p className="text-sm font-light text-center mb-5">{activeModel.title}</p>

                        <div className="flex-center">
                            <ul className="color-container">
                                {models.map((item, index) => (
                                    <li className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setActiveModel(item)} key={index} />
                                ))}
                            </ul>

                            <button className="size-btn-container">
                                {sizes.map(({ label, value }, index) => (
                                    <span className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white' }} onClick={() => setSize(value)} key={index}>
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model;