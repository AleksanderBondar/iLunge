import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Models } from './Models';
import { Html, PerspectiveCamera, ScrollControls } from '@react-three/drei';

export const Canvas2 = () => {
    return (
        <div className="fixed left-0 top-0 -z-10  h-screen w-full bg-[#1e1a20]">
            <Canvas>
                {/* <ScrollControls pages={3}> */}
                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />
                <Models />
                {/* </ScrollControls> */}
            </Canvas>
        </div>
    );
};
