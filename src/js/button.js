import {
    styleObj,
    prefixArr
} from './constants';

'use strict'

//GyoButton
//private
//Variable
let selector, nodeArr, style, callback;
//Method
const _private = {
    setStyle: function (node, style) {
        const _style = Object.entries(style);
        for (const v of _style) {
            node.style[v[0]] = v[1];
            // To add vendor-prefix(Cross Browsing)
            // v[0][0].toUpperCase(): first chracter of property name to capital chracter.
            // Array.from(v[0]).splice(1).join(''): remove first character
            // let temp = v[0][1].toUpperCase() + Array.from(v[0]).map((el, i)=>{if(i!==0)return el})
            const temp = v[0][0].toUpperCase() + Array.from(v[0]).splice(1).join('');
            for (const el of prefixArr) node.style[el + temp] = v[1];
        }
    },
    returnComputedStyle: (node, property) => window.getComputedStyle(node)[property],
    addEvent: function (node, event, callback) {
        node.addEventListener(event, callback);
    },
    removeEvent: function (node, event, callback) {
        node.removeEventListener(event, callback);
    }
};

//Constructor
let GyoButton = function (sel) {
    try {
        if (sel && typeof sel === 'string') {
            selector = sel;
            nodeArr = document.querySelectorAll(selector);
            if (!nodeArr || nodeArr.length === 0) throw (new Error(`Didn\'t find any element-node from this arguments : "${selector}"`));
            else {
                for (let v of nodeArr) {
                    const temp = _private.returnComputedStyle(v, 'display');
                    if (temp !== 'inline-block' && temp !== 'block') throw (new Error(`Not supported display value of element : ${temp}`));
                }
            }
        } else throw (new Error('Arguments Error'));
    } catch (e) {
        console.error(e);
        return;
    }

    return {
        getNodeArr: function () {
            return nodeArr
        },
        getStyle: function () {
            return style
        },
        button: function (initStyleProperty) {
            style = (initStyleProperty) ? initStyleProperty : {};
            for (let node of nodeArr) {
                _private.setStyle(node, styleObj.init);
                _private.setStyle(node, style);
            }
        },
        addEvent: function (eventName, callback) {
            callback = function (e) {
                callback(e);
            };
            for (let node of nodeArr) {
                _private.addEvent(node, eventName, callback);
            }
        },
        removeEvent: function (eventName, callback) {
            for (let node of nodeArr) {
                _private.removeEvent(node, eventName, callback);
            }
            callback = null;
        }
    };
};

export default GyoButton;