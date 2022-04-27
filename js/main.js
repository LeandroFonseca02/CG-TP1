import * as THREE from './three.module.js';
import {RoundedBoxGeometry} from './RoundedBoxGeometry.js';
import {OrbitControls} from './OrbitControls.js';
import {GLTFLoader} from './GLTFLoader.js';
import {Water} from './Water2.js';
import {TextureLoader, Vector2} from "./three.module.js";


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

class Banco extends Model {
    constructor(position, rotation) {
        super();
        this.position = position;
        this.rotation = rotation;
    }

    load(scene) {
        let loader = new GLTFLoader();
        let alpha = 10;
        let pos_x = this.position.x;
        let pos_y = this.position.y;
        let pos_z = this.position.z;
        let rot_x = this.rotation.x;
        let rot_y = this.rotation.y;
        let rot_z = this.rotation.z;
        let model;

        loader.load('./models/bench/bench.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            model = gltf.scene.children[0];
            scene.add(model);
            model.scale.set(alpha, alpha, alpha);
            model.position.set(pos_x,pos_y,pos_z);
            model.rotation.set(rot_x,rot_y,rot_z);
        }, undefined, function (error) {
            console.error(error);
        });

    }
    update(){
    }

}

class Lamp extends Model {
    constructor(position, rotation) {
        super();
        this.position = position;
        this.rotation = rotation;
    }

    load(scene) {
        let loader = new GLTFLoader();
        let alpha = 0.08;
        let pos_x = this.position.x;
        let pos_y = this.position.y;
        let pos_z = this.position.z;
        let rot_x = this.rotation.x;
        let rot_y = this.rotation.y;
        let rot_z = this.rotation.z;
        let model;

        loader.load('./models/lamp/lamp.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            const model = gltf.scene.children[0];
            scene.add(model);
            model.scale.set(alpha, alpha, alpha);
            model.position.set(pos_x,pos_y,pos_z);
            model.rotation.set(rot_x,rot_y,rot_z);
        }, undefined, function (error) {
            console.error(error);
        });

    }
    update(){
    }

}

class Tree extends Model {
    constructor(position, rotation,type) {
        super();
        this.position = position;
        this.rotation = rotation;
        this.type = type;
        switch (type) {
            case 1:
                this.url = './models/trees/tree1.glb'
                break;
            case 2:
                this.url = './models/trees/tree1-1.glb'
                break;
            case 3:
                this.url = './models/trees/tree1-2.glb'
                break;
            case 4:
                this.url = './models/trees/tree2.glb'
                break;
            case 5:
                this.url = './models/trees/tree2-1.glb'
                break;
            case 6:
                this.url = './models/trees/tree2-2.glb'
                break;
            case 7:
                this.url = './models/trees/tree3.glb'
                break;
            case 8:
                this.url = './models/trees/tree3-1.glb'
                break;
            case 9:
                this.url = './models/trees/tree3-2.glb'
                break;
            case 10:
                this.url = './models/trees/tree4.glb'
                break;
            case 11:
                this.url = './models/trees/tree4-1.glb'
                break;
            case 12:
                this.url = './models/trees/tree4-2.glb'
                break;
        }
    }

    load(scene) {
        let loader = new GLTFLoader();
        let alpha = 7;
        let pos_x = this.position.x;
        let pos_y = this.position.y;
        let pos_z = this.position.z;
        let rot_x = this.rotation.x;
        let rot_y = this.rotation.y;
        let rot_z = this.rotation.z;

        loader.load(this.url, function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            const model = gltf.scene;
            scene.add(model);
            console.log(model)
            model.scale.set(alpha, alpha, alpha);
            model.position.set(pos_x,pos_y,pos_z);
            model.rotation.set(rot_x,rot_y,rot_z);
        }, undefined, function (error) {
            console.error(error);
        });

    }
    update(){
    }

}

class TrashBin extends Model {
    constructor(position, rotation) {
        super();
        this.position = position;
        this.rotation = rotation;
    }

    load(scene) {
        let loader = new GLTFLoader();
        let alpha = 0.08;
        let pos_x = this.position.x;
        let pos_y = this.position.y;
        let pos_z = this.position.z;
        let rot_x = this.rotation.x;
        let rot_y = this.rotation.y;
        let rot_z = this.rotation.z;
        let model;

        loader.load('./models/trash/trash.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            const model = gltf.scene.children[0];
            model.material.metalness = 0
            scene.add(model);
            model.scale.set(alpha, alpha, alpha);
            model.position.set(pos_x,pos_y,pos_z);
            model.rotation.set(rot_x,rot_y,rot_z);
        }, undefined, function (error) {
            console.error(error);
        });

    }
    update(){
    }

}

class Jardim extends Model{
    constructor(position) {
        super();
        this.position = position;
    }
    load(scene){
        let loader = new GLTFLoader();
        let alpha = 200;
        let grass_alpha = 5;
        let pos_x = this.position.x;
        let pos_y = this.position.y;
        let pos_z = this.position.z;
        loader.load( './models/lake/lago.glb', function ( gltf ) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.receiveShadow = true;
                }
            })
            const model = gltf.scene.children[0];
            model.children[0].material.map.repeat = new Vector2(grass_alpha,grass_alpha)
            model.children[0].material.metalnessMap.repeat = new Vector2(grass_alpha,grass_alpha)
            model.children[0].material.normalMap.repeat = new Vector2(grass_alpha,grass_alpha)
            model.children[0].material.roughnessMap.repeat = new Vector2(grass_alpha,grass_alpha)
            model.children[1].material.map.repeat = new Vector2(grass_alpha,grass_alpha)
            model.children[1].material.metalnessMap.repeat = new Vector2(grass_alpha,grass_alpha)
            model.children[1].material.normalMap.repeat = new Vector2(grass_alpha,grass_alpha)
            model.children[1].material.roughnessMap.repeat = new Vector2(grass_alpha,grass_alpha)
            scene.add(model)
            model.scale.set(alpha, alpha, alpha)
            model.position.set(pos_x,pos_y,pos_z);
        }, undefined, function ( error ) {
            console.error( error );
        } );

        const params = {
            color: '#ffffff',
            scale: 4,
            flowX: 1,
            flowY: 1
        };

        const waterGeometry = new THREE.BoxGeometry( 140,140,1 ); //190,200

        const water = new Water( waterGeometry, {
            color: params.color,
            scale: params.scale,
            flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
            textureWidth: 1024,
            textureHeight: 1024
        } );

        water.position.set(-40,-2,-50)
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
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
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
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
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
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
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
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
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
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
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
            new Legs({x:5,y:4,z:6.7},1,1,8,16,0,0),
            new Legs({x:-5,y:4,z:6.7},1,1,8,16,0,0),
            //Suporte
            new Suporte({ width: 0.5, height: 14, depth: 1 },{x:6.2,y:4.5,z:6.7},Math.PI/2,0,1,6),
            new Suporte({ width: 0.5, height: 14, depth: 1 },{x:-6.2,y:4.5,z:6.7},Math.PI/2,0,1,6),
            //Parafusos
            new Screw({x:6.22,y:5.2,z:0},0.1,16,16,3.1),
            new Screw({x:6.22,y:5.2,z:1.1},0.1,16,16,3.1),
            new Screw({x:6.22,y:5.2,z:2.2},0.1,16,16,3.1),
            new Screw({x:6.22,y:5.2,z:3.3},0.1,16,16,3.1),

            new Screw({x:-6.22,y:5.2,z:0},0.1,16,16,3.1),
            new Screw({x:-6.22,y:5.2,z:1.1},0.1,16,16,3.1),
            new Screw({x:-6.22,y:5.2,z:2.2},0.1,16,16,3.1),
            new Screw({x:-6.22,y:5.2,z:3.3},0.1,16,16,3.1),

            new Screw({x:6.22,y:5.2,z:10},0.1,16,16,3.1),
            new Screw({x:6.22,y:5.2,z:11.2},0.1,16,16,3.1),
            new Screw({x:6.22,y:5.2,z:12.3},0.1,16,16,3.1),
            new Screw({x:6.22,y:5.2,z:13.4},0.1,16,16,3.1),

            new Screw({x:-6.22,y:5.2,z:10},0.1,16,16,3.1),
            new Screw({x:-6.22,y:5.2,z:11.2},0.1,16,16,3.1),
            new Screw({x:-6.22,y:5.2,z:12.3},0.1,16,16,3.1),
            new Screw({x:-6.22,y:5.2,z:13.4},0.1,16,16,3.1),
            //Base
            new Base({ width: 0.8, height: 14, depth: 5 }, {x:0,y:0,z:6.7},0,Math.PI/2,1,3),
        ];
        let alpha = 1.2;
        this.addMeshToGroup(this.parts);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.scale.set(alpha,alpha,alpha)
        this.mesh.rotateY(rotateX);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
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
