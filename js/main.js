import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';
import {Bench, Skybox} from "./Objects.js";
import {Banco, Jardim, Tree, Lamp, TrashBin, Model } from "./Models.js";


const cubeRendertarget = new THREE.WebGLCubeRenderTarget(128, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding
})

const cubeCamera = new THREE.CubeCamera(1,10000, cubeRendertarget);

class Application {

    constructor() {
        this.objects = [];
        this.createScene();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;
        this.camera.position.y +=25;

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setClearColor( 0xcccccc );
        document.body.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.scene.background = new THREE.Color( 0x66688d );

        this.render();


        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.position.set( 0, 500, 0 );
        this.scene.add( hemiLight );

        var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.position.set( -1, 0.75, 1 );
        dirLight.position.multiplyScalar( 50);
        dirLight.name = "dirlight";

        this.scene.add( dirLight );

        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = dirLight.shadow.mapSize.height = 1024*2;

        var d = 300;

        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;
        dirLight.shadow.mapSize.width = 1024*4;
        dirLight.shadow.mapSize.height = 1024*4;

        const ambientLight = new THREE.AmbientLight( 0xfdffe1, 0.4 );
        this.scene.add(ambientLight)


        // const axesHelper = new THREE.AxesHelper( 500 );
        // this.scene.add( axesHelper );



    }

    render() {
        requestAnimationFrame(() => {
            this.render();
        });

        this.objects.forEach((object) => {
            object.update();
        });

        cubeCamera.update(this.renderer, this.scene);
        this.renderer.render(this.scene, this.camera);
    }

    add(mesh) {
        if (Array.isArray(mesh)){
            for(let index in mesh){
                if ( mesh[index] instanceof Model){
                    this.objects.push(mesh[index]);
                    mesh[index].load(this.scene)
                }
                else{
                    this.objects.push(mesh[index]);
                    this.scene.add( mesh[index].getMesh() );
                }
            }

        }
        else{
            this.objects.push(mesh);
            this.scene.add(mesh.getMesh());
        }
    }
}

let app = new Application();
let objs = [
    new Skybox({width:1000, height:1000, depth:1000}),
    new Jardim({x:0, y:0, z:0}),
    new Bench({x:0, y:0, z:0}, 1.58),
    // new Bench({x:-40, y:3, z:80}, 1.58),
    // new Bench({x:0, y:3, z:80}, 1.58),
    // new Bench({x:40, y:3, z:80}, 1.58),
    // new Bench({x:80, y:3, z:80}, 1.58),
    new Tree({x:20, y:0, z:0},{x:0, y:0, z:0},2),
    new Lamp({x:-30, y:-2.5, z:0},{x:0, y:0, z:0}),
    new Banco({x:-10, y:4, z:0},{x:Math.PI, y:0, z:0}),
    new TrashBin({x:-25, y:0, z:0},{x:Math.PI/2, y:0, z:0})

];

app.add(objs);
