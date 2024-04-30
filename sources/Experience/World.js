import * as THREE from 'three'
import Experience from './Experience.js'

//import WebGPU from 'three/examples/jsm/capabilities/WebGPU.js'
//import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js';

import { RapierPhysics } from 'three/examples/jsm/physics/RapierPhysics.js'


//import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import GSAP from "gsap";

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


//import wobbleVertexShader from '/shaders/vertex.glsl'
//import wobbleFragmentShader from '/shaders/fragment.glsl'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.scene = this.experience.scene

      

        this.cubeArray = []
        this.hand;
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setDummy()
                this.setCube()
            }
        })
    }

    setDummy()
    {

      const loader = new GLTFLoader()

        loader.load('/assets/model.gltf', (gltf) => {

          //console.log(gltf.scene)

          this.hand = gltf.scene

          
        this.scene.add(this.hand)

        
        this.hand.scale.set(10,10,10)

        this.hand.rotation.set(Math.PI,0,0)
        this.hand.position.x = -1

        })

        


        /*const debugObject = {}
        
        debugObject.colorA = '#0000ff'
        debugObject.colorB = '#ff0000'

        this.uniforms = {
          uTime: new THREE.Uniform(0),
          uPositionFrequency: new THREE.Uniform(0.5),
          uTimeFrequency: new THREE.Uniform(0.4),
          uStrength: new THREE.Uniform(0.3),
          uWarpPositionFrequency: new THREE.Uniform(0.38),
          uWarpTimeFrequency: new THREE.Uniform(0.12),
          uWarpStrength: new THREE.Uniform(1.7),
          uColorA: new THREE.Uniform(new THREE.Color(debugObject.colorA)),
          uColorB: new THREE.Uniform(new THREE.Color(debugObject.colorB))
      }*/

        this.resources.items.lennaTexture.encoding = THREE.sRGBEncoding
        
        this.cube1 = new THREE.Mesh(

            new THREE.BoxGeometry(2, 2, 2),

            /*new CustomShaderMaterial({

          

                baseMaterial:*/ new THREE.MeshBasicMaterial({

                //vertexShader: wobbleVertexShader,
                //fragmentShader: wobbleFragmentShader,
                //uniforms: this.uniforms,
                
  
             
                //color: 0x0000ff,
                //side: THREE.DoubleSide,
                //clearcoat: 1.0,
                //metalness: .1,
                //roughness: .5,
                //transparent: true,
                //opacity: .8,
                //transmission: .98,

             map: this.resources.items.lennaTexture 
            })
        )

       this.scene.add(this.cube1) 
        this.cube1.rotation.x += Math.PI/2


        this.cube1.position.set(4,0,-4)
        //this.cube1.receiveShadow = true
    
        
        this.light = new THREE.PointLight(0xff00ff,2.5)
        this.scene.add(this.light)
        this.light.lookAt(this.scene)
        //this.light.castShadow = true
      
       
    }

        setCube(){


            //TODO instanced mesh / audio / bvh-csg
            
            for(let i=0; i<100; i++){

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
    
          this.scene.add(this.cube2) 
          this.cube2.castShadow = true
          this.cube2.scale.setScalar(.5)

          this.cubeArray.push(this.cube2)
        
          }

          
          
          this.light.position.set(10,10,10)

          this.light2 = new THREE.DirectionalLight(0xffffff,2.7)
          this.scene.add(this.light2)

          this.light2.position.set(0,1,10)
          this.light2.lookAt(this.scene)
          this.light2.castShadow =true

          this.mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(8,.5,.5),
            new THREE.MeshStandardMaterial({color: 'yellow'})
          )

          this.scene.add(this.mesh2)
          this.mesh2.position.z=-1
          this.mesh2.position.x = 3
          this.mesh2.receiveShadow=true

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
    

    

    resize()
    {
    }


    // notes const animation = requestAnimationFrame( ... )
/*
cancelAnimationFrame( animation )

//

renderer.setAnimationLoop( ... )

renderer.setAnimationLoop( null )

*/

    update(){


      
/*
      if(this.hand){
      this.hand.rotation.y += .01
      }
        
      this.cubeArray.forEach((cube)=>{

        //cube.rotation.y += .05

        }) */

    }

    destroy()
    {
    }
}