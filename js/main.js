import * as THREE from './three.module.js';
import {RoundedBoxGeometry} from './RoundedBoxGeometry.js';
import {OrbitControls} from './OrbitControls.js';
import {GLTFLoader} from './GLTFLoader.js';
import {Water} from './Water2.js';
import {TextureLoader} from "./three.module.js";


class Obj {
    constructor(){}
}

class Model{
    constructor(){}
    load(){}
}

class Cube extends Obj{
    constructor(size, position) {
        super();
        this.geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
    }
}

class RoundCube extends Obj{
    constructor(size, position) {
        super();
        this.geometry = new RoundedBoxGeometry(size.width, size.height, size.depth);
    }
}

class Cylinder extends Obj{
    constructor(radiusTop, radiusBottom, height, RadialS) {
        super();
        this.geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, RadialS);
    }
}

class Sphere extends Obj{
    constructor(radius, widthSegments, heightSegments, phiS, phiL) {
        super();
        this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiS, phiL);
    }
}

class Jardim extends Model{
    constructor(position) {
        super();
    }
    load(scene){
        let loader = new GLTFLoader();
        let alpha = 10;
        loader.load( './models/lake/lago.glb', function ( gltf ) {
            scene.add(gltf.scene)
            gltf.scene.scale.set(alpha*gltf.scene.scale.x, alpha*gltf.scene.scale.y, alpha * gltf.scene.scale.z)


        }, undefined, function ( error ) {
            console.error( error );
        } );

        const params = {
            color: '#ffffff',
            scale: 4,
            flowX: 1,
            flowY: 1
        };

        const waterGeometry = new THREE.BoxGeometry( 110,140,1 ); //190,200

        const water = new Water( waterGeometry, {
            color: params.color,
            scale: params.scale,
            flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
            textureWidth: 1024,
            textureHeight: 1024
        } );

        water.position.set(-6,1,-50)
        water.rotation.x = Math.PI * - 0.5;
        scene.add(water)
    }
    update(){
    }
}

class Material extends Obj{
    constructor(baseTexture, normalTexture, heightTexture, roughnessTexture, aoTexture, metallicTexture) {
        super();
        this.baseTexture = baseTexture;
        this.normalTexture = normalTexture;
        this.heightTexture = heightTexture;
        this.roughnessTexture = roughnessTexture;
        this.aoTexture = aoTexture;
        this.metallicTexture = metallicTexture;
        this.textureLoader = new TextureLoader();
    }
    getBaseTexture(){
        return this.textureLoader.load(this.baseTexture);
    }
    getNormalTexture(){
        return this.textureLoader.load(this.normalTexture);
    }
    getHeightTexture(){
        return this.textureLoader.load(this.heightTexture);
    }
    getRoughnessTexture(){
        return this.textureLoader.load(this.roughnessTexture);
    }
    getAoTexture(){
        return this.textureLoader.load(this.aoTexture);
    }
    getMetallicTexture(){
        return this.textureLoader.load(this.metallicTexture);
    }
}

class SkyboxMaterial extends Obj{
    constructor(textureBK, textureDN, textureFT, textureLF, textureRT, textureUP) {
        super();
        this.textureBK = textureBK;
        this.textureDN = textureDN;
        this.textureFT = textureFT;
        this.textureLF = textureLF;
        this.textureRT = textureRT;
        this.textureUP = textureUP;
        this.textureLoader = new TextureLoader();
    }

    getTextureBK(){
        return this.textureLoader.load(this.textureBK);
    }
    getTextureDN(){
        return this.textureLoader.load(this.textureDN);
    }
    getTextureFT(){
        return this.textureLoader.load(this.textureFT);
    }
    getTextureLF(){
        return this.textureLoader.load(this.textureLF);
    }
    getTextureRT(){
        return this.textureLoader.load(this.textureRT);
    }
    getTextureUP(){
        return this.textureLoader.load(this.textureUP);
    }
}

class Wrap extends Obj{
    constructor(material, repA, repB) {
        super();
        this.repA = repA;
        this.repB = repB;
        this.wrap(material);
    }
    wrap(material){
        material.wrapS = THREE.RepeatWrapping;
        material.wrapT = THREE.RepeatWrapping;
        material.repeat.set(this.repA, this.repB);
    }
}

class SkyboxDay extends SkyboxMaterial{
    constructor() {
        super('./textures/Skybox/miramar_bk.jpg','./textures/Skybox/miramar_dn.jpg',
            './textures/Skybox/miramar_ft.jpg','./textures/Skybox/miramar_lf.jpg',
            './textures/Skybox/miramar_rt.jpg','./textures/Skybox/miramar_up.jpg');
    }
}

class RustyMetal extends Material{
    constructor(){
        super('./textures/RustyMetal/Metal_Rusted_010_basecolor.jpg', './textures/RustyMetal/Metal_Rusted_010_normal.jpg',
            './textures/RustyMetal/Metal_Rusted_010_height.png', './textures/RustyMetal/Metal_Rusted_010_roughness.jpg',
            './textures/RustyMetal/Metal_Rusted_010_ambientOcclusion.jpg');
    }
}

class Wood extends Material{
    constructor(){
        super('./textures/Wood/Wood_025_basecolor.jpg', './textures/Wood/Wood_025_normal.jpg',
            './textures/Wood/Wood_025_bheight.png', './textures/Wood/Wood_025_roughness.jpg',
            './textures/Wood/Wood_025_ambientOcclusion.jpg');
    }
}

class ReflectiveMetal extends Material{
    constructor() {
        super('./textures/ReflectiveMetal/Metal_scratched_009_basecolor.jpg',
            './textures/ReflectiveMetal/Metal_scratched_009_normal.jpg',
            './textures/ReflectiveMetal/Metal_scratched_009_height.png',
            './textures/ReflectiveMetal/Metal_scratched_009_roughness.jpg',
            './textures/ReflectiveMetal/Metal_scratched_009_ambientOcclusion.jpg',
            './textures/ReflectiveMetal/Metal_scratched_009_metallic.jpg');
    }
}

class Stone extends Material{
    constructor() {
        super('./textures/Stone/basecolor.jpg', './textures/Stone/normal.jpg',
            './textures/Stone/height.jpg', './textures/Stone/roughness.jpg',
            './textures/Stone/ambientOcclusion.jpg'
        );
    }
}

class Skybox extends Cube{
    constructor(size) {
        super(size);
        this.texture = new SkyboxDay();
        this.materialArray = [
            new THREE.MeshBasicMaterial( { map: this.texture.getTextureBK() }),
            new THREE.MeshBasicMaterial( { map: this.texture.getTextureFT() }),
            new THREE.MeshBasicMaterial( { map: this.texture.getTextureUP() }),
            new THREE.MeshBasicMaterial( { map: this.texture.getTextureDN() }),
            new THREE.MeshBasicMaterial( { map: this.texture.getTextureRT() }),
            new THREE.MeshBasicMaterial( { map: this.texture.getTextureLF() })
        ];
        for (let i = 0; i < 6; i++) {
            this.materialArray[i].side = THREE.BackSide;
        }

        this.mesh = new THREE.Mesh(this.geometry,this.materialArray);
    }
    update(){}
    getMesh(){
        return this.mesh;
    }
}

class Suporte extends Cube {
    constructor(size,position, rotateX, rotateZ, repA, repB) {
        super(size);
        this.texture = new RustyMetal();
        this.maps = [
            this.texture.getBaseTexture(),
            this.texture.getNormalTexture(),
            this.texture.getRoughnessTexture(),
            this.texture.getAoTexture()
        ];
        this.material = new THREE.MeshStandardMaterial({
            map: this.maps[0],
            normalMap: this.maps[1],
            roughnessMap: this.maps[2],
            aoMap: this.maps[3]
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.wrapMesh(this.maps, repA, repB);
        this.mesh.rotateX(rotateX);
        this.mesh.rotateZ(rotateZ);
    }
    update() {}

    wrapMesh(maps, repA, repB) {
        for (let i = 0; i < maps.length; i++) {
            new Wrap(maps[i], repA, repB);
        }
    }

    getMesh() { return this.mesh; }
}

class WoodBar extends RoundCube {
    constructor(size,position, rotate, rotateZ, repA, repB) {
        super(size);
        this.texture = new Wood();
        this.maps = [
            this.texture.getBaseTexture(),
            this.texture.getAoTexture()
        ];
        this.material = new THREE.MeshLambertMaterial({
            map: this.maps[0],
            aoMap: this.maps[1]
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.wrapMesh(this.maps, repA, repB);
        this.mesh.rotateX(rotate);
        this.mesh.rotateZ(rotateZ);
    }
    update() {}

    wrapMesh(maps, repA, repB) {
        for (let i = 0; i < maps.length; i++) {
            new Wrap(maps[i], repA, repB);
        }
    }

    getMesh() {
        return this.mesh;
    }
}

class Legs extends Cylinder {
    constructor(position, radiusTop, radiusBottom, height, RadialS, rotateX, rotateY) {
        super(radiusTop, radiusBottom, height, RadialS);
        this.texture = new RustyMetal();
        this.material = new THREE.MeshStandardMaterial({
            map: this.texture.getBaseTexture(),
            normalMap: this.texture.getNormalTexture(),
            roughnessMap: this.texture.getRoughnessTexture(),
            roughness: 0.7,
            aoMap: this.texture.getAoTexture()
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotateX(rotateX);
    }

    update() {}
    getMesh() { return this.mesh; }
}

class Base extends RoundCube{
    constructor(size,position, rotateX, rotateZ, repA, repB) {
        super(size);
        this.texture = new Stone();
        this.maps = [
            this.texture.getBaseTexture(),
            this.texture.getNormalTexture(),
            this.texture.getHeightTexture(),
            this.texture.getRoughnessTexture(),
        ];
        this.material = new THREE.MeshStandardMaterial({
            map: this.maps[0],
            normalMap: this.maps[1],
            roughnessMap: this.maps[3],
            roughness:1
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.wrapMesh(this.maps, repA, repB);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotateX(rotateX);
        this.mesh.rotateZ(rotateZ);
    }
    update(){}
    wrapMesh(maps, repA, repB) {
        for (let i = 0; i < maps.length; i++) {
            new Wrap(maps[i], repA, repB);
        }
    }
    getMesh(){
        return this.mesh;
    }
}

const cubeRendertarget = new THREE.WebGLCubeRenderTarget(128, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding
})

const cubeCamera = new THREE.CubeCamera(1,10000, cubeRendertarget);

class Screw extends Sphere {
    constructor(position, radius, widthSegments, heightSegments, theta) {
        super(radius, widthSegments, heightSegments, theta);
        this.texture = new ReflectiveMetal();
        this.material = new THREE.MeshStandardMaterial({
            map: this.texture.getBaseTexture(),
            normalMap: this.texture.getNormalTexture(),
            displacementMap: this.texture.getHeightTexture(),
            roughnessMap: this.texture.getRoughnessTexture(),
            roughness: 1,
            aoMap: this.texture.getAoTexture(),
            metalnessMap: this.texture.getMetallicTexture(),
            metalness:1,
            envMap: cubeRendertarget.texture
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotateX(-Math.PI/2);
    }

    update(){}
    getMesh(){
        return this.mesh;
    }
}

class Bench extends Obj{
    constructor(position, rotateX) {
        super();
        this.mesh = new THREE.Group();
        this.parts = [
            //Banco
            new WoodBar({ width: 0.5, height: 16, depth: 1 },{x:0,y:5,z:0},0,Math.PI/2,1,6),
            new WoodBar({ width: 0.5, height: 16, depth: 1 },{x:0,y:5,z:1.1},0,Math.PI/2,1,6),
            new WoodBar({ width: 0.5, height: 16, depth: 1 },{x:0,y:5,z:2.2},0,Math.PI/2,1,6),
            new WoodBar({ width: 0.5, height: 16, depth: 1 },{x:0,y:5,z:3.3},0,Math.PI/2,1,6),
            //Banco
            new WoodBar({ width: 0.5, height: 16, depth: 1 },{x:0,y:5,z:10.1},0,Math.PI/2,1,6),
            new WoodBar({ width: 0.5, height: 16, depth: 1 },{x:0,y:5,z:11.2},0,Math.PI/2,1,6),
            new WoodBar({ width: 0.5, height: 16, depth: 1 },{x:0,y:5,z:12.3},0,Math.PI/2,1,6),
            new WoodBar({ width: 0.5, height: 16, depth: 1 },{x:0,y:5,z:13.4},0,Math.PI/2,1,6),
            //Tampo
            new WoodBar({ width: 0.5, height: 16, depth: 8 },{x:0,y:8,z:6.7},0,Math.PI/2,2,2),
            //Pernas
            new Legs({x:5,y:4,z:6.7},1,1,8,64,0,0),
            new Legs({x:-5,y:4,z:6.7},1,1,8,64,0,0),
            //Suporte
            new Suporte({ width: 0.5, height: 14, depth: 1 },{x:6.2,y:4.5,z:6.7},Math.PI/2,0,1,6),
            new Suporte({ width: 0.5, height: 14, depth: 1 },{x:-6.2,y:4.5,z:6.7},Math.PI/2,0,1,6),
            //Parafusos
            new Screw({x:6.22,y:5.2,z:0},0.1,64,64,3.1),
            new Screw({x:6.22,y:5.2,z:1.1},0.1,64,64,3.1),
            new Screw({x:6.22,y:5.2,z:2.2},0.1,64,64,3.1),
            new Screw({x:6.22,y:5.2,z:3.3},0.1,64,64,3.1),

            new Screw({x:-6.22,y:5.2,z:0},0.1,64,64,3.1),
            new Screw({x:-6.22,y:5.2,z:1.1},0.1,64,64,3.1),
            new Screw({x:-6.22,y:5.2,z:2.2},0.1,64,64,3.1),
            new Screw({x:-6.22,y:5.2,z:3.3},0.1,64,64,3.1),

            new Screw({x:6.22,y:5.2,z:10},0.1,64,64,3.1),
            new Screw({x:6.22,y:5.2,z:11.2},0.1,64,64,3.1),
            new Screw({x:6.22,y:5.2,z:12.3},0.1,64,64,3.1),
            new Screw({x:6.22,y:5.2,z:13.4},0.1,64,64,3.1),

            new Screw({x:-6.22,y:5.2,z:10},0.1,64,64,3.1),
            new Screw({x:-6.22,y:5.2,z:11.2},0.1,64,64,3.1),
            new Screw({x:-6.22,y:5.2,z:12.3},0.1,64,64,3.1),
            new Screw({x:-6.22,y:5.2,z:13.4},0.1,64,64,3.1),
            //Base
            new Base({ width: 0.8, height: 14, depth: 5 }, {x:0,y:0,z:6.7},0,Math.PI/2,1,3),
        ];
        this.addMeshToGroup(this.parts);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotateY(rotateX);
    }

    update() {
        // this.mesh.rotation.y += 0.01;
    }
    addMeshToGroup(parts){
        for (let i = 0; i < parts.length; i++) {
            this.mesh.add(parts[i].getMesh());
        }
    }
    getMesh() {
        return this.mesh;
    }
}

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

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.scene.background = new THREE.Color( 0x66688d );

        this.render();
        // const light = new THREE.PointLight( 0xffffff, 0.5, 0 );
        // light.position.set( 0, 150, 0 );
        // this.scene.add( light );
        // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        // directionalLight.position.set(0,10,0);
        // this.scene.add(directionalLight);
        this.scene.add( new THREE.AmbientLight( 0x404040, 0.5 ) );
        const spotLight = new THREE.SpotLight( 0xffffff , 2,0,Math.PI/4);
        spotLight.position.set( 0, 170, 0 );
        this.scene.add(spotLight);

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
                if ( mesh[index] instanceof Model)
                    mesh[index].load(this.scene)
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
    // new Bench({x:-40, y:3, z:80}, 1.58),
    // new Bench({x:0, y:3, z:80}, 1.58),
    // new Bench({x:40, y:3, z:80}, 1.58),
    // new Bench({x:80, y:3, z:80}, 1.58),
    new Jardim(),
];

app.add(objs);
