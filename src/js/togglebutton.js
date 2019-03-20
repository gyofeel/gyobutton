import GyoButton from './button';
import { styleObj, prefixArr } from './style';

'use strict'

//GyoToggleButton
//Private Member
let nodeStateArr;

//Method
const initToggle = (cb, effect, effectOut)=>{
    for(let el of nodeStateArr){
            el[0].addEventListener('mouseup', (e)=>{
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
            cb(e.currentTarget, el[1]);
            })
    }
};
const GyoToggleButton = function(sel){
    GyoButton.call(this, sel);
    nodeStateArr = Array.from(this.getNodeArr()).map((el)=>[el, false]);
};
GyoToggleButton.prototype = Object.create(GyoButton.prototype);
GyoToggleButton.prototype.constructor = GyoToggleButton;

GyoToggleButton.prototype.toggle = (callback, stateProp, stateOutProp)=>{
    const styleStateEffect = (stateProp)?stateProp:styleObj.state_effect;
    const styleStateEffectOut = (stateOutProp)?stateOutProp:styleObj.state_effect_out;
    initToggle(callback, styleStateEffect, styleStateEffectOut);
};

export default GyoToggleButton;
