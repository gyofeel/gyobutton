import GyoButton from './button';
import { styleObj, prefixArr } from './style';
import {createKey} from 'private-parts'

let GyoToggleButton = function(){
    'use strict'

    //GyoToggleButton
    //Private Member
    //Method
    const privateMethods = {
        initToggle : function(el, cb){
            _(this).addEvent(el[0], 'mouseup', cb);
        }
    };
    let _ = createKey(privateMethods);
    const GyoToggleButton = function(sel){
        GyoButton.call(this, sel);
        _(this).nodeStateArr = Array.from(this.getNodeArr()).map((el)=>[el, false]);
        _(this).addEvent = this.getAddEvent();
        _(this).removeEvent = this.getRemoveEvent();
    };
    GyoToggleButton.prototype = Object.create(GyoButton.prototype);
    GyoToggleButton.prototype.constructor = GyoToggleButton;

    GyoToggleButton.prototype.toggle = function(stateProp, stateOutProp, callback){
        let that = this;
        const styleStateEffect = (stateProp)?stateProp:styleObj.state_effect;
        const styleStateEffectOut = (stateOutProp)?stateOutProp:styleObj.state_effect_out;
        if(_(this).callback){
            for(let el of _(this).nodeStateArr){
                _(this).removeEvent(el[0], 'mouseup', _(this).callback);
                el[1] = false;
            }
        }
        
        _(this).callback = function(e){
            const stateIdx = (_(that).nodeStateArr).findIndex((el)=>el[0]===this);
            let stateStyle;
            _(that).nodeStateArr[stateIdx][1] = !_(that).nodeStateArr[stateIdx][1];
            if(_(that).nodeStateArr[stateIdx][1]) {
                stateStyle = Object.entries(styleStateEffect);
            } else{
                stateStyle = Object.entries(styleStateEffectOut);
            }
            for(let v of stateStyle){
                this.style[v[0]] = v[1];
                let temp = v[0][0].toUpperCase() + Array.from(v[0]).splice(1).join('');
                for(let el of prefixArr) this.style[el+temp] = v[1];
            }
            //callback function have value of node element and toggle state of this.
            if(callback) callback(this, _(that).nodeStateArr[stateIdx][1]);
        };

        for(let el of _(this).nodeStateArr){
            _(this).initToggle(el, _(this).callback);
        }
    };

    return GyoToggleButton;
}();

export default GyoToggleButton;