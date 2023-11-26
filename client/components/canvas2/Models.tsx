import { Html, PerspectiveCamera, Scroll, useHelper, useScroll, useGLTF } from '@react-three/drei';
import {
    PointLightHelper,
    type Group,
    type Mesh,
    type PerspectiveCamera as PerspectiveCameraRef,
    PointLight,
} from 'three';
import { PerspectiveCameraProps, useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import {} from '@react-three/drei';
export const Models = () => {
    const model = useGLTF('/assets/models/appleWatch.glb');
    const cameraRef = useRef<PerspectiveCameraRef>(null);
    const firstMesh = useRef<Group>(null);
    const firstMesh1 = useRef<Mesh>(null);
    const scrollRef = useRef(0);
    const positions = useRef({ watch: [3, 0, 0], phone: [-3, -4, 0] });
    const pointLightRef = useRef<PointLight>();
    // const data = useScroll();
    useFrame((_, delta) => {
        if (cameraRef.current) cameraRef.current.position.y = -scrollRef.current * 4;
        if (firstMesh.current) {
            // firstMesh.current.rotation.x += delta * 0.2;
            firstMesh.current.rotation.y += delta * 0.4;

            if (window.innerWidth <= 1400 && window.innerWidth > 1024) {
                firstMesh.current.position.x = -1;
            } else if (window.innerWidth <= 1024) {
                firstMesh.current.position.x = -3;
            } else firstMesh.current.position.x = 0;
            firstMesh.current.updateMatrix();
        }
    });

    const handleScroll = () => {
        scrollRef.current = window.scrollY / window.outerHeight;
        console.log(window.scrollY / window.outerHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', () => handleScroll());
        // window.addEventListener('resize', () => {
        //     if (window.innerWidth <= 1400) {
        //         positions.current.watch = [0, 0, 0];
        //         positions.current.phone = [0, -4, 0];
        //     }
        // });
        return () => {
            // window.removeEventListener('resize', () => {
            //     if (window.innerWidth <= 1400) {
            //         positions.current.watch = [0, 0, 0];
            //         positions.current.phone = [0, -4, 0];
            //     }
            // });
            window.removeEventListener('scroll', () => handleScroll());
        };
    }, []);
    // useHelper(pointLightRef, PointLightHelper, 0.5, 'hotpink');
    return (
        <>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 6]} />
            <group position={positions.current.watch}>
                <pointLight ref={pointLightRef} position={[-2, 1.5, 2]} color="#FFF" intensity={2} />
                <group ref={firstMesh}>
                    <primitive object={model.scene} scale={20} />
                    {/* <torusGeometry args={[1, 0.4, 16, 60]} />
                <meshToonMaterial color={'#fff'} /> */}
                </group>
            </group>

            <mesh ref={firstMesh1} position={positions.current.phone}>
                <coneGeometry args={[1, 2, 32]} />
                <meshStandardMaterial />
            </mesh>
        </>
    );
};
