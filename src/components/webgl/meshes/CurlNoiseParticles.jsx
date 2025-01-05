import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useFBO } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";

export default function CurlNoiseParticles({ speed, fov, aperture, focus, curl, size = 512, ...props }) {
    const simulationMaterialRef = useRef();
    const depthOfFieldsMaterialRef = useRef();
    const lastExecutionTime = useRef(0);

    /* Scene Configurations */
    const [scene] = useState(() => new THREE.Scene());
    const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 56), 100));
    const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]));
    const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]));
    const [targetColor] = useState(() => new THREE.Vector3(0, 0, 0));

    /* Theme Configurations */
    const { theme } = useTheme();

    useEffect(() => {
        const target = theme === "dark" ? 1 : 0;
        targetColor.set(target, target, target);
    }, [targetColor, theme]);

    /**
     * @type {THREE.WebGLRenderTarget}
     */
    const target = useFBO(size, size, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
    });

    /* Normalize */
    const particles = useMemo(() => {
        const length = size * size;
        const particles = new Float32Array(length * 3);
        for (let i = 0; i < length; i++) {
            const i3 = i * 3;
            particles[i3] = (i % size) / size;
            particles[i3 + 1] = i / size / size;
        }
        return particles;
    }, [size]);

    useFrame((state, delta) => {
        state.gl.setRenderTarget(target);
        state.gl.clear();
        state.gl.render(scene, camera);
        state.gl.setRenderTarget(null);
        depthOfFieldsMaterialRef.current.uniforms.positions.value = target.texture;

        const baseCurlFreq = 12.0;

        const { elapsedTime } = state.clock;
        const diff = elapsedTime - lastExecutionTime.current;

        /* Per each 6 and 12 seconds, move the curl frequency to some random place */
        if (diff >= 12.0) {
            lastExecutionTime.current = elapsedTime;
            simulationMaterialRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.randFloat(0.25, 12.0);
        } else if (diff >= 6.0) {
            simulationMaterialRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(
                simulationMaterialRef.current.uniforms.uCurlFreq.value,
                baseCurlFreq + delta * 0.1,
                0.1,
            );
        } else {
            simulationMaterialRef.current.uniforms.uCurlFreq.value += delta * 0.1;
        }

        depthOfFieldsMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        depthOfFieldsMaterialRef.current.uniforms.uFocus.value = THREE.MathUtils.lerp(
            depthOfFieldsMaterialRef.current.uniforms.uFocus.value,
            focus,
            0.1,
        );
        depthOfFieldsMaterialRef.current.uniforms.uFov.value = THREE.MathUtils.lerp(
            depthOfFieldsMaterialRef.current.uniforms.uFov.value,
            fov,
            0.1,
        );
        depthOfFieldsMaterialRef.current.uniforms.uBlur.value = THREE.MathUtils.lerp(
            depthOfFieldsMaterialRef.current.uniforms.uBlur.value,
            (5.6 - aperture) * 9,
            0.1,
        );

        const currentColor = depthOfFieldsMaterialRef.current.uniforms.uParticleColor.value;

        depthOfFieldsMaterialRef.current.uniforms.uParticleColor.value = currentColor.lerp(targetColor, 0.01);
        simulationMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
        simulationMaterialRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(
            simulationMaterialRef.current.uniforms.uCurlFreq.value,
            curl,
            0.1,
        );
    });

    return (
        <>
            {/* Simulation goes into an FBO/Off-buffer */}
            {createPortal(
                <mesh>
                    <simulationMaterial ref={simulationMaterialRef} />
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                        <bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
                    </bufferGeometry>
                </mesh>,
                scene,
            )}
            {/* The result of which is forwarded into a point cloud via data-texture */}
            <points {...props}>
                <dofPointsMaterial ref={depthOfFieldsMaterialRef} />
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[particles, 3]} />
                </bufferGeometry>
            </points>
        </>
    );
}
