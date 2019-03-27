import {styleObj, prefixArr} from './style'
import {createKey} from 'private-parts';

let GyoButton = function(){
    'use strict'

    //GyoButton
    //private
    //Method
    const privateMethods = {
        returnComputedStyle: (node, property)=>window.getComputedStyle(node)[property],
        initStyle : function(node, style){
            const iStyle = Object.entries(style);
            for(let v of iStyle){
                node.style[v[0]] = v[1];
                //To add vendor-prefix(Cross Browsing)
                //v[0][0].toUpperCase(): first chracter of property name to capital chracter.
                //Array.from(v[0]).splice(1).join(''): remove first character
                // let temp = v[0][1].toUpperCase() + Array.from(v[0]).map((el, i)=>{if(i!==0)return el})
                let temp = v[0][0].toUpperCase() + Array.from(v[0]).splice(1).join('');
                for(let el of prefixArr) node.style[el+temp] = v[1];
            }
        },
        addEvent: function(node, event, callback){
            node.addEventListener(event, callback);
        },
        removeEvent: function(node, event, callback){
            node.removeEventListener(event, callback);
        }
    };
    let _ = createKey(privateMethods);

    //Constructor
    let GyoButton = function(sel){
        try {
            if(sel && typeof sel === 'string'){
                _(this).selector = sel;
                _(this).nodeArr = document.querySelectorAll(_(this).selector);
                if(!_(this).nodeArr  || _(this).nodeArr.length===0) throw(new Error(`Didn\'t find any element-node from this arguments : "${_(this).selector}"`));
                else{
                    for(let v of _(this).nodeArr){
                        const temp = _(this).returnComputedStyle(v, 'display');
                        if(temp!=='inline-block'&&temp!=='block') throw(new Error(`Not supported display value of element : ${temp}`));
                    }
                }
            }else throw(new Error('Arguments Error'));
        } catch(e){
            console.error(e);
            return;
        }
    };

    GyoButton.prototype = {
        getNodeArr : function(){return _(this).nodeArr},
        button : function(initStyleProperty){
            const style = (initStyleProperty)?initStyleProperty:styleObj.init;
            for(let node of _(this).nodeArr ){
                _(this).initStyle(node, style);
            }
        },
        addEvent : function(eventName, callback){
            _(this).callback = function(e){
                callback();
            };
            for(let node of _(this).nodeArr){
                _(this).addEvent(node, eventName, _(this).callback);
            }
        },
        removeEvent : function(eventName, callback){
            for(let node of _(this).nodeArr){
                _(this).removeEvent(node, eventName, _(this).callback);
            }
            _(this).callback = null;
        }
    };

    return GyoButton;
}();

export default GyoButton;