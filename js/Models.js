import {GLTFLoader} from "./GLTFLoader.js";
import * as THREE from "./three.module.js";
import {Water} from "./Water2.js";
import {Vector2} from "./three.module.js";

export class Model{
    constructor(){}
    load(){}
}

export class Lamp extends Model {
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

export class Tree extends Model {
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

export class TrashBin extends Model {
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

export class Jardim extends Model{
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

export class Banco extends Model {
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
