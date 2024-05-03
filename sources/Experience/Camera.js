import * as THREE from "three";
import Experience from "./Experience.js";
import {  OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {DragControls} from 'three/examples/jsm/controls/DragControls.js';
import World from './World.js'
import EventEmitter from './Utils/EventEmitter.js'
//import * as Tweakpane from 'tweakpane';
//import { TubeBufferGeometry } from "three";

export default class Camera {
  constructor(_options) {
   
    // Options
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.scene3 = this.experience.scene3;
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.targetElement = this.experience.targetElement;
   
    this.resources = this.experience.resources;
  
   
    // Set up
    this.mode = "debug"; // defaultCamera \ debugCamera
    //this.createOrthographicCamera()
    this.setInstance();
    this.setInstance2();
    this.setOrbitControls()
    this.setModes()
    //this.setMapControls()
    //this.setDebug()
    //this.setDragControls();
     
      
           
  }


  setInstance() {

   
    this.instance = new THREE.PerspectiveCamera(
      60,
      this.sizes.aspect,
      .1,
     10000
    );

    this.instance.rotation.reorder("YXZ");
    //this.instance.matrixAutoUpdate = true;
    this.instance.updateProjectionMatrix();
    this.instance.matrixWorldNeedsUpdate = true;
    this.instance.position.set(0,100,1200);
    //this.instance.lookAt(this.scene2.position)
   
    this.scene2.add(this.instance);
   

   
  }

  setInstance2() {

    this.instance2 = new THREE.PerspectiveCamera(
      60,
      this.sizes.aspect,
      .1,
      10000
    );
    this.instance2.rotation.reorder("XYZ");
    this.instance2.matrixAutoUpdate = true;
    this.instance2.updateProjectionMatrix();
    this.instance2.matrixWorldNeedsUpdate = true;
    this.instance2.position.set(0, 10000000, 0);
    this.instance2.lookAt(this.scene2.position)
    

     //this.scene.add(this.instance2);


  }

  createOrthographicCamera() {

    this.orthographicCamera = new THREE.OrthographicCamera(
     (-this.sizes.aspect * this.sizes.frustrum) ,
     (this.sizes.aspect * this.sizes.frustrum) ,
     this.sizes.frustrum ,
      -this.sizes.frustrum ,-100,10000
      -50,
    50
    
    )
    // 6.5
    this.orthographicCamera.position.set(0,0,0);
    this.orthographicCamera.lookAt(this.scene3.position);
   this.orthographicCamera.rotation.x = Math.PI/2;

   this.scene3.add(this.orthographicCamera)

    this.scene3.add( new THREE.CameraHelper(this.orthographicCamera))

  }


  setOrbitControls() {


    this.orbitControls = new OrbitControls(this.instance, this.targetElement);
    this.orbitControls.enabled = true;
    //this.orbitControls.screenSpacePanning = true;
    this.orbitControls.enableKeys = false;
    this.orbitControls.zoomSpeed = 3.5;
    this.orbitControls.enableDamping = true;
   // this.orbitControls.autoRotate = true;
    this.orbitControls.autoRotateSpeed = 5
    //this.orbitControls.maxPolarAngle = Math.PI/2;
    //this.orbitControls.minPolarAngle = Math.PI/2;

   
   
  }


  

  setMapControls(){

    this.mapControls = new MapControls(this.instance2, this.targetElement );
console.log(this.mapControls)
    //mapControls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    this.mapControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.mapControls.dampingFactor = 0.05

    this.mapControls.screenSpacePanning = false;

    this.mapControls.minDistance = 50;
    this.mapControls.maxDistance = 200;

   // this.mapControls.minPolarAngle = Math.PI/2

    this.mapControls.maxPolarAngle = Math.PI/2

   // this.mapControls.minAzimuthAngle = 0
    this.mapControls.maxAzimuthAngle = Math.PI/2

    //this.mapControls.rotateSpeed = 25

    //this.mapControls.zoomSpeed = 25
this.mapControls.enablePan = true
this.mapControls.enableRotate = false
this.mapControls.enableZoom = false
    
}

  setDebug() {
    if (this.debug) {
      this.debug.add(this.instance.position, "z").onChange(() => {
        this.instance.position.set(this.instance);
      });
      this.debug.add(this.instance.rotation, "y", 0, 100, 0.5);
    }
  }

  setModes() {
    this.modes = {};

    // Default
    this.modes.default = {};
    this.modes.default.instance = this.instance.clone();
    this.modes.default.instance.rotation.reorder("YXZ");

    // Debug
    this.modes.debug = {};
    this.modes.debug.instance = this.instance.clone();
    this.modes.debug.instance.rotation.reorder("YXZ");
    this.modes.debug.instance.position.set(0, 100, 1200);

    this.modes.debug.orbitControls = new OrbitControls(
      this.modes.debug.instance,
      this.targetElement
    );
    this.modes.debug.orbitControls.enabled = this.modes.debug.active;
    this.modes.debug.orbitControls.screenSpacePanning = true;
    this.modes.debug.orbitControls.enableKeys = false;
    this.modes.debug.orbitControls.zoomSpeed = 0.25;
    this.modes.debug.orbitControls.enableDamping = true;
    this.modes.debug.orbitControls.update();

    
  }

  resize() {
    this.instance.aspect = this.config.width / this.config.height;
    this.instance.updateProjectionMatrix();

    this.modes.default.instance.aspect = this.config.width / this.config.height;
    this.modes.default.instance.updateProjectionMatrix();

    this.modes.debug.instance.aspect = this.config.width / this.config.height;
    this.modes.debug.instance.updateProjectionMatrix();
  }

  setDragControls(){

    this.objects = this.scene2.children
    

    this.controls = new DragControls( this.objects, this.instance2,  this.targetElement );

    this.controls.activate()
    const objectsList = this.controls.getRaycaster()
    

   
    //this.controls.transformGroup = false;
 
    this.controls.addEventListener( 'dragstart', function ( event ) {
    
    //this.orbitControls.enabled = false
    
    } );

    this.controls.addEventListener( 'dragend', function ( event ) {
        
      //this.orbitControls.enabled = true
    
  } );
    
    this.controls.addEventListener( 'hoveroff', function ( event ) {
        
        //this.orbitControls.enabled = true
      
    } );


}

  update() {
   
  this.orbitControls.update()
  //this.mapControls.update()

  //this.azimuth = this.orbitControls.getAzimuthalAngle()




    //this.instance.position.x += 10;
    //this.instance.position.y += 1;
  
   

    //this.orthographicCamera.rotation.z = this.time.delta*.0009
    // Apply coordinates
    /* this.instance.position.copy(this.modes[this.mode].instance.
        position)
        this.instance.quaternion.copy(this.modes[this.mode].instance. 
        quaternion)
        this.instance.updateMatrixWorld() // To be used in projection*/
    //this.instance.updateMatrixWorld();
  }

  destroy() {
    //this.modes.debug.orbitControls.destroy()
  }
}
