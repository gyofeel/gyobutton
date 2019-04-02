'use strict'

//default button style
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

const prefixArr = ['webkit', 'moz', 'o', 'ms'];

export {styleObj, prefixArr};