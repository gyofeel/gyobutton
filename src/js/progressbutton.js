import GyoButton from './button';
import { styleObj, prefixArr } from './constants';
import { progressAnimationElement, successAnimationElement, failAnimationElement } from './elements';
import {setStyle, returnComputedStyle} from './functions';
import {createKey} from 'private-parts';

let GyoProgressButton = function(){
    'use strict'

    //GyoProgressButton
    //Private Member
    //Method
    const privateMethods = {
        success : function(){
            
        },
        fail : function(){

        },
        initProgressBtnEl : function(pos, nodeElementsArr){
            for(let el of nodeElementsArr){
                el.node.insertAdjacentElement('beforebegin', el.wrap);
                el.wrap.appendChild(el.node);
                setStyle(el.wrap, {
                    margin:'0',
                    padding:'0',
                    position:'relative',
                    width:'auto',
                    height:'auto',
                    display:'inline-block',
                    boxSizing:'border-box',
                });
                el.wrap.appendChild(el.successEl);
                el.wrap.appendChild(el.failEl);
                switch(pos){
                    case 'top':{
                        el.node.insertAdjacentElement('afterend', el.progressEl);
                        el.progressEl.style.top = parseInt(returnComputedStyle(el.node, 'height'))/7+'px';
                        el.progressEl.style.opacity = '1';
    
                        break;
                    }
                    case 'right':{
                        el.node.insertAdjacentElement('afterend', el.progressEl);
                        el.progressEl.style.left = parseInt(returnComputedStyle(el.wrap, 'width'))-parseInt(returnComputedStyle(el.node, 'width'))/8+'px';
                        el.progressEl.style.opacity = '1';
                        break;
                    }
                    case 'bottom':{
                        el.node.insertAdjacentElement('afterend', el.progressEl);
                        el.progressEl.style.top = parseInt(returnComputedStyle(el.wrap, 'height'))-parseInt(returnComputedStyle(el.node, 'height'))/7+'px';
                        console.log(el.progressEl.style.top)
                        el.progressEl.style.opacity = '1';
                        break;
                    }
                    case 'left':{
                        el.node.insertAdjacentElement('afterend', el.progressEl);
                        el.progressEl.style.left = parseInt(returnComputedStyle(el.node, 'width'))/8+'px';
                        el.progressEl.style.opacity = '1';
                        break;
                    }
                    default :break;
                }
            }
        }
    };
    let _ = createKey(privateMethods);
    const GyoProgressButton = function(sel){
        GyoButton.call(this, sel);
        _(this).nodeArr = this.getNodeArr();
        _(this).style = this.getStyle();
    };
    GyoProgressButton.prototype = Object.create(GyoButton.prototype);
    GyoProgressButton.prototype.constructor = GyoProgressButton;

    GyoProgressButton.prototype.progressInit = function({form, position, color, size}){
        for(let el of _(this).nodeArr){
            _(this).nodeElementsArr = (_(this).nodeElementsArr)?_(this).nodeElementsArr:Array.from(_(this).nodeArr).map((el)=>({
                node : el,
                wrap : document.createElement('div'),
                progressEl : progressAnimationElement(form, color, size),
                successEl : successAnimationElement(),
                failEl : failAnimationElement()
            }));
        }
        _(this).initProgressBtnEl(position, _(this).nodeElementsArr);
    };
    GyoProgressButton.prototype.progressStart = function(){

    }
    GyoProgressButton.prototype.progressEnd = function(){

    }

    return GyoProgressButton;
}();

export default GyoProgressButton;