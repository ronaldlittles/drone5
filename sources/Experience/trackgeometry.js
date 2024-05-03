import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"
import TShirt from "./tshirt.js";
//import { vertexShader } from "./shaders/vertex.js";
//import { fragmentShader } from "./fragment.js";
import GSAP from 'gsap';
import { Vector3 } from "three";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
//import { bindVertexBufferToProgramAttribute } from "@tensorflow/tfjs-backend-webgl/dist/webgl_util.js";
import ShaderTest from "./shadertest.js";
import vertexShaders from "./shaders/vertex.glsl"
import fragmentShaders from "./shaders/fragment.glsl"

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js';


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

    //this.setWebGPU()
    this.setShader()
    //this.setGeometry()
    this.setGeometry2()
    this.setCirlces()
    this.setBackGroundPlane()
    this.setScene3()


    }

    setWebGPU(){

// create nodes

const lifeRange = range( .1, 1 );
const offsetRange = range( new THREE.Vector3( - 2, 3, - 2 ), new THREE.Vector3( 2, 5, 2 ) );

const timer2 = timerLocal( .2, 1/*100000*/ ); // @TODO: need to work with 64-bit precision

const lifeTime = timer2.mul( lifeRange ).mod( 1 );
const scaleRange = range( .3, 2 );
const rotateRange = range( .1, 1 );

const life = lifeTime.div( lifeRange );

const fakeLightEffect = positionLocal.y.oneMinus().max(.5 );

const textureNode = texture( map, uv().rotateUV( timer2.mul( rotateRange ) ) );

const opacityNode = textureNode.a.mul( life.oneMinus() );

const smokeColor = mix( color( 0x2c1501 ), color( 0x0000ff ), positionLocal.y.mul( 3 ).clamp() );

// create particles

const smokeNodeMaterial = new SpriteNodeMaterial()
smokeNodeMaterial.colorNode = mix( color( 0x0000ff ), smokeColor, life.mul( 2.5 ).min( 1 ) ).mul( fakeLightEffect );
smokeNodeMaterial.opacityNode = opacityNode;
smokeNodeMaterial.positionNode = offsetRange.mul( lifeTime );
smokeNodeMaterial.scaleNode = scaleRange.mul( lifeTime.max( .001 ) );
smokeNodeMaterial.depthWrite = false;
smokeNodeMaterial.transparent = true;
for(let i=0; i<15; i++){

const smokeInstancedSprite = new THREE.Mesh( new THREE.BoxGeometry( 1, 1,1), smokeNodeMaterial );
smokeInstancedSprite.scale.setScalar( 100 );
smokeInstancedSprite.isInstancedMesh = true;
smokeInstancedSprite.count = 2000;
smokeInstancedSprite.position.set(Math.random()*1000 -500,Math.random()*1000 -500,Math.random()*1000 -500)
this.scene.add( smokeInstancedSprite );
smokeArray.push(smokeInstancedSprite)

//

const fireNodeMaterial = new SpriteNodeMaterial();
fireNodeMaterial.colorNode = mix( color( 0x000000 ), color( 0x000000 ), life );
fireNodeMaterial.positionNode = range( new THREE.Vector3( - 1* Math.random(), 1* Math.random(), - 1 * Math.random()), new THREE.Vector3( 1, 2, 1 ) ).mul( lifeTime );
fireNodeMaterial.scaleNode = smokeNodeMaterial.scaleNode;
fireNodeMaterial.opacityNode = opacityNode;
fireNodeMaterial.blending = THREE.AdditiveBlending;
fireNodeMaterial.transparent = true;
fireNodeMaterial.depthWrite = false;

const fireInstancedSprite = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), fireNodeMaterial );
fireInstancedSprite.scale.setScalar( 200 );
fireInstancedSprite.isInstancedMesh = true;
fireInstancedSprite.count = 300;
fireInstancedSprite.position.y =  100;
fireInstancedSprite.renderOrder = 1;
this.scene.add( fireInstancedSprite );
fireInstancedSprite.position.copy(smokeInstancedSprite.position)
}

      
    }

    

    setShader(){

      this.terrainShader = new THREE.ShaderMaterial({

        transparent: true,
        side: THREE.DoubleSide,
        //wireframe: true,
        
        uniforms: {
  
          time: { value: 1.0 },

          uTime: { value: 1.0 },

          uvScale: { value: new THREE.Vector2(.5, .5) },

          vTangent: { value: new THREE.Vector3() },
         
          texture1: { value: this.renderer.renderTarget2.texture },
          texture2: { value: this.resource1 },
        },
     
        vertexShader: vertexShaders,
        fragmentShader: fragmentShaders,
      })

      this.terrainGeometry = 

      new THREE.PlaneGeometry(4,2,1024,1024)

      

      this.terrain = new THREE.Mesh( this.terrainGeometry, this.terrainShader


    )

    //this.terrainShader.uniforms.needsUpdate = true;


    this.scene.add(this.terrain)

    
    this.terrain.rotation.x += Math.PI/2
    //this.scene2.add(this.terrain)
    this.terrain.scale.setScalar(1200)
    this.terrain.position.set(0,-400,0)
    this.terrain.receiveShadow =true
    

    
   // this.resource1.wrapS = THREE.RepeatWrapping;

    //this.resource1.wrapT = THREE.RepeatWrapping;

    //this.resource1.repeat.set(8,8)


    }

    setBackGroundPlane(){

      this.PlaneGeometry = new THREE.PlaneGeometry(4,2)

      const pMaterials = {
        color: 'green',
        map: this.resource1,
        side: THREE.DoubleSide
      }

      this.PlaneMaterial = new THREE.MeshPhysicalMaterial(pMaterials)

      this.background = new THREE.Mesh(this.PlaneGeometry, this.PlaneMaterial)
      
      this.scene.add(this.background)

      this.background.position.set(0,0,-1500)

      //this.background.rotation.set(Math.PI/1.5,0,0)
      
      this.background.scale.setScalar(2000)

      this.background.castShadow = true

    }


    setCirlces(){


// Array to hold torus geometries
 var torusGeometries = [];
 this.toruses =[];

// Create 20 torus geometries with decreasing radii
for (var i = 0; i < 20; i++) {
    var radius = 1 - (i * 0.05);
    var tubeRadius = 0.009;
    var radialSegments = 64;
    var tubularSegments = 64;

    var geometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
    torusGeometries.push(geometry);
}

// Create materials for the toruses
var material = this.terrainShader;

// Create meshes for each torus geometry and position them inside each other
for (var i = 0; i < torusGeometries.length; i++) {
    this.torus = new THREE.Mesh(torusGeometries[i], material);
    this.offsetY = Math.sin(this.time.elapsed *i*15)*.5
    this.torus.position.set(0, this.offsetY, 200); // You can adjust the position as needed
    //this.scene.add(this.torus);
    this.torus.scale.setScalar(100)
    this.torus.castShadow = true
    this.toruses.push(this.torus)
    
}



let distance = 10;
console.log(GSAP)

/*
GSAP.to(this.toruses.position, {

  z: -50,
  ease: 'sine.inOut',
  stagger:{ each: .5, from: 'center', repeat: -1, yoyo: true}, 

});*/



    }

  
    setGeometry2(){

    const points = [];
    const R = 300; // Large circle radius
    const A = 5;  // Amplitude of the winding
    const B = 50;   // Amplitude of the humps
    const k = 25;   // Frequency of the winding
    const m = 10;   // Frequency of the humps
    const phi = 0; // Phase shift for the humps
    const segments = 3000; // Number of segments for smoothness
    
    for (let i = 0; i <= segments; i++) {
        let theta = (i / segments) * 2 * Math.PI; // Full circle
        let r = R + A * Math.sin(k * theta); // Modulated radius for winding
        let y = B * Math.sin(m * theta + phi); // Y for humps
        let x = r * Math.cos(theta);
        let z = r * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z).multiplyScalar(2))
    }
    
    this.curve = new THREE.CatmullRomCurve3(points);
    this.curve.arcLengthDivisions = 500
    this.geometry = new THREE.TubeGeometry(this.curve, segments, 12, 8, false);
    const material = new THREE.PointsMaterial({
       //color: 0x0000ff,
     map: this.resource1,
       transparent: true,
        opacity: .5,
        side: THREE.DoubleSide,
        //wireframe: true,
      size: 0.001
      
      });

    this.mesh = new THREE.Mesh(this.geometry, this.terrainShader);
    this.scene3.add(this.mesh);

    //this.geometry.computeVertexNormals()

    //this.geometry.attributes.normal.array.onUploadCallback(dispose)
  

  

    //this.mesh.visible = false;
    
    //this.mesh.scale.setScalar(5);
    
this.mesh2 = new THREE.Mesh(new THREE.SphereGeometry(1,36,36), this.terrainShader);
this.scene.add(this.mesh2);
this.mesh2.scale.setScalar(100);
this.mesh2Clone = this.mesh2.clone();




/*
let text;

 let text1 = new TTFLoader()

    text1.load( '/assets/ProtestRiot-Regular.ttf', function ( json ) {  

      let font = new Font(json)

      
       let textGeometry = new TextGeometry( 'Ronald Littles', {
        font: font,
        size: 600,
        depth: 20,
  
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 50,
        bevelSize: 2,
        bevelOffset: 2,
        bevelSegments: 10,


      })


    let material = new THREE.MeshBasicMaterial({color: 'red'})

      text = new THREE.Mesh( textGeometry,  material)
      
      this.scene.add( text )
      text.position.set(0, 200, 0)
      text.scale.setScalar(1000)
    
    

    })*/





this.light = new THREE.AmbientLight(0xffffff, .3);
this.light.position.set(0, 1500, 0);
//this.light.castShadow = true;
this.scene.add(this.light);

this.light2 = new THREE.DirectionalLight(0xffffff, 1);

this.light2.position.set(200, 600, 0);

this.light2.castShadow = true


this.scene.add(this.light2)


const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
directionalLight.position.set(300, 800, 200)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(512, 1024)
directionalLight.shadow.camera.near = 0.1
directionalLight.shadow.camera.far = 1000
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
this.scene.add(directionalLight)


    }
    

    setScene3(){

      const loader = new GLTFLoader()

      loader.load('/assets/model.gltf', (gltf) => {

        console.log(gltf.scene)

        this.hand = gltf.scene

        
      this.scene3.add(this.hand)

      
      this.hand.scale.set(3000,3000,3000)

      this.hand.rotation.set(Math.PI,0,0)
    

      })


    this.cubeArray = []


        //TODO instanced mesh / audio / bvh-csg
        
        for(let i=0; i<10; i++){

        this.cube2 = new THREE.Mesh(

                new RoundedBoxGeometry( .8, 1.5, .2, 24, 0.09 ),
  

            new THREE.MeshPhysicalMaterial({
                color: 0x0000ff,
                side: THREE.DoubleSide,
                clearcoat: 1.0,
                metalness: .3,
                roughness: .3,
                transparent: true,
                opacity: .8,
                transmission: .98,
                //map: this.resources.items.lennaTexture 
            })

        )

        this.cube2.position.x = (i)*.05
        
        this.cube2.position.y = Math.random()*10-5
        this.cube2.position.z= Math.random()*10-5

      this.scene3.add(this.cube2) 
      this.cube2.castShadow = true
      this.cube2.scale.setScalar(100)

      this.cubeArray.push(this.cube2)
    
      }

      
      
      this.light.position.set(10,10,10)

      this.light2 = new THREE.DirectionalLight(0xffffff,2.7)
      this.scene3.add(this.light2)

      this.light2.position.set(0,1,10)
      this.light2.lookAt(this.scene)
      this.light2.castShadow =true

      this.mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(8,.5,.5),
        new THREE.MeshStandardMaterial({color: 'yellow'})
      )

      this.scene3.add(this.mesh2)
     // this.mesh2.position.z=-1
      //this.mesh2.position.x = 3
      this.mesh2.receiveShadow=true
      this.mesh2.scale.setScalar(25)

      let distance = 13.5;
      let distance2 = 100.0;


      let gt = GSAP.timeline({ repeat:2, duration:1 })

      
      console.log(gt)
      
      gt.to(this.cube2.position, 2, {


        //x: this.cube2.position.x + Math.random() * distance - distance / 2,
        //y: this.cube2.position.y + Math.random() * distance - distance / 2,
        z: this.cube2.position.z + Math.random() * distance - distance / 2,
        ease: 'power2.easeOut',
        yoyo: true,
        repeat: -1,
        duration: 5,
        delay: 2,
     
      });

      gt.to(this.cube2.rotation, 5, {


        //x: this.cube2.rotation.x + Math.random() * distance2 - distance2 / 2,
        y: this.cube2.rotation.y + Math.random() * distance2 - distance2 / 2,
        //z: this.cube2.rotation.z + Math.random() * distance2 - distance2 / 2,
        ease: 'power2.easeOut',
        yoyo: true,
        repeat: -1,
        duration: 5,
        delay: 2,


     
      });


/*if(this.debug){

        //console.log(this.debug)
        
         this.debugFolder = this.debug.addFolder('cube')

         this.debugFolder.add(this.cube2.material,'opacity',0,1,.1)
         
         this.debugFolder.add(this.cube2.material,'clearcoat',0,1,.1)
         
         this.debugFolder.add(this.cube2.material,'transmission',0,1,.1)
         this.debugFolder.add(this.cube2.material,'roughness',0,1,.1)
         this.debugFolder.add(this.cube2.material,'metalness',0,1,.1)
}*/

    
    
      
    }


    update() {

      let duration = 3;

      this.uTime = performance.now() / 1000 % duration;

      //this.terrainShader.uniforms.uTime.value = this.uTime;

      let loopTime = 60;
      let speed = 2.5;


      
      let  t =  (speed * this.time.elapsed)/loopTime % 1;
      let t2 =  (speed * this.time.elapsed + 1.5)/loopTime % 1;

      
      this.terrainShader.uniforms.time.value = t

      let pos = this.curve.getPointAt(t);
      let pos2 = this.curve.getPointAt(t2)

      let upVector = new THREE.Vector3(0, 1, 0);

      this.tangent = this.curve.getTangentAt(t);
      let normal = new THREE.Vector3().crossVectors(this.tangent, upVector).normalize();
      let binormal = new THREE.Vector3().crossVectors( this.tangent,normal).normalize();
      let distanceAbove = 100;
      //let pointAbove = getPointAboveCurve(t, distanceAbove);
      //this.camera.instance.position.copy(pos)
      //this.camera.instance.lookAt(pos2);

      //this.terrainShader.uniforms.vTangent.value = this.tangent


      this.mesh2added=false

      if(!this.mesh2added ){

      this.scene.add(this.mesh2);
      this.mesh2added = true;

      }
       
      this.offset = new THREE.Vector3(0, -5, 0);
      this.offset2 = new THREE.Vector3(0, -800, -5000);
      this.mesh2.position.copy(pos).add(normal);


      let delay =3.8;



        //this.baloons.position.x = delay +(Math.random()*1000 - 500);

       // this.baloons.rotation.y += 0.01;

      //element.position.y =t+(Math.random() * 1000 - 500);

        //element.position.z =  Math.random() * 1000 - 500;

      

       // element.scale.setScalar(100*Math.random(t));


//this.light2.position.copy(pos)

       let tangentHelper = new THREE.ArrowHelper(this.tangent, pos, 35, 0xff0000); // Red for tangent
      let normalHelper = new THREE.ArrowHelper(normal, pos, 100, 0x00ff00); // Green for normal
      let binormalHelper = new THREE.ArrowHelper(binormal, pos, 10, 0x0000ff); // Blue for binormal
  
    
  tangentHelper.position.copy(pos2);
  tangentHelper.setDirection(this.tangent);
  normalHelper.position.copy(pos);
  normalHelper.setDirection(new THREE.Vector3(0,1,0));
  binormalHelper.position.copy(pos2);
  binormalHelper.setDirection(binormal);
  
      
      //this.scene.add(tangentHelper);
      //this.scene.add(normalHelper);
      //this.scene.add(binormalHelper);
   



}

}

