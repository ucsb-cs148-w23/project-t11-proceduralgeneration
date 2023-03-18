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
        u_sunset : {value : 0},
        
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
        u_waveLod : {value : 1},
    },

    // Vertex
    glsl`
        varying vec2 vUv;
        varying vec4 vPos;
        varying vec3 vNormal;


        uniform float u_Time;
        uniform float u_waveSteepness;
        uniform float u_waveLength;
        uniform float u_waveSpeed;
        uniform float u_waveLod;

        vec3 GerstnerWave(vec3 pos, float steepness, float wavelength,float direction, inout vec3 tangent, inout vec3 binormal){
            direction = direction * 2.0 - 1.0;
            vec2 d = normalize(vec2(cos(3.14 * direction), sin(3.14 * direction)));
            float k = 2.0 * 3.14 / wavelength;
            float c = sqrt(9.8/k) / u_waveSpeed;
            float f = k * (dot(d, pos.xz) - c * u_Time);
            float a = steepness / k;

            tangent += vec3(-d.x * d.x * (steepness * sin(f)), d.x * (steepness * cos(f)), -d.x * d.y * (steepness * sin(f)));
            
            binormal += vec3(-d.x * d.y * (steepness * sin(f)), d.y * (steepness * cos(f)), -d.y * d.y * (steepness * sin(f)));

            return vec3( d.x * (a * cos(f)), a * sin(f), d.y * (a * cos(f)));
        }

        vec3 CalcGerstnerWaves(vec3 pos, float steepness, float wavelength, vec4 directions1, vec4 directions2, inout vec3 normal){
            vec3 offset = vec3(0.0,0.0,0.0);
            vec3 tangent = vec3(1.0,0.0,0.0);
            vec3 binormal = vec3(0.0,0.0,1.0);
            offset += GerstnerWave(pos, steepness, wavelength, directions1.x, tangent, binormal);
            offset += GerstnerWave(pos, steepness+(0.03/u_waveLod), 1.5*wavelength, directions1.y, tangent, binormal);
            offset += GerstnerWave(pos, steepness-(0.01/u_waveLod), wavelength, directions1.z, tangent, binormal);
            offset += GerstnerWave(pos, steepness, 0.5*wavelength, directions1.w, tangent, binormal);
            offset -= GerstnerWave(pos, steepness, wavelength, directions2.x, tangent, binormal);
            offset += GerstnerWave(pos, steepness-(0.01/u_waveLod), 0.9*wavelength, directions2.y, tangent, binormal);
            offset -= GerstnerWave(pos, steepness, 1.1*wavelength, directions2.z, tangent, binormal);
            offset += GerstnerWave(pos, steepness, 0.7*wavelength, directions2.w, tangent, binormal);

            normal = normalize(cross(binormal, tangent));
            return offset;
        }

        void main(){
            vec4 directions1 = vec4(0, 0.5, 0.2, 1);
            vec4 directions2 = vec4(-0.25, 0.4, -0.7, -1);
            vec3 norm = vec3(0);
            vec4 gertstner = vec4(CalcGerstnerWaves(position, u_waveSteepness, u_waveLength, directions1, directions2, norm), 0.0);
            vec4 modelPos = modelMatrix * vec4(position, 1.0);
            modelPos += gertstner;
            //vPos = projectionMatrix * modelViewMatrix * (gertstner+vec4(position, 1.0));
            vPos = projectionMatrix * viewMatrix * modelPos;
            gl_Position = vPos;
            vNormal = norm;
            vUv = uv;
        }
    `,

    // Fragment
    glsl`
        #include <packing>

        varying vec2 vUv;
        varying vec4 vPos;
        varying vec3 vNormal;
        
        uniform vec3 u_shallowColor;
        uniform vec3 u_deepColor;
        uniform float u_sunset;

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
            

            vec3 waterColor = mix(colorB, colorA, mixed) + cNoiseVal - noiseVal;
            gl_FragColor.a = 1.0;
            //gl_FragColor.rgb = 1.0 - vec3(depth);
            vec3 lightColor = vec3(1.0, 0.335, 0.32);
            //lightColor = vec3(0.7);
          
            // ambient
            float ambientStrength = 1.1;
            vec3 ambient = ambientStrength * lightColor;
          
            // Diffuse 
            vec3 norm = vNormal;
            vec3 lightDir = normalize(vec3(20.0,20.0,20.0) - vPos.xyz);
            float diff = max(dot(norm, lightDir), 0.0);
            vec3 diffuse = diff * lightColor;
          
            vec3 result = (u_sunset * (ambient + diffuse) * ambientStrength * waterColor) + (waterColor * float(int(u_sunset) ^ 1));
            gl_FragColor.rgb = vec3(result);
            //gl_FragColor = vec4(u_depthDistance,0,0,1);
        }
    `
)

extend( {WaterShader} )
export {WaterShader}