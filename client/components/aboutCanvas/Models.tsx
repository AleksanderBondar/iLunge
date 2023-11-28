import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import { type Group, type PerspectiveCamera as PerspectiveCameraRef, PointLight } from 'three';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';

export const Models = () => {
    const watchModel = useGLTF('/assets/models/appleWatch.glb');
    const phoneModel = useGLTF('/assets/models/iphone.glb');
    const cameraRef = useRef<PerspectiveCameraRef>(null);
    const watchMesh = useRef<Group>(null);
    const phoneMesh = useRef<Group>(null);
    const scrollRef = useRef(0);

    const pointLightRef = useRef<PointLight>(null);

    useFrame((_, delta) => {
        if (cameraRef.current) cameraRef.current.position.y = -scrollRef.current * 4;
        if (watchMesh.current) {
            watchMesh.current.rotation.y += delta * 0.4;
            watchMesh.current.updateMatrix();
        }
        if (phoneMesh.current) {
            phoneMesh.current.rotation.y -= delta * 0.4;
            phoneMesh.current.updateMatrix();
        }
    });

    const handleScroll = () => {
        scrollRef.current = window.scrollY / window.innerHeight;
    };

    const handleResize = () => {
        if (watchMesh.current) {
            if (window.innerWidth <= 1400 && window.innerWidth > 1024) {
                watchMesh.current.position.x = -1;
            } else if (window.innerWidth <= 1024) {
                watchMesh.current.position.x = -3;
            } else watchMesh.current.position.x = 0;
        }
        if (phoneMesh.current) {
            if (window.innerWidth > 1400) {
                phoneMesh.current.position.x = 0;
            } else if (window.innerWidth <= 1400 && window.innerWidth > 1024) {
                phoneMesh.current.position.x = 0.5;
            } else if (window.innerWidth <= 1024 && window.innerWidth > 640) {
                phoneMesh.current.position.x = 1.5;
            }
            // else if(window.innerWidth <= 640)
            else phoneMesh.current.position.x = 2.5;
        }
    };
    useEffect(() => {
        handleResize();
        window.addEventListener('scroll', () => handleScroll());
        window.addEventListener('resize', () => handleResize());
        return () => {
            window.addEventListener('resize', () => handleResize());
            window.removeEventListener('scroll', () => handleScroll());
        };
    }, []);

    return (
        <>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1, 5]} />
            <group position={[3, 0, 0]}>
                <pointLight ref={pointLightRef} position={[-2, 1.5, 2]} color="#FFF" intensity={2} />
                <group ref={watchMesh}>
                    <primitive object={watchModel.scene} scale={20} />
                </group>
            </group>
            <group position={[-2.5, -4, 0]}>
                <group ref={phoneMesh}>
                    <primitive rotation={[Math.PI / 10, 0, 0]} object={phoneModel.scene} scale={2.5} />
                </group>
            </group>
        </>
    );
};
