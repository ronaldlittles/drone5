import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";



export default class TrackGeometry extends EventEmitter {

    constructor() {
  
      super()
  
      this.experience = new Experience();
      this.config = this.experience.config;
      this.debug = this.experience.debug;
      
      this.resources = this.experience.resources;
      this.world = this.experience.world;
      this.scene = this.experience.scene;
      this.scene2 = this.experience.scene2;
      this.scene3 = this.experience.scene3;
      this.camera = this.experience.camera;
      this.time = this.experience.time;
      this.renderer = this.experience.renderer;
      this.targetElement = this.experience.targetElement;
    
      this.resource1 = this.resources.items.snowm;
      this.resource2 = this.resources.items.fluffy;
      this.resource3 = this.resources.items.sceneModel
      this.resource6 =  this.resources.items.hdr
      this.resource4 = this.resources.items.baloonsModel;
      this.resource5 = this.resources.items.buildingModel;
      this.resource7 = this.resources.items.riot

      
    }


    setGeometry(){
  
        this.numPoints = 3000;
        this.points = [];
        this.derivatives = [];
    
        
        let radius = 3000
    
        function figureEightCurve(t) {
    
          let x,y,z;
    
    
    /*const points = [];
    const numPoints = 100;
    for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 2; // Parametric parameter
        const x = Math.sin(t);
        const y = Math.sin(2 * t);
        const z = Math.cos(2 * t);
        points.push(new THREE.Vector3(x, y, z));
    }*/
    
    
           x = Math.sin(t ) * radius;
           z = (Math.sin(t) * Math.cos(t)) * radius;9
           y=0
    
           
          if(t >= (8*Math.PI/10) && t <= (12* Math.PI/10)){
              let a = (t-8 *Math.PI/10)* (Math.PI/ (12*Math.PI/10 - 8*Math.PI/10))
    
               y= Math.sin(a*3)* radius/6      
          }
     
        
        
       /* else 
          if(t > 3*Math.PI && t < 4*Math.PI){
    
            y =100// Math.sin(Math.PI*t*t)*40
    
          
    
          //x = -Math.sin(t * 2) * radius
          //z = -Math.cos(t) * radius
          //y = Math.sin(Math.PI*t*t)*40
    
        }*/
    
    
      return new THREE.Vector3(x, y, z)//.multiplyScalar(2);
      
    
      }
        
        function derivativeCurve(t) {
            const h = 0.0001;
            const dx = (figureEightCurve(t + h).x - figureEightCurve(t).x) / h;
            const dy = (figureEightCurve(t + h).y - figureEightCurve(t).y) / h;
            const dz = (figureEightCurve(t + h).z - figureEightCurve(t).z) / h;
        
            return new THREE.Vector3(dx, dy, dz);
        }
    
        
        
        
        for (let i = 0; i <= this.numPoints; i++) {
            let t = (i / this.numPoints) * Math.PI * 2;
            const point = figureEightCurve(t);
            this.points.push(point);
        
            const derivative = derivativeCurve(t).normalize();
            this.derivatives.push(derivative);
        }
        
        
       /* function calculateSurfaceArea(numPoints, derivativesArray) {
            let surfaceArea = 0;
        
            for (let i = 0; i < numPoints; i++) {
                const firstDerivative = derivativesArray[i];
        
                // For the last point, wrap around to the first derivative to close the loop
                const secondDerivative = (i === numPoints - 1) ? derivativesArray[0] : derivativesArray[i + 1];
        
                const crossProduct = new THREE.Vector3();
                crossProduct.crossVectors(firstDerivative, secondDerivative);
        
                const magnitude = crossProduct.length();
                surfaceArea += magnitude;
            }
        
            surfaceArea *= (Math.PI * 2) / numPoints;
        
            return surfaceArea;
        }
        
        const totalSurfaceArea = calculateSurfaceArea(this.numPoints, this.derivatives);
        console.log("Total Surface Area of the figure-eight curve:", totalSurfaceArea);
        
    
    
    function getPointAboveCurve(t, distanceAbove) {
    
        const pointOnCurve = figureEightCurve(t);  
        this.normalVector = derivativeCurve(t).normalize(); 
    
        
    
        const pointAboveCurve = new THREE.Vector3().copy(pointOnCurve).add(normalVector.multiplyScalar(distanceAbove));
    
        return pointAboveCurve
    
      }*/
    
      
    
        } 
    


}