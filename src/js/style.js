'use strict'

//default button style
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

export default styleObj;