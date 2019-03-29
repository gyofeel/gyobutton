import GyoButton from './button';
import { styleObj, prefixArr } from './style';
import {createKey} from 'private-parts';

let GyoLoadingButton = function(){
    'use strict'

    //GyoLoadingButton
    //Private Member
    //Method
    const privateMethods = {

    };
    let _ = createKey(privateMethods);
    const GyoLoadingButton = function(sel){
        GyoButton.call(this, sel);

    };
    GyoLoadingButton.prototype = Object.create(GyoButton.prototype);
    GyoLoadingButton.prototype.constructor = GyoLoadingButton;

    GyoLoadingButton.prototype;

    return GyoLoadingButton;
}();

export default GyoLoadingButton;