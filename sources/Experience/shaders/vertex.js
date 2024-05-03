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

      
     //#include ./includes/hash.glsl
    
      //#define NUM_POINTS 450


     
      //uniform float uPoints[NUM_POINTS];
      
      //vec3 recPoints[NUM_POINTS / 3];
     

      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform sampler2D texture1;
      uniform float uNoise; 
     //uniform float uPoints[];
      attribute vec3 aRandom;
      attribute float aSize;
      //attribute vec3 position;

      //attribute vec3 attributes;
      
      float PI = 3.141592653589793238;
      
      
      void main() {

        

        vUv = uv; 


        vec3 displacedPosition = position;

        
        //displacedPosition.z *= sin(.0001 + (time*.05));
        //displacedPosition.x *= cos(.0001 + (time*.05));
        
        //displacedPosition.y *= sin(time*.005);//cos(.0001 + (time*.05));
        

        vec3 color = texture2D(texture1, vUv).rgb;

        //vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1. );
        

      

        gl_PointSize = 50.0 * aSize * aRandom.x;

        
       // gl_Position = projectionMatrix * mvPosition;

        //mvPosition.z *= 5.0;

        vec4 modelPosition = modelMatrix * vec4(displacedPosition, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        gl_Position = projectionMatrix * viewPosition;
    
        
      
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