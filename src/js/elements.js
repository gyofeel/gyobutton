import {setStyle} from './functions';
import Keyframes from 'create-keyframes';

'use strict'

const returnWavePAE = (color, size)=>{
    const waveAnimation = Keyframes({
        0:{
            transform:'scaleY(1)'
        },
        50:{
            transform:'scaleY(0.1)'
        },
        100:{
            transform:'scaleY(1)'
        }
    });
    const style = {
        divWid : size,
        divHei : parseInt(size)*3/4+'px',
        wBarWid : '10%',
        wBarHei : '100%',
        wBarBorderRad : '3px',
        wBarNum : 7,
        wBarTransitionDuration : '1.5s',
    }
    let div = document.createElement('div');
    const divStyle = {
        margin:'0',
        padding:'0',
        boxSizing:'border-box',
        width : style.divWid,
        height : style.divHei,
        position: 'absolute',
        transform:'translate(-50%, -50%)',
        top:'50%',
        left:'50%',
        // display:'none',
        display : 'flex',
        flexFlow : 'row nowrap',
        justifyContent : 'space-evenly',
        opacity:'0',
        transition: '0.5s'
    }
    setStyle(div, divStyle);
    for(let i=0;i<style.wBarNum;i++){
        let wBarDiv = document.createElement('div');
        let wBarDivStyle = {
            margin:'0',
            padding:'0',
            boxSizing:'border-box',
            width : style.wBarWid,
            height : style.wBarHei,
            borderRadius : style.wBarBorderRad,
            backgroundColor : color,
            animationDelay : i*0.2+'s',
            animationName : waveAnimation,
            animationDuration : style.wBarTransitionDuration,
            animationIterationCount : 'infinite'
        }
        setStyle(wBarDiv, wBarDivStyle);
        div.appendChild(wBarDiv);
    }
    return div;
}

//It returns text sign animation.
const returnSign = function(signTxt){

}

const progressAnimationElement = function(form, color, size){
    let pae;
    switch(form){
        case 'wave':{
            pae = returnWavePAE(color, size);
            break;
        }
        default:{
            break;    
        }
    }

    return pae
}

const successAnimationElement = function(size){
    let sae = document.createElement('div');
    let style = {
        padding:'0',
        margin:'0',
        boxSizing:'border-box',
        position : 'absolute',
        top:'0',
        left:'0',
        width:'100%',
        height:'100%',
        backgroundColor:'green',
        zIndex:'10',
        display:'none'
    }
    setStyle(sae, style);
    let successSign = returnSign('Success!');
    return sae;
}

const failAnimationElement = function(size){
    let fae = document.createElement('div');
    let style = {
        padding:'0',
        margin:'0',
        boxSizing:'border-box',
        position : 'absolute',
        top:'0',
        left:'0',
        width:'100%',
        height:'100%',
        backgroundColor:'red',
        zIndex:'10',
        display:'none'
    }
    setStyle(fae, style);
    let failSign = returnSign('Fail!');
    return fae;
}

export {progressAnimationElement, successAnimationElement, failAnimationElement}