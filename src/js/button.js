import {
    styleObj,
} from './constants';
import {
    setStyle,
    returnComputedStyle
} from './functions';

'use strict'

//Constructor
let GyoButton = function (sel) {
    //GyoButton
    //private
    //Variables
    let selector, nodeArr, style, callback;
    //Methods

    try {
        if (sel && typeof sel === 'string') {
            selector = sel;
            nodeArr = document.querySelectorAll(selector);
            if (!nodeArr || nodeArr.length === 0) throw (new Error(`Didn\'t find any element-node from this arguments : "${selector}"`));
            else {
                for (let v of nodeArr) {
                    const temp = returnComputedStyle(v, 'display');
                    if (temp !== 'inline-block' && temp !== 'block') throw (new Error(`Not supported display value of element : ${temp}`));
                }
            }
        } else throw (new Error('Arguments Error'));
    } catch (e) {
        console.error(e);
        return;
    }

    return {
        getNodeArr: () => nodeArr,
        getStyle: () => style,
        button: function (initStyleProperty) {
            style = (initStyleProperty) ? initStyleProperty : {};
            for (let node of nodeArr) {
                setStyle(node, styleObj.init);
                setStyle(node, style);
            }
        },
        addEvent: function (eventName, pCallback) {
            callback = function (e) {
                pCallback(e);
            };
            for (let node of nodeArr) {
                node.addEventListener(eventName, callback);
            }
        },
        removeEvent: function (eventName, callback) {
            for (let node of nodeArr) {
                node.addEventListener(eventName, callback);
            }
            callback = null;
        }
    };
};

export default GyoButton;