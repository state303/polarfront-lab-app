import * as THREE from "three";
import vShader from "@/webgl/shaders/SimulationMaterial/vertex.glsl";
import fShader from "@/webgl/shaders/SimulationMaterial/fragment.glsl";

/**
 * Generates a randomly distributed ArrayBuffer data with offset, mutates the given data array.
 * @param {THREE.Vector4} vector - source vector to be mutated.
 * @param {number} size - scalar for the distance of the vector.
 * @param {Float32Array} data - data container to be filled.
 * @param {number} offset - offset of the distance.
 * @returns {THREE.ArrayBuffer} - mutated array with generated points.
 */
const getPoint = (vector, size, data, offset) => {
    vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, vector.w);

    if (vector.length() > 1) {
        return getPoint(vector, size, data, offset);
    }
    return vector.normalize().multiplyScalar(size).toArray(data, offset);
};

/**
 * Generates a new Float32Array of ArrayBuffer that contains data for the point cloud sphere.
 * @param count - target points size
 * @param size - target size of the sphere
 * @param {THREE.Vector4} vector - optional source Vector4 instance.
 * @returns {Float32Array} - resulted data array.
 */
const getSphereDataArray = (count, size, vector = new THREE.Vector4()) => {
    const data = new Float32Array(count * 4);
    for (let i = 0; i < count * 4; i += 4) {
        getPoint(vector, size, data, i);
    }
    return data;
};

class SimulationMaterial extends THREE.ShaderMaterial {
    constructor() {
        const positionsTexture = new THREE.DataTexture(
            getSphereDataArray(512 * 512, 128),
            512,
            512,
            THREE.RGBAFormat,
            THREE.FloatType,
        );
        positionsTexture.needsUpdate = true;

        super({
            vertexShader: vShader,
            fragmentShader: fShader,
            uniforms: {
                positions: { value: positionsTexture },
                uTime: { value: 0 },
                uCurlFreq: { value: 0.25 },
            },
        });
    }
}

extend({ SimulationMaterial });
