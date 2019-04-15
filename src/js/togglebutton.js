import GyoButton from "./button";
import {
    styleObj
} from "./constants";
import {
    setStyle,
} from './functions';

"use strict";

const GyoToggleButton = function (sel) {
    let _this = GyoButton.call(this, sel);
    //GyoToggleButton
    //Private Member
    //Variables
    let nodeStateArr, callback;
    //Methods
    const _private = {
        initToggle: function (el, cb) {
            el[0].addEventListener("mouseup", cb);
        }
    };

    nodeStateArr = Array.from(_this.getNodeArr()).map(el => [el, false]);

    return {
        ..._this,
        toggle: function (
            pCallback,
            stateProp,
            stateOutProp
        ) {
            const styleStateEffect = stateProp ? stateProp : styleObj.state_effect;
            const styleStateEffectOut = stateOutProp ?
                stateOutProp :
                styleObj.state_effect_out;
            if (pCallback) {
                for (let el of nodeStateArr) {
                    el[0].removeEventListener("mouseup", callback);
                    el[1] = false;
                }
            }
            callback = function (e) {
                const stateIdx = nodeStateArr.findIndex(el => el[0] === this);
                let stateStyle;
                nodeStateArr[stateIdx][1] = !nodeStateArr[stateIdx][1];
                if (nodeStateArr[stateIdx][1]) {
                    stateStyle = styleStateEffect;
                } else {
                    stateStyle = styleStateEffectOut;
                }
                setStyle(this, stateStyle);
                //callback function have value of node element and toggle state of this.
                if (pCallback) pCallback(this, nodeStateArr[stateIdx][1]);
            };

            for (let el of nodeStateArr) {
                _private.initToggle(el, callback);
            }
        }
    }
};
GyoToggleButton.prototype = Object.create(GyoButton.prototype);
GyoToggleButton.prototype.constructor = GyoToggleButton;

// return GyoToggleButton;

export default GyoToggleButton;