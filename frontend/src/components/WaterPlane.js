import {useRef, useMemo, useContext} from 'react'
import { WaterShader } from "./WaterShader"
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { ControlsContext } from '../Root.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
import distortionImg from '../textures/WaterDistortion.png'

export default function WaterPlane(props){
    const {scene, camera} = useThree();
    const { showSunset } = useContext(ControlsContext);
    const [ target ] = useMemo( () => {
        const target = new THREE.WebGLRenderTarget(
            window.innerWidth,
            window.innerHeight, 
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                stencilBuffer: false,
                depthBuffer: true,
                depthTexture: new THREE.DepthTexture(),
            },
        );
        target.depthTexture.format = THREE.DepthFormat;
        target.depthTexture.type = THREE.UnsignedShortType;
        return [ target ];
    }, []);

    const ref = useRef()
    const planeSize = Math.max(props.xSize, props.zSize) * 32;

    const distortionMap = useLoader(TextureLoader, distortionImg);
    let lod = Math.min(1,2*Math.floor((planeSize/32)/5));
    if (Math.abs(props.xSize - props.zSize) <= 3 && planeSize/32 >= 20){
        lod *= 2;
    }
    useFrame((state) => {
        const { clock } = state;
        ref.current.material.uniforms.u_Time.value = clock.getElapsedTime();
        state.gl.setRenderTarget(target);
        let c = camera.clone()
        state.gl.render(scene, c);
        ref.current.material.uniforms.u_waveLod.value = lod;
        ref.current.material.uniforms.u_depthTexture.value = target.clone().depthTexture;
        ref.current.material.uniforms.u_cameraNear.value = camera.near;
        ref.current.material.uniforms.u_cameraFar.value = camera.far;
        ref.current.material.uniforms.u_depthDistance.value = 0.5;
        ref.current.material.uniforms.u_waveLength.value = 5.0/2.0 * (planeSize/32);
        ref.current.material.uniforms.u_waveSteepness.value = 0.09 / lod;
        ref.current.material.uniforms.u_sunset.value = showSunset ? 1 : 0;
        state.gl.setRenderTarget(null);
        state.gl.render(scene, camera);
    })
    
    return (
      <mesh ref={ref} position={[props.xSize, -1, props.zSize]} rotation={[-Math.PI/2.0, 0, 0]}>
          <planeBufferGeometry args={[planeSize,planeSize,planeSize/lod,planeSize/lod]}/>
          <waterShader u_Time={0.0} u_distortionTex={distortionMap} u_waveSpeed = {1.2}/>
      </mesh>
    );
}
