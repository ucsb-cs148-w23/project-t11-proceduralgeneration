import {useRef, useMemo} from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
import distortionImg from '../textures/WaterDistortion.png'

export default function WaterPlane(props){
    const {scene, camera} = useThree();
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
    const planeSize = Math.max(props.xSize, props.zSize) * 24;

    const distortionMap = useLoader(TextureLoader, distortionImg);

    useFrame((state) => {
        const { clock } = state;
        ref.current.material.uniforms.u_Time.value = clock.getElapsedTime();
        state.gl.setRenderTarget(target);
        let c = camera.clone()
        //c.position.set(0,0,0)
        //c.setRotationFromEuler(new THREE.Euler(Math.PI/2.0,0,0));
        //c.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI/2);
        state.gl.render(scene, c);
        
        ref.current.material.uniforms.u_depthTexture.value = target.clone().depthTexture;
        ref.current.material.uniforms.u_cameraNear.value = camera.near;
        ref.current.material.uniforms.u_cameraFar.value = camera.far;
        ref.current.material.uniforms.u_depthDistance.value = 0.5;
        ref.current.material.uniforms.u_waveLength.value = 3.0/2.0 * planeSize/24;
        state.gl.setRenderTarget(null);
        state.gl.render(scene, camera);
    })


    return <mesh ref={ref} position={[props.xSize, -1, props.zSize]} rotation={[-Math.PI/2.0, 0, 0]}>
        <planeBufferGeometry args={[planeSize,planeSize,planeSize*2,planeSize*2]}/>
        <waterShader u_Time={0.0} u_distortionTex={distortionMap} u_waveSteepness = {0.07} u_waveSpeed = {1.2}/>
    </mesh>
}
