import {TextureLoader} from "./three.module.js";
import * as THREE from "./three.module.js";

class Obj {
    constructor(){}
}

// classe que define as texturas dos nossos objetos
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

// classe que define as texturas da Skybox
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

// classe que define a repetição das texturas dos nossos objetos
export class Wrap extends Obj{
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

// classes que define as imagens das texturas dos nossos objetos
export class SkyboxDay extends SkyboxMaterial{
    constructor() {
        super('./textures/Skybox/miramar_bk.jpg','./textures/Skybox/miramar_dn.jpg',
            './textures/Skybox/miramar_ft.jpg','./textures/Skybox/miramar_lf.jpg',
            './textures/Skybox/miramar_rt.jpg','./textures/Skybox/miramar_up.jpg');
    }
}

export class RustyMetal extends Material{
    constructor(){
        super('./textures/RustyMetal/Metal_Rusted_010_basecolor.jpg', './textures/RustyMetal/Metal_Rusted_010_normal.jpg',
            './textures/RustyMetal/Metal_Rusted_010_height.png', './textures/RustyMetal/Metal_Rusted_010_roughness.jpg',
            './textures/RustyMetal/Metal_Rusted_010_ambientOcclusion.jpg');
    }
}

export class Wood extends Material{
    constructor(){
        super('./textures/Wood/Wood_025_basecolor.jpg', './textures/Wood/Wood_025_normal.jpg',
            './textures/Wood/Wood_025_bheight.png', './textures/Wood/Wood_025_roughness.jpg',
            './textures/Wood/Wood_025_ambientOcclusion.jpg');
    }
}

export class ReflectiveMetal extends Material{
    constructor() {
        super('./textures/ReflectiveMetal/Metal_scratched_009_basecolor.jpg',
            './textures/ReflectiveMetal/Metal_scratched_009_normal.jpg',
            './textures/ReflectiveMetal/Metal_scratched_009_height.png',
            './textures/ReflectiveMetal/Metal_scratched_009_roughness.jpg',
            './textures/ReflectiveMetal/Metal_scratched_009_ambientOcclusion.jpg',
            './textures/ReflectiveMetal/Metal_scratched_009_metallic.jpg');
    }
}

export class Stone extends Material{
    constructor() {
        super('./textures/Stone/basecolor.jpg', './textures/Stone/normal.jpg',
            './textures/Stone/height.jpg', './textures/Stone/roughness.jpg',
            './textures/Stone/ambientOcclusion.jpg'
        );
    }
}