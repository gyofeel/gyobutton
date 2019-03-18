let Gyo = {};
const styleObj = {//임시로 전역객체로 ... webpack 진행하며 처리할 것....
    init : {
        width:'120px',
        height:'70px',
        border:'1px solid black',
        borderRadius: '10px',
        backgroundColor:'white',
        color:'black',
        cursor:'pointer',
        transition:'0.5s',
        transform:''
    },
    state_effect : {
        backgroundColor : 'black',
        color: 'white'
    },
    state_effect_out : {
        backgroundColor : 'white',
        color: 'black'
    }
};

(function(){
    'use strict'

    //GyoButton
    //Private Memeber
    //Variable
    let selector, nodeArr;
    //Object

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
    const GyoButton = function(sel){
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

   Gyo.button = GyoButton;
})();

(function(){
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
                }
                //callback function have value of node element and toggle state of this.
                cb(e.currentTarget, el[1]);
             })
        }
    };
    const GyoToggleButton = function(sel){
        Gyo.button.call(this, sel);
        nodeStateArr = Array.from(this.getNodeArr()).map((el)=>[el, false]);
    };
    GyoToggleButton.prototype = Object.create(Gyo.button.prototype);
    GyoToggleButton.prototype.constructor = GyoToggleButton;

    GyoToggleButton.prototype.toggle = (callback, stateProp, stateOutProp)=>{
        const styleStateEffect = (stateProp)?stateProp:styleObj.state_effect;
        const styleStateEffectOut = (stateOutProp)?stateOutProp:styleObj.state_effect_out;
        initToggle(callback, styleStateEffect, styleStateEffectOut);
    };

    Gyo.toggleButton = GyoToggleButton;
})();