const fragmentShader = {
  fragmentShader: `



  mat2 rotate(float angle){
    
      float c = cos(angle);
      float s = sin(angle);

      return mat2(c, -s, s, c);

    
  }

  uniform float time;
  uniform vec2 uvScale;
  uniform float uNoise;

  uniform float fogDensity;
	uniform vec3 fogColor;

	uniform sampler2D texture1;
	uniform sampler2D texture2;
  
  varying vec2 vUv;
  


void main() {
  

    float angle = 1.5708;
  
    mat2 rotationMatrix = rotate(angle);
  
    vec2 position = -1.0 + 2.0 * vUv;
  
    vec4 noise = texture2D(texture1, vUv);
    vec2 T1 = vUv + vec2(1.5, -1.5) * time * 0.02;
    vec2 T2 = vUv + vec2(-0.5, 2.0) * time * 0.01;
  
    T1.x += noise.x * 2.0;
    T1.y += noise.y * 2.0;
    T2.x -= noise.y * 0.2;
    T2.y += noise.z * 0.2;
  
    float p = texture2D(texture1, T1 * 2.0).a;
  
    vec4 color = texture2D(texture2, T2 * 2.0);
    vec4 temp = color * (vec4(p, p, p, p) * 2.0) + (color * color - 0.5);
  
    if (temp.r > 1.0) { temp.bg += clamp(temp.r - 2.0, 0.0, 100.0); }
    if (temp.g > 1.0) { temp.rb += temp.g - 1.0; }
    if (temp.b > 1.0) { temp.rg += temp.b - 1.0; }
  
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    const float LOG2 = 1.442695;
    float fogFactor = exp2(-fogDensity * fogDensity * depth * depth * LOG2);
    fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);
  
    // Apply fog directly to the alpha channel
    temp.a *= fogFactor;
  
    gl_FragColor = noise + vec4(uNoise,0.0,0.0,1.0);
  
  

}
  

      

`,

  fragmentShader2: `

  precision highp float;

  uniform sampler2D splinePoints; 
     
      uniform float uNoise;
      uniform float time;
      uniform vec2 uvScale;

      varying vec2 vUv;

      //varying vec3 vNormal;
      //varying vec3 vTangent;
      //varying vec3 vBinormal;
      varying vec3 vPosition;

      uniform sampler2D texture2;

      void main() {

        
        
        vec4 mountainColor = vec4(.0, .0, .0,.05);

        //vec3 translation =  vNormal * vTangent;

        //translation.x *= -sin(time);


        vec4 heightColor = texture2D(texture2, vUv);
        vec4  mixed = mix( heightColor,mountainColor, .9);                                                                                         


       
        gl_FragColor = vec4( mixed);
        
    }
    
    
      
  


  `,

  fragmentShader3: `

  
  #define NUM_PARTICLES 25.
  #define NUM_EXPLOSIONS 3.

  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform float time;
  uniform vec3 tangent;
  uniform float uNoise;
  uniform sampler2D texture1;


  mat2 rotate(float angle){
    
    float c = cos(angle);
    float s = sin(angle);

    return mat2(c, -s, s, c);

  
}

vec2 Hash12(float t){

  float x = fract(sin(t*674.3) * 453.2);
  float y = fract(sin((t+x)*714.3)*263.2);

  return vec2(x, y);

}



float Explosion(vec2 uv, float t) {

  float sparks = 2.0;

  for(float i=0.0; i< NUM_PARTICLES; i++){

    vec2 dir = Hash12_Polar(i+1.0)*.5;  //.5

    vec2 center = vec2(0.5, 0.5);

    vec2 iResolution = vec2(center)*.5;

    float d = length((vUv) - dir *  t);

    float brightness = mix(.005, .002,smoothstep(.05, 0.0, t) );

    brightness *= sin(t*20.+i)*.5 + .5;
    brightness *= smoothstep(.1, 0.75, t);

    sparks += brightness/d; 

    }

    return sparks;

    }



       
        void main() {

          vec3 col = vec3(0.0);
            
         

          for(float i=0.0; i< NUM_EXPLOSIONS; i++){

            float t = time + i/NUM_EXPLOSIONS;
            float ft = floor(t);
            vec3 color = sin(4.0 * vec3(.34,.54,.43)*ft)*.25+.75;

            vec2 offs = Hash12(i+1.0+ft)-.5;
            offs *= vec2(1.77, 1.0);
            
            col += Explosion(vUv-offs,fract(time))*color;

          }

          col*=2.0;

          gl_FragColor = vec4(col, 1.0);

        }


    `,

  fragmentShader4: `




uniform sampler2D texture1;
uniform vec2 iResolution;
uniform vec2 iMouse;
varying vec4 vColor;
varying float vOpacity;

void main() {


  
  float distance = length(gl_PointCoord-vec2(.5));



  vec4 color = texture2D(texture1, gl_PointCoord+distance);


  float threshold = .5;

  if(distance > threshold){

    discard;

  } 
    gl_FragColor = color + vec4(vColor.rgb, vColor.a * vOpacity);
}



`,


fragmentShader5: `


uniform sampler2D texture1;
varying vec2 vUv;

void main(){

  

  vec4 height = texture2D(texture1, vUv);

  vec3 color1 = vec3(height);

  gl_FragColor = vec4(color1.rgb,1.0);
  
}



`,

}; 

  


export { fragmentShader };
