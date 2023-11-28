import { useGLTF } from '@react-three/drei';
import React, { useMemo, useRef, useState, Suspense, useEffect } from 'react';
import { animated, useSprings } from '@react-spring/three';
import { Group, Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../stores/useAppStore';
import { Loader } from '../Loader';
import { airQualityColors } from '../../constans';
import * as THREE from 'three';
useGLTF.preload(`/assets/models/model.glb`);

export const Model = () => {
    const { mode, airQuality, allowRotation, hoveredQualityIndex } = useAppStore();
    const [colors, setColors] = useState({
        old: mode === 'light' ? '#212734' : '#fff',
        new: mode === 'light' ? '#212734' : '#fff',
    });
    const { nodes } = useGLTF(`/assets/models/model.glb`) as any;
    const groupRef = useRef<Group>(null);
    const modelMeshes: Mesh[] = useMemo(
        () =>
            Object.entries(nodes)
                .map(([key, value]) => (key.toLowerCase().includes('object') ? value : null))
                .filter(Boolean) as Mesh[],
        [],
    );

    const [opacities] = useSprings(
        10,
        i => ({
            delay: 100 * i,
            from: { color: colors.old },
            to: { color: colors.new },
        }),
        [colors],
    );

    useFrame((_, delta) => {
        if (!groupRef.current || allowRotation) return;
        groupRef.current.rotation.z += delta * 0.2;
        groupRef.current.updateMatrixWorld();
    });

    useEffect(() => {
        if (hoveredQualityIndex !== undefined && hoveredQualityIndex !== -1) {
            setColors(p => ({
                new: airQualityColors[hoveredQualityIndex as keyof typeof airQualityColors],
                old: p.new,
            }));
            return;
        } else if ((airQuality?.st?.indexLevel?.id ?? -1) < 0)
            setColors(p => ({
                old: mode === 'light' ? '#212734' : '#fff',
                new: mode === 'light' ? '#212734' : '#fff',
            }));
        else
            setColors(p => ({
                new: airQualityColors[airQuality?.st.indexLevel?.id as keyof typeof airQualityColors],
                old: p.new,
            }));
    }, [airQuality, mode, hoveredQualityIndex]);

    useEffect(() => {
        if (groupRef.current) {
            if (window.innerWidth <= 640) groupRef.current.scale.set(0.6, 0.6, 0.6);
            else groupRef.current.scale.set(1, 1, 1);
        }

        const handleModelResize = () => {
            if (!groupRef.current) return;

            if (window.innerWidth <= 640) groupRef.current.scale.set(0.6, 0.6, 0.6);
            else groupRef.current.scale.set(1, 1, 1);
        };

        window.addEventListener('resize', () => handleModelResize());
        return () => window.removeEventListener('resize', () => handleModelResize());
    }, []);

    return (
        <Suspense fallback={<Loader />}>
            <group castShadow ref={groupRef} dispose={null} position={[0, 0.2, 0]} rotation={[-(Math.PI / 2.5), 0, 0]}>
                {opacities.map((color, i) => (
                    <mesh key={i} scale={0.012} castShadow receiveShadow geometry={modelMeshes[i].geometry}>
                        {/* @ts-ignore */}
                        <animated.meshToonMaterial color={color.color} opacity={0.5} transparent />
                    </mesh>
                ))}
            </group>
        </Suspense>
    );
};
