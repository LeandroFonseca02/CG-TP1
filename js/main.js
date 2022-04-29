import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';
import {Bench, Skybox} from "./Objects.js";
import {Banco, Jardim, Tree, Lamp, TrashBin, Model, Playground, Duck} from "./Models.js";
import {FirstPersonCamera} from "./FirstPersonCamera.js";


const cubeRendertarget = new THREE.WebGLCubeRenderTarget(128, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding
})

const cubeCamera = new THREE.CubeCamera(1,10000, cubeRendertarget);
export const loadingManager = new THREE.LoadingManager();

class Application {

    constructor() {
        this.objects = [];
        this.createScene();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;
        this.camera.position.y +=20;
        this.clock = new THREE.Clock();

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setClearColor( 0xcccccc );
        document.body.appendChild(this.renderer.domElement);
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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

        this.controls = new FirstPersonCamera(this.camera, this.renderer.domElement);

        const axesHelper = new THREE.AxesHelper( 500 );
        this.scene.add( axesHelper );

        const progressBar = document.getElementById('progress-bar');
        loadingManager.onProgress = function (url,loaded,total) {
            progressBar.value = (loaded/total) * 100;
        }
        const progressBarContainer = document.querySelector('.progress-bar-container');
        loadingManager.onLoad = function () {
            progressBarContainer.style.display = 'none';
        }

    }

    render() {
        requestAnimationFrame(() => {
            this.render();
            this.controls.update( this.clock.getDelta() );
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
                    mesh[index].load(this.scene,this.camera)
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
    new Bench({x:0, y:0, z:100}, {x:0, y:Math.PI/2, z:0}),
    new Bench({x:30, y:0, z:100}, {x:0, y:Math.PI/2, z:0}),
    new Bench({x:60, y:0, z:100}, {x:0, y:Math.PI/2, z:0}),
    new Bench({x:0, y:0, z:140}, {x:0, y:Math.PI/2, z:0}),
    new Bench({x:30, y:0, z:140}, {x:0, y:Math.PI/2, z:0}),
    new Bench({x:60, y:0, z:140}, {x:0, y:Math.PI/2, z:0}),
    new Lamp({x:20, y:-2.5, z:120},{x:0, y:0, z:0}),
    new Lamp({x:50, y:-2.5, z:120},{x:0, y:0, z:0}),
    new Playground({x:-100, y:-0.5, z:120},{x:0, y:Math.PI/2, z:0}),
    new Duck({x:-30, y:-3, z:-50},{x:0, y:0, z:0}),
    // new Bench({x:-40, y:3, z:80}, 1.58),
    // new Bench({x:0, y:3, z:80}, 1.58),
    // new Bench({x:40, y:3, z:80}, 1.58),
    // new Bench({x:80, y:3, z:80}, 1.58),
    // new Tree({x:30, y:0, z:130},{x:0, y:0, z:0},10),
    // new Tree({x:20, y:0, z:0},{x:0, y:0, z:0},2),



    new Banco({x:-20, y:4, z:-5},{x:Math.PI, y:Math.PI-Math.PI/6, z:0}),
    new Lamp({x:-35, y:-2.5, z:-1},{x:0, y:0, z:0}),
    new TrashBin({x:-5, y:0, z:-15},{x:Math.PI/2, y:0, z:0}),
    new Banco({x:40, y:4, z:-63},{x:Math.PI, y:Math.PI-Math.PI/2, z:0}),
    new Lamp({x:40, y:-2.5, z:-50},{x:0, y:0, z:0}),
    new TrashBin({x:40, y:0, z:-80},{x:Math.PI/2, y:0, z:0}),
    new Banco({x:-15, y:4, z:-120},{x:Math.PI, y:2*Math.PI + Math.PI/20, z:0}),
    new Lamp({x:-30, y:-2.5, z:-125},{x:0, y:0, z:0}),
    new TrashBin({x:0, y:0, z:-120},{x:Math.PI/2, y:0, z:0}),
    new Banco({x:-90, y:4, z:-105},{x:Math.PI, y:2*Math.PI - Math.PI/3.8, z:0}),
    new Lamp({x:-100, y:-2.5, z:-95 },{x:0, y:0, z:0}),
    new TrashBin({x:-80, y:0, z:-120},{x:Math.PI/2, y:0, z:0}),
    new Banco({x:-115, y:4, z:-50},{x:Math.PI, y:2*Math.PI - Math.PI/2.6, z:0}),
    new Lamp({x:-120, y:-2.5, z:-40 },{x:0, y:0, z:0}),
    new TrashBin({x:-110, y:0, z:-65},{x:Math.PI/2, y:0, z:0}),
    new Banco({x:-100, y:4, z:20},{x:Math.PI, y:Math.PI+Math.PI/4.7, z:0}),
    new Lamp({x:-110, y:-2.5, z:10 },{x:0, y:0, z:0}),
    new TrashBin({x:-85, y:0, z:30},{x:Math.PI/2, y:0, z:0}),



    new Tree({x:-20, y:0, z:15},{x:0, y:Math.PI/2, z:0},1),
    new Tree({x:20, y:0, z:5},{x:0, y:Math.PI/2, z:0},10    ),
    new Tree({x:50, y:0, z:15},{x:0, y:Math.PI/2, z:0},10)


];

app.add(objs);
