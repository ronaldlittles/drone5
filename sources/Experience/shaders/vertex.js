import * as THREE from 'three';
const vertexShader = {

  

  vertexShader: `

  
    varying vec2 vUv;
    
    varying vec3 newPosition;

    //varying vec3 vNormal;

    
    uniform float uNoise;
  
    uniform vec2 uvScale;
  
    uniform float time; 
    
    

  void main() {

    //vNormal = normal;

    vUv =  uv * uvScale; 

    newPosition = position;
     
   
  
    vec4 mvPosition = modelViewMatrix * vec4(newPosition  , 1.0 );
  
  

    gl_Position = projectionMatrix * mvPosition;

  }

   
			`,

      vertexShader2: `


uniform float time;
uniform float lifeRange;
uniform vec3 offsetRangeMin;
uniform vec3 offsetRangeMax;
uniform float scaleMin;
uniform float scaleMax;
uniform float rotateMin;
uniform float rotateMax;

varying vec2 vUv;


uniform sampler2D texture1;

//attribute vec3 position;
attribute vec3 aRandom;
attribute float aSize;

varying vec4 vColor;
varying float vOpacity;

float timerLocal(float t, float tMax) {
    return mod(time * t, tMax);
}

vec2 rotateUV(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 rotationMatrix = mat2(c, -s, s, c);
    return rotationMatrix * uv;

}

float random(in vec2 st) {
  return fract(sin(dot(st.xy,
                       vec2(12.9898,78.233)))
               * 43758.5453123);
}


void main() {


    float timer2 = timerLocal(0.02, 1.0);
    float lifeTime = mod(timer2 * lifeRange, 1.0);
    float scale = mix(scaleMin, scaleMax, lifeTime);
    float rotate = mix(rotateMin, rotateMax, lifeTime);
    

    scale *= lifeTime;
    
  

    vec2 uv_rotated = rotateUV(uv, timer2 * rotate);
    vColor = texture2D(texture1, uv_rotated);
    vOpacity = 1.0 - lifeTime;

    vec3 newPosition = position;

    

   newPosition.y *=  aRandom.y + lifeTime;

    
    gl_PointSize = 50.0 * aSize * aRandom.x;

    vec3 offset = mix(offsetRangeMin, (offsetRangeMax*aRandom)*10.0, lifeTime);
    vec4 mvPosition = modelViewMatrix * vec4(newPosition + offset, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}


     
        `,

        vertexShader3: `


  varying vec2 vUv;
  varying vec3 newPosition;
  varying vec3 vNormal;
  uniform sampler2D texture2;
  uniform float uNoise;
  //uniform float uvScale;
  uniform float time;

  void main() {
    vUv = uv * .000000001;
    vec3 vPosition = position;
    // Generate terrain height using noise function
    //float height = noise(vec3(position.x, position.y, time)) * 10.0;



    vec3 heightColor = texture2D(texture2, vUv).rgb;

   

    
    vNormal = normalMatrix * normal;

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }

`,

vertexShader4: `


varying vec2 vUv;
uniform float time;
uniform sampler2D texture1;


void main(){

  float max = .05;
  vUv = uv;

  vec3 newPosition = position;

  vec4 color = texture2D(texture1, vUv);

  float height = color.r;
  

  float base = 0.0;

newPosition.z -= height*max;
//newPosition.y += 100.0 ;


  
 

  
  
vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
gl_Position = projectionMatrix * mvPosition;

}

`,






     
      
};

export { vertexShader };