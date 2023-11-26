import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Models } from './Models';
import { Loader } from '../Loader';

export const AboutCanvas = () => {
    return (
        <div className="background-light900_dark200 fixed left-0 top-0  -z-10 h-screen w-full">
            <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />
                <Suspense fallback={<Loader />}>
                    <Models />
                </Suspense>
            </Canvas>
        </div>
    );
};
