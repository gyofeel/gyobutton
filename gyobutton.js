const gyo = (_sel)=>{
    'use strict'
    //private
    //variable
    let selector, nodeArr;
    //object
    const styleObj = {
        button: {
            init : {
                width:'150px',
                height:'100px',
                border:'1px solid black',
                backgroundColor:'white',
                color:'black',
                cursor:'pointer',
                transition:'0.5s'
            },
            hover_effect : {
                scale : {
                    transform:'scale(1.2)'
                },
                scale_out : {
                    transform:'scale(1)'
                },
                invert : {
                    backgroundColor:'black',
                    color:'white'
                },
                invert_out : {
                    backgroundColor:'white',
                    color:'black'
                }
            }
        }
    };
    //method
    const returnComputedStyle = (node ,property)=>{
        return window.getComputedStyle(node)[property];
    }
    const initStyle = (compoName, node)=>{
        const iStyle = Object.entries(styleObj[compoName].init);
        for(let v of iStyle){
            node.style[v[0]] = v[1];
        }
    }
    const hoverStyle = (compoName, node, effect)=>{
        if(!styleObj[compoName].hover_effect[effect]) return;
        node.addEventListener('mouseover',(e)=>{
            e.stopPropagation();
            const hoverStyle = Object.entries(styleObj[compoName].hover_effect[effect]);
            for(let v of hoverStyle){
                node.style[v[0]] = v[1];
            }
        });
        node.addEventListener('mouseout',(e)=>{
            e.stopPropagation();
            const hoverStyle = Object.entries(styleObj[compoName].hover_effect[`${effect}_out`]);
            for(let v of hoverStyle){
                node.style[v[0]] = v[1];
            }
        });
    }

    const Constructor = function(sel){
        try{
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
    }
    Constructor.prototype = {
        button : (obj)=>{
            for(let node of nodeArr){
                initStyle('button', node);
                hoverStyle('button', node, obj.hover_effect);
            }
        }
    }

    return new Constructor(_sel);
};