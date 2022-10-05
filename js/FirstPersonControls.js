import {PointerLockControls} from "./PointerLockControls.js";
let keyForward = false;
let keyBackward = false;
let keyLeft = false;
let keyRight = false;
let keyRotate = false;
let keyAntirotate = false;
var controls;

export class FirstPersonControls{
    constructor(camera, domElem) {
        controls = new PointerLockControls(camera, domElem);
        document.body.addEventListener('click', () => {
            controls.lock();
        });

        var onKeyDown = function (event) {

            switch (event.keyCode) {

                case 38: // up
                case 87: // w
                    keyForward = true;
                    break;

                case 37: // left
                case 65: // a
                    keyLeft = true;
                    break;

                case 40: // down
                case 83: // s
                    keyBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    keyRight = true;
                    break;

                case 81: // q
                    keyRotate = true;
                    break;
                case 69: // e
                    keyAntirotate = true;
                    break;
            }

        }.bind(this);

        var onKeyUp = function (event) {

            switch (event.keyCode) {

                case 38: // up
                case 87: // w
                    keyForward = false;
                    break;

                case 37: // left
                case 65: // a
                    keyLeft = false;
                    break;

                case 40: // down
                case 83: // s
                    keyBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    keyRight = false;
                    break;

                case 81: // q
                    keyRotate = false;
                    break;
                case 69: // e
                    keyAntirotate = false;
                    break;
            }

        };
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

    }

    getObject(){
        return controls.getObject();
    }

    update(){
        controls.moveForward(keyForward ? 0.4 : (keyBackward ? -0.4 : 0));
        controls.moveRight(keyRight ? 0.4 : (keyLeft ? -0.4 : 0));
    }
}
