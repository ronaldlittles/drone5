

//#include ./includes/hash12polar.glsl
#include ./includes/hash.glsl
//#include ./includes/curl.glsl
//#include ./includes/gradient.glsl

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float time;
uniform vec3 vTangent;



varying vec2 vUv;
varying vec3 vNormal;






void main(){

  

  float speed = 1.5;

  float radius = .1;

  float random = random2(.434454321);

  float len = length(vUv -.5);

  vec2 offset = vec2(0.0,1.0);

  vec3 offset2 = vec3(0.0,-1.0,0.0);

  vec2 newUv =  vUv + offset * (time*5.);


  newUv.x *= offset.y + speed;

  vec2 hashly = Hash12_Polar(.5);

  vec2 curly = curlNoise(newUv);

  vec3 color = vec3(curly, sin(random));

  float noisec = cnoise(color);

  vec4 height = texture2D(texture1,fract(newUv));
  
  vec4 height2 = texture2D(texture2,fract(newUv));

  vec4 mixed = mix(height,height2,sin(newUv.x+time));



  gl_FragColor = vec4(mixed.rgb,1.0);

  //csm_FragColor = vec4(1.0,.5.5,1.0);


}