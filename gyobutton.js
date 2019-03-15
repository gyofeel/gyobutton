(function(){
    'use strict'
    //private
    //variable
    let selector, nodeArr;
    //object
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
        }
    };
    //method
    const returnComputedStyle = (node ,property)=>{
        return window.getComputedStyle(node)[property];
    };
    const initStyle = (node)=>{
        const iStyle = Object.entries(styleObj.init);
        for(let v of iStyle){
            node.style[v[0]] = v[1];
        }
    };

    const initEvent = (node, event, callback)=>{
        node.addEventListener(event, (e)=>{
            e.stopPropagation();
            callback();
        });
    }

    const Gyo = function(sel){
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

    Gyo.prototype = {
        button : (initProperty)=>{
            styleObj.init = (initProperty)?initProperty:styleObj.init;
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

    // return Constructor;
   window.gyo = Gyo;
})();
