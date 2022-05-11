import {GLTFLoader} from "./GLTFLoader.js";
import * as THREE from "./three.module.js";
import {Water} from "./Water2.js";
import {Vector2, Vector3} from "./three.module.js";
import { loadingManager } from './main.js';

export class ModelAudio{
    constructor(){}
    addSound(){}
}

// classe que define os candeeiros do nosso cenário
export class Lamp {
    constructor(position, rotation) {
        this.mesh = this.load();
        this.mesh.position.set(position.x,position.y,position.z);
        this.mesh.rotation.set(rotation.x,rotation.y,rotation.z);
        this.mesh.scale.set(0.08,0.08,0.08);
    }

    load() {
        let loader = new GLTFLoader(loadingManager);
        let mesh = new THREE.Mesh();

        loader.load('./models/lamp/lamp.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            const model = gltf.scene.children[0];
            model.position.set(0,0,0);
            model.rotation.set(0,0,0);
            model.scale.set(1,1,1);
            mesh.add(model);
        }, undefined, function (error) {
            console.error(error);
        });
        return mesh;
    }
    update(){
    }

    getMesh(){return this.mesh;}

}

// classe que define os patos do nosso cenário
export class Duck extends ModelAudio {
    constructor(position, rotation, haveSound) {
        super();
        this.mesh = this.load();
        this.mesh.position.set(position.x,position.y,position.z);
        this.mesh.rotation.set(rotation.x,rotation.y,rotation.z);
        this.mesh.scale.set(10,10,10);
        this.haveSound = 0;
        this.haveSound = haveSound;
    }


    load(){
        let loader = new GLTFLoader(loadingManager);
        let mesh = new THREE.Mesh();

        loader.load('./models/duck/duck.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            let model = gltf.scene;

            mesh.add(model);
            model.position.set(0,0,0);
            model.rotation.set(0,0,0);
            model.scale.set(1,1,1);
        }, undefined, function (error) {
            console.error(error);
        });
        return mesh;
    }

    addSound(camera){
        if(this.haveSound === 1){
            const listener = new THREE.AudioListener();
            camera.add( listener );
            const sound = new THREE.PositionalAudio( listener );
            const audioLoader = new THREE.AudioLoader();
            const mesh = this.getMesh();
            audioLoader.load( './sounds/duck.mp3', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setRefDistance(7);
                sound.setMaxDistance(0.1);
                sound.play(1);
                mesh.add(sound);
            }.bind(this.mesh));
        }
    }

    update(){
    }

    getMesh(){return this.mesh;}

}

// classe que define as diversões do nosso cenário
export class Playground {
    constructor(position, rotation) {
        this.mesh = this.load();
        this.mesh.position.set(position.x,position.y,position.z);
        this.mesh.rotation.set(rotation.x,rotation.y,rotation.z);
        this.mesh.scale.set(10,10,10);
    }

    load() {
        let loader = new GLTFLoader(loadingManager);
        let mesh = new THREE.Mesh();

        loader.load('./models/playground/playground.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            const model = gltf.scene.children[0];
            for (let i = 0; i < 6; i++) {
                model.children[i].material.metalness = 0.5;
            }

            model.position.set(0,0,0);
            model.rotation.set(0,0,0);
            model.scale.set(1,1,1);
            mesh.add(model)
        }, undefined, function (error) {
            console.error(error);
        });
        return mesh;
    }
    update(){
    }

    getMesh(){return this.mesh;}

}

// classe que define os árvores do nosso cenário
export class Tree {
    constructor(position, rotation, scale) {
        this.mesh = this.load();
        this.mesh.position.set(position.x,position.y,position.z);
        this.mesh.rotation.set(rotation.x,rotation.y,rotation.z);
        if(scale > 0){
            this.mesh.scale.set(  0.5*scale,0.5*scale,0.5*scale);
        }else{
            this.mesh.scale.set(0.5,0.5,0.5);
        }

    }

    load() {
        let loader = new GLTFLoader(loadingManager);
        let mesh = new THREE.Mesh();

        loader.load('./models/tree/tree.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            const model = gltf.scene;
            model.children[0].children[0].material.metalness = 0.3;
            model.children[0].children[1].material.metalness = 0.3;
            model.position.set(0,0,0);
            model.rotation.set(0,0,0);
            model.scale.set(1,1,1);
            mesh.add(model);
        }, undefined, function (error) {
            console.error(error);
        });
        return mesh
    }
    update(){
    }

    getMesh(){return this.mesh;}

}

// classe que define os caixotes do lixo do nosso cenário
export class TrashBin {
    constructor(position, rotation) {
        this.mesh = this.load();
        this.mesh.position.set(position.x,position.y,position.z);
        this.mesh.rotation.set(rotation.x,rotation.y,rotation.z);
        this.mesh.scale.set(0.08,0.08,0.08);
    }

    load() {
        let loader = new GLTFLoader(loadingManager);
        let mesh = new THREE.Mesh();

        loader.load('./models/trash/trash.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            const model = gltf.scene.children[0];
            model.material.metalness = 0;
            model.position.set(0,0,0);
            model.rotation.set(0,0,0);
            model.scale.set(1,1,1);
            mesh.add(model);
        }, undefined, function (error) {
            console.error(error);
        });
        return mesh;
    }

    update(){
    }

    getMesh(){return this.mesh;}

}

// classe que define o parque do nosso cenário
export class Jardim {
    constructor(position) {
        this.mesh = this.load();
        this.mesh.position.set(position.x,position.y,position.z);
    }
    load(){
        let loader = new GLTFLoader(loadingManager);
        let mesh = new THREE.Group();
        let grass_alpha = 30;
        loader.load( './models/lake/lago-muro.glb', function ( gltf ) {
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
            model.position.set(0,0,0);
            model.rotation.set(0,0,0);
            model.scale.set(200,200,200);
            mesh.add(model);
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
        mesh.add(water);
        return mesh;
    }

    update(){
    }

    getMesh(){return this.mesh;}

}

// classe que define os bancos de jardim do nosso cenário
export class Banco {
    constructor(position, rotation) {
        this.mesh = this.load();
        this.mesh.position.set(position.x,position.y,position.z);
        this.mesh.rotation.set(rotation.x,rotation.y,rotation.z);
        this.mesh.scale.set(10,10,10);
    }

    load() {
        let loader = new GLTFLoader(loadingManager);
        let mesh = new THREE.Mesh();

        loader.load('./models/bench/bench.glb', function (gltf) {
            gltf.scene.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            let model = gltf.scene.children[0];
            model.position.set(0,0,0);
            model.rotation.set(0,0,0);
            model.scale.set(1,1,1);
            mesh.add(model);
        }, undefined, function (error) {
            console.error(error);
        });
        return mesh;
    }

    update(){
    }

    getMesh(){return this.mesh;}

}
