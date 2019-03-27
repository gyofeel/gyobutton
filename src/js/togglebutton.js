import GyoButton from './button';
import { styleObj, prefixArr } from './style';
import {createKey} from 'private-parts'

let GyoToggleButton = function(){
    'use strict'

    //GyoToggleButton
    //Private Member
    let _ = createKey();
    // let nodeStateArr;
    //Method
    let onToggle = function(e, el){
        e.stopPropagation();
        el[1] = !el[1];
        let stateStyle;
        if(el[1]) {
            stateStyle = Object.entries(effect);
        } else{
            stateStyle = Object.entries(effectOut);
        }
        for(let v of stateStyle){
            e.currentTarget.style[v[0]] = v[1];
            let temp = v[0][0].toUpperCase() + Array.from(v[0]).splice(1).join('');
            for(let el of prefixArr) e.currentTarget.style[el+temp] = v[1];
        }
        //callback function have value of node element and toggle state of this.
        if(cb) cb(e.currentTarget, el[1]);
    };
    const initToggle = function(el, effect, effectOut, cb){
        el[0].addEventListener('mouseup', onToggle)
    };
    const GyoToggleButton = function(sel){
        GyoButton.call(this, sel);
        _(this).nodeStateArr = Array.from(this.getNodeArr()).map((el)=>[el, false]);
    };
    GyoToggleButton.prototype = Object.create(GyoButton.prototype);
    GyoToggleButton.prototype.constructor = GyoToggleButton;

    GyoToggleButton.prototype.toggle = function(stateProp, stateOutProp, callback){
        const styleStateEffect = (stateProp)?stateProp:styleObj.state_effect;
        const styleStateEffectOut = (stateOutProp)?stateOutProp:styleObj.state_effect_out;
        for(let el of _(this).nodeStateArr){
            initToggle(el, styleStateEffect, styleStateEffectOut, callback);
        }
    };

    return GyoToggleButton;
}();

export default GyoToggleButton;