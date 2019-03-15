(function(){
    'use strict'

    //GyoButton
    //Private Memeber
    //Variable
    let selector, nodeArr;
    //Object
    const styleObj = {
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
    //Method
    const returnComputedStyle = (node ,property)=>{
        return window.getComputedStyle(node)[property];
    };
    const initStyle = (node)=>{
        const initStyle = Object.entries(styleObj.init);
        for(let v of initStyle){
            node.style[v[0]] = v[1];
        }
    };
    const initEvent = (node, event, callback)=>{
        node.addEventListener(event, (e)=>{
            e.stopPropagation();
            callback();
        });
    }

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
        button : (initStyleProperty)=>{
            styleObj.init = (initStyleProperty)?initStyleProperty:styleObj.init;
            for(let node of nodeArr){
                initStyle(node);
            }
        },
        event : (eventName, callback)=>{
            for(let node of nodeArr){
                initEvent(node, eventName, callback);
            }
        }
    }

    //GyoToggleButton
    //Private Member
    let nodeStateArr;
    //Method
    const initToggle = ()=>{
        for(let el of nodeStateArr){
             el[0].addEventListener('mouseup', (e)=>{
                e.stopPropagation();
                el[1] = !el[1];
                let stateStyle;
                if(el[1]) {
                    stateStyle = Object.entries(styleObj.state_effect);
                } else{
                    stateStyle = Object.entries(styleObj.state_effect_out);
                }
                for(let v of stateStyle){
                    e.currentTarget.style[v[0]] = v[1];
                }
             })
        }
    }
    const GyoToggleButton = function(sel){
        GyoButton.call(this, sel);
        nodeStateArr = Array.from(nodeArr).map((el)=>[el, false]);
    };
    GyoToggleButton.prototype = Object.create(GyoButton.prototype);
    GyoToggleButton.prototype.constructor = GyoToggleButton;

    GyoToggleButton.prototype.toggle = (stateProp, stateOutProp)=>{
        styleObj.state_effect = (stateProp)?stateProp:styleObj.state_effect;
        styleObj.state_effect_out = (stateOutProp)?stateOutProp:styleObj.state_effect_out;
        initToggle();
    }

   window.gyoButton = GyoButton;
   window.gyoToggleButton = GyoToggleButton;
})();
