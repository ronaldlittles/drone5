const heightMapShader = {

fragment:`


//uniform sampler2D heightMap1;
varying vec2 vUv;
varying vec3 vertexColor;

void main()
{

    
  //vec4 color = texture2D(heightMap1, vUv);


gl_FragColor = vec4(vertexColor.xy,.5,1.0);

}

`,

vertex:`
#define NUM_POINTS 450

uniform float elevationFactor;
uniform float elevationThresholdX; // X position to determine elevation
varying vec3 vertexColor;

void main() {
    vec3 newPosition = position;

    // Check if the vertex is on the left side of the elevation threshold
    if (newPosition.x < elevationThresholdX) {
        // Calculate elevation based on the distance from the elevation threshold
        float distanceToThreshold = abs(newPosition.x - elevationThresholdX);
        float elevation = elevationFactor / (1.0 + distanceToThreshold);
        
        // Elevate the vertex along the y-axis
        newPosition.y += elevation;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    
    // Assign color based on the elevation factor
    vertexColor = vec3(elevationFactor);
}




`


}

export { heightMapShader }