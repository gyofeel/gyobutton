import {
    createKey
} from 'private-parts';
import {
    styleObj
} from './constants';
import {
    setStyle,
    returnComputedStyle,
    addEvent,
    removeEvent
} from './functions';

let GyoButton = function () {
    'use strict'

    //GyoButton
    //private
    //Method
    const privateMethods = {};
    let _ = createKey(privateMethods);

    //Constructor
    let GyoButton = function (sel) {
        try {
            if (sel && typeof sel === 'string') {
                _(this).selector = sel;
                _(this).nodeArr = document.querySelectorAll(_(this).selector);
                if (!_(this).nodeArr || _(this).nodeArr.length === 0) throw (new Error(`Didn\'t find any element-node from this arguments : "${_(this).selector}"`));
                else {
                    for (let v of _(this).nodeArr) {
                        const temp = returnComputedStyle(v, 'display');
                        if (temp !== 'inline-block' && temp !== 'block') throw (new Error(`Not supported display value of element : ${temp}`));
                    }
                }
            } else throw (new Error('Arguments Error'));
        } catch (e) {
            console.error(e);
            return;
        }
    };

    GyoButton.prototype = {
        getNodeArr: function () {
            return _(this).nodeArr
        },
        getStyle: function () {
            return _(this).style
        },
        button: function (initStyleProperty) {
            _(this).style = (initStyleProperty) ? initStyleProperty : {};
            for (let node of _(this).nodeArr) {
                setStyle(node, styleObj.init);
                setStyle(node, _(this).style);
            }
        },
        addEvent: function (eventName, callback) {
            _(this).callback = function (e) {
                callback(e);
            };
            for (let node of _(this).nodeArr) {
                addEvent(node, eventName, _(this).callback);
            }
        },
        removeEvent: function (eventName, callback) {
            for (let node of _(this).nodeArr) {
                removeEvent(node, eventName, _(this).callback);
            }
            _(this).callback = null;
        }
    };

    return GyoButton;
}();

export default GyoButton;