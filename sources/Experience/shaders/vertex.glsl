

    //#include ./includes/hash12polar.glsl
    #include ./includes/hash.glsl
  
    varying vec2 vUv;
    
    varying vec3 newPosition;

    varying vec3 vNormal;

    
    uniform float uNoise;
  
    uniform vec2 uvScale;
  
    uniform float time;

    uniform float uTime; 
    
    uniform sampler2D texture1;

    
    uniform vec3 vTangent;

 
 


  void main() {

    vNormal = normal;

    vec2 hash = Hash12_Polars(time);
    vec2 hashly = Hash12_Polar(time);

    //float hash1 = hash(uv);

    
    
    vec3 newPosition =  position;

  

    float noisec = cnoise(newPosition);

    vUv = uv * uvScale;


    
    float frequency = 1.3;
    float magnitude = 5.1;

  
    //vec2 noise = curlNoise(vec2(newPosition.y * frequency + time , newPosition.z * noisec));
    
    
    float tl = length(noisec);


    newPosition.z -=  sin(-1.0 *(((-noisec/1.5) * (noisec/1.5))));
    

    if(uTime < 1.0){

      newPosition.z = 0.0;
      
    }
  
    gl_Position = projectionMatrix * modelViewMatrix *  vec4( newPosition, 1.0 );


  

  }