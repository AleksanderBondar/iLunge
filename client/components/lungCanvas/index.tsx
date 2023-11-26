import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { OrbitControls as OrbitControlsRef } from 'three-stdlib';
import { Model } from './Model';
import { useAppStore } from '../../stores';

export const LungCanvas = () => {
    const { allowRotation } = useAppStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const ref = useRef<OrbitControlsRef>(null);
    useEffect(() => {
        if (!allowRotation && ref.current) ref.current.reset();
    }, [allowRotation]);
    return (
        <Canvas ref={canvasRef}>
            {process.env.NODE_ENV === 'development' && <Stats />}
            <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} shadow-normalBias={0.04} />
            <ambientLight intensity={1.5} />
            <Model />
            <OrbitControls ref={ref} enabled={allowRotation} maxDistance={8} minDistance={4} enablePan={false} />
        </Canvas>
    );
};
