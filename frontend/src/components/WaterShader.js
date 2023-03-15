import { shaderMaterial } from "@react-three/drei"
import glsl from 'babel-plugin-glsl/macro'
import { extend } from "@react-three/fiber"
import { Vector3 } from "three"

const WaterShader = shaderMaterial(
    // Uniforms
    {
        // WaterColor (these dont work lol)
        u_shallowColor : {value : new Vector3(1,0,0)},
        u_deepColor : {value : new Vector3(0,1,0)},
        
        // Depth Params
        u_depthTexture : {value : null},
        u_cameraNear : {value : 0.01},
        u_cameraFar : {value : 1000},
        u_depthDistance : {value : 1.0},

        // Time
        u_Time : {value : 0},

        // Water Distortion
        u_distortionTex : {value : null},

        // Waves
        u_waveSteepness : {value : 0.08},
        u_waveLength : {value : 12.0},
        u_waveSpeed : {value : 1.2},
    },

    // Vertex
    glsl`
        varying vec2 vUv;
        varying vec3 viewZ;
        varying vec4 vPos;


        uniform float u_Time;
        uniform float u_waveSteepness;
        uniform float u_waveLength;
        uniform float u_waveSpeed;

        vec3 GerstnerWave(vec3 pos, float steepness, float wavelength, float speed, float direction){
            direction = direction * 2.0 - 1.0;
            vec2 d = normalize(vec2(cos(3.14159 * direction), sin(3.14159 * direction)));
            float k = 2.0 * 3.14159 / wavelength;
            float f = k * (dot(d, pos.xz) - speed * u_Time);
            float a = steepness / k;

            return vec3( d.x * (a * cos(f)), a * sin(f), d.y * (a * cos(f)));
        }

        vec3 CalcGerstnerWaves(vec3 pos, float steepness, float wavelength, float speed, vec4 directions1, vec4 directions2){
            vec3 offset = vec3(0,0,0);
            offset += GerstnerWave(pos, steepness, wavelength, speed, directions1.x);
            offset += GerstnerWave(pos, steepness, wavelength, speed, directions1.y);
            offset += GerstnerWave(pos, steepness, wavelength, speed, directions1.z);
            //offset += GerstnerWave(pos, steepness, wavelength, speed, directions1.w);
            offset -= GerstnerWave(pos, steepness, wavelength, speed, directions2.x);
            offset += GerstnerWave(pos, steepness, wavelength, speed, directions2.y);
            offset += GerstnerWave(pos, steepness, wavelength, speed, directions2.z);
            //offset += GerstnerWave(pos, steepness, wavelength, speed, directions2.w);
            return offset;
        }

        void main(){
            vec4 directions1 = vec4(0, 0.5, 0.2, 1);
            vec4 directions2 = vec4(-0.25, 0.4, -0.7, 0.55);
            vec4 gertstner = vec4(CalcGerstnerWaves(position, u_waveSteepness, u_waveLength, u_waveSpeed, directions1, directions2), 0.0);
            vec4 modelPos = modelMatrix * vec4(position, 1.0);
            modelPos += gertstner;
            //vPos = projectionMatrix * modelViewMatrix * (gertstner+vec4(position, 1.0));
            vPos = projectionMatrix * viewMatrix * modelPos;
            gl_Position = vPos;
            viewZ = -(modelViewMatrix * vec4(position.xyz, 1.0)).xyz;
            vUv = uv;
        }
    `,

    // Fragment
    glsl`
        #include <packing>

        varying vec2 vUv;
        varying vec3 viewZ;
        varying vec4 vPos;
        
        uniform vec3 u_shallowColor;
        uniform vec3 u_deepColor;

        uniform sampler2D u_depthTexture;
        uniform float u_cameraNear;
        uniform float u_cameraFar;
        uniform float u_depthDistance;

        uniform float u_Time;

        uniform sampler2D u_distortionTex;

        #pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
        #pragma glslify: cnoise2 = require(glsl-noise/classic/2d)

        float readDepth(sampler2D depthSampler, vec2 coord){
            float fragCoordZ = texture(depthSampler, coord).x;
            float zView = perspectiveDepthToViewZ(fragCoordZ, u_cameraNear, u_cameraFar);
            //float zView = orthographicDepthToViewZ(fragCoordZ, u_cameraNear, u_cameraFar);
            //return viewZToPerspectiveDepth(zView, u_cameraNear, u_cameraFar);
            return viewZToOrthographicDepth(zView, u_cameraNear, u_cameraFar);
        }

        void main(){
            float depth = readDepth(u_depthTexture, vUv);

            vec4 vCoords = vPos;
            vCoords /= vPos.w;
            vCoords = vCoords * 0.5 + 0.5;

            vec4 screenCoords = fract(vCoords);
            float mixed = (screenCoords.x + screenCoords.y);
            //gl_FragColor = vec4(mixed, mixed, mixed,1);

            // gl_FragColor = vec4(vUv.xy,0, 1.0);
            //gl_FragColor = vec4(0,0,gl_FragDepth,1);
            //gl_FragColor = vec4(1,0,0,1);

            // gl_FragColor.rgb = 1.0-vec3(depth);
            // gl_FragColor.a = 1.0;
            //gl_FragColor = vec4(vUv.xy, 0, 1);
            float depthFade = clamp( 1.0 - ((depth + mixed)/(u_depthDistance)), 0.0, 1.0);
            //float depthFade = saturate(depth - mixed)
            //gl_FragColor.rgb = vec3(depthFade);
            //gl_FragColor.rgb = vec3(depth);

            vec3 colorA = vec3(68.0/256.0,198.0/256.0,220.0/256.0);
            vec3 colorB = vec3(2.0/256.0,72.0/256.0,138.0/256.0);

            vec2 noiseScroll = vec2(-0.03, 0.03);

            vec2 noiseUV = vec2(vUv.x + u_Time * noiseScroll.x, vUv.y + u_Time * noiseScroll.y);
            float noiseVal = snoise2(noiseUV * 3.0) * 0.05;

            float distortionAmount = 0.13;
            vec2 distortSample = (texture(u_distortionTex, vUv).xy * 2.0 - 1.0) * distortionAmount;

            vec2 cNoiseScroll = vec2(0.01, 0.02);
            vec2 cNoiseUV = vec2((vUv.x + u_Time * cNoiseScroll.x) + distortSample.x, (vUv.y + u_Time * cNoiseScroll.y) + distortSample.y);
            float cNoiseVal = cnoise2(cNoiseUV * 100.0);
            cNoiseVal = cNoiseVal > 0.72 ? 1.0 : 0.0;
            

            gl_FragColor.rgb = mix(colorB, colorA, mixed) + cNoiseVal - noiseVal;
            gl_FragColor.a = 1.0;
            //gl_FragColor.rgb = 1.0 - vec3(depth);

            //gl_FragColor = vec4(u_depthDistance,0,0,1);
        }
    `
)

extend( {WaterShader} )
export {WaterShader}