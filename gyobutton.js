let gyo = function(){
    let selector, node;
    let F = function(sel){
        try{
            if(sel && typeof sel === 'string'){
                selector = sel;
                node = document.querySelectorAll(selector);
                console.log(node)
                if(!node || node.length===0) throw(new Error(`Didn\'t find any element-node from this arguments : "${selector}"`))
            }else{
                throw(new Error('Arguments Error'));
            }
        } catch(e){
            console.error(e)
        }
    }

    F.prototype = {
        button : function(){
        }
    }

    return F;
}();