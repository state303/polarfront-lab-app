import * as THREE from "three";
import { extend } from "@react-three/fiber";
import vShader from "@/webgl/shaders/DepthOfFieldsPointMaterial/vertex.glsl";
import fShader from "@/webgl/shaders/DepthOfFieldsPointMaterial/fragment.glsl";

class DepthOfFieldsPointsMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            vertexShader: vShader,
            fragmentShader: fShader,
            uniforms: {
                positions: { value: null },
                uTime: { value: 0 },
                uFocus: { value: 5.1 },
                uFov: { value: 50 },
                uBlur: { value: 30 },
                uParticleColor: { value: new THREE.Vector3(1, 1, 1) },
                uTouch: { value: null },
            },
            transparent: true,
            blending: THREE.NormalBlending,
            depthWrite: false,
        });
    }
}

extend({ DepthOfFieldsPointsMaterial });
