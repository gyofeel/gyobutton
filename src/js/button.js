import styleObj from './style'

'use strict'

//GyoButton
//Private Memeber
//Variable
let selector, nodeArr;

//Method
const returnComputedStyle = (node ,property)=>{
    return window.getComputedStyle(node)[property];
};
const initStyle = (node, style)=>{
    const iStyle = Object.entries(style);
    for(let v of iStyle){
        node.style[v[0]] = v[1];
    }
};
const initEvent = (node, event, callback)=>{
    node.addEventListener(event, (e)=>{
        e.stopPropagation();
        callback();
    });
};

//Constructor
let GyoButton = function(sel){
    try {
        if(sel && typeof sel === 'string'){
            selector = sel;
            nodeArr = document.querySelectorAll(selector);
            if(!nodeArr || nodeArr.length===0) throw(new Error(`Didn\'t find any element-node from this arguments : "${selector}"`));
            else{
                for(let v of nodeArr){
                    const temp = returnComputedStyle(v, 'display');
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
    getNodeArr : ()=>nodeArr,
    button : (initStyleProperty)=>{
        const style = (initStyleProperty)?initStyleProperty:styleObj.init;
        for(let node of nodeArr){
            initStyle(node, style);
        }
    },
    event : (eventName, callback)=>{
        for(let node of nodeArr){
            initEvent(node, eventName, callback);
        }
    }
};

export default GyoButton;