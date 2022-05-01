import * as THREE from "./three.module.js";
import {RoundedBoxGeometry} from "./RoundedBoxGeometry.js";
import {MeshStandardMaterial, TextureLoader} from "./three.module.js";


// const cubeRendertarget = new THREE.WebGLCubeRenderTarget(128, {
//     format: THREE.RGBAFormat,
//     generateMipmaps: true,
//     minFilter: THREE.LinearMipmapLinearFilter,
//     encoding: THREE.sRGBEncoding
// })
//
// const cubeCamera = new THREE.CubeCamera(1,10000, cubeRendertarget);

class Obj {
    constructor(){}
}

class Cube extends Obj{
    constructor(size) {
        super();
        this.geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
    }
}

class RoundCube extends Obj{
    constructor(size) {
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

export class Skybox extends Cube{
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
            this.texture.getAoTexture(),
            this.texture.getRoughnessTexture(),
        ];
        this.material = new THREE.MeshStandardMaterial({
            map: this.maps[0],
            aoMap: this.maps[1],
            roughnessMap: this.maps[2],
            roughness:0.7

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

class Screw extends Sphere {
    constructor(material,position, radius, widthSegments, heightSegments, theta) {
        super(radius, widthSegments, heightSegments, theta);
        this.material = material;

        if(!this.material instanceof MeshStandardMaterial){
            // console.log("here")
            let texture = new ReflectiveMetal();
            this.material = new THREE.MeshStandardMaterial({
                map: texture.getBaseTexture(),
                normalMap: texture.getNormalTexture(),
                displacementMap: texture.getHeightTexture(),
                roughnessMap: texture.getRoughnessTexture(),
                roughness: 1,
                aoMap: texture.getAoTexture(),
                metalnessMap: texture.getMetallicTexture(),
                metalness:1,
            });
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotateX(-Math.PI/2);
    }

    update(){}
    getMesh(){
        return this.mesh;
    }
}

export class Bench extends Obj{
    constructor(position, rotation) {
        super();
        this.mesh = new THREE.Group();
        this.RM_material = this.createReflectiveMetalMat()
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
            new Screw(this.RM_material,{x:6.22,y:5.2,z:0},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:6.22,y:5.2,z:1.1},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:6.22,y:5.2,z:2.2},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:6.22,y:5.2,z:3.3},0.1,16,16,3.1),

            new Screw(this.RM_material,{x:-6.22,y:5.2,z:0},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:-6.22,y:5.2,z:1.1},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:-6.22,y:5.2,z:2.2},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:-6.22,y:5.2,z:3.3},0.1,16,16,3.1),

            new Screw(this.RM_material,{x:6.22,y:5.2,z:10},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:6.22,y:5.2,z:11.2},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:6.22,y:5.2,z:12.3},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:6.22,y:5.2,z:13.4},0.1,16,16,3.1),

            new Screw(this.RM_material,{x:-6.22,y:5.2,z:10},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:-6.22,y:5.2,z:11.2},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:-6.22,y:5.2,z:12.3},0.1,16,16,3.1),
            new Screw(this.RM_material,{x:-6.22,y:5.2,z:13.4},0.1,16,16,3.1),
            //Base
            new Base({ width: 0.8, height: 14, depth: 5 }, {x:0,y:0,z:6.7},0,Math.PI/2,1,3),
        ];
        this.addMeshToGroup(this.parts);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotation.set(rotation.x,rotation.y,rotation.z);
    }

    update() {
        // this.mesh.rotation.y += 0.01;
    }

    createReflectiveMetalMat(){
        let ReflectMetalTexture = new ReflectiveMetal();
        let RM_material = new THREE.MeshStandardMaterial({
            map: ReflectMetalTexture.getBaseTexture(),
            normalMap: ReflectMetalTexture.getNormalTexture(),
            displacementMap: ReflectMetalTexture.getHeightTexture(),
            roughnessMap: ReflectMetalTexture.getRoughnessTexture(),
            roughness: 1,
            aoMap: ReflectMetalTexture.getAoTexture(),
            metalnessMap: ReflectMetalTexture.getMetallicTexture(),
            metalness:1,
        });
        return RM_material;
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
