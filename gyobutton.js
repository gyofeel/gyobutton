(function(){
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
    };
    const initStyle = (compoName, node)=>{
        const iStyle = Object.entries(styleObj[compoName].init);
        for(let v of iStyle){
            node.style[v[0]] = v[1];
        }
    };
    const over = (compoName, node, effect, mouseOver)=>{
        if(!styleObj[compoName].hover_effect[effect] || styleObj[compoName].hover_effect[effect]==='none') return;
        node.addEventListener('mouseover',(e)=>{
            e.stopPropagation();
            const hoverStyle = Object.entries(styleObj[compoName].hover_effect[effect]);
            for(let v of hoverStyle){
                node.style[v[0]] = v[1];
            }
            if(mouseOver) mouseOver();
        });
    };
    const out = (compoName, node, effect, mouseOut)=>{
        if(!styleObj[compoName].hover_effect[effect] || styleObj[compoName].hover_effect[effect]==='none') return;
        node.addEventListener('mouseout',(e)=>{
            e.stopPropagation();
            const hoverStyle = Object.entries(styleObj[compoName].hover_effect[`${effect}_out`]);
            for(let v of hoverStyle){
                node.style[v[0]] = v[1];
            }
            if(mouseOut) mouseOut();
        });
    };
    const down = (compoName, node, mouseDown)=>{
        node.addEventListener('mousedown', (e)=>{
            e.stopPropagation();
            if(mouseDown) mouseDown();
        });
    };
    const up = (compoName, node, mouseUp)=>{
        console.log('kk')
        node.addEventListener('mouseup', (e)=>{
            e.stopPropagation();
            if(mouseUp) mouseUp();
        });
    };   

    const Gyo = function(sel){
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
    };
    Gyo.prototype = {
        button : (obj)=>{
            for(let node of nodeArr){
                initStyle('button', node);
                over('button', node, obj.hover_effect, obj.mouse_over);
                out('button', node, obj.hover_effect, obj.mouse_out)
                down('button', node, obj.mouse_down);
                up('button', node, obj.mouse_up);
            }
        }
    };

    // return Constructor;
   window.gyo = (sel)=>new Gyo(sel)
})();

