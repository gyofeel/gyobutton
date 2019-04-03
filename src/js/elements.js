import {
    setStyle
} from './functions';
import Keyframes from 'create-keyframes';

'use strict'

const returnWavePAE = (color, size) => {
    const waveAnimation = Keyframes({
        0: {
            transform: 'scaleY(1)'
        },
        50: {
            transform: 'scaleY(0.1)'
        },
        100: {
            transform: 'scaleY(1)'
        }
    });
    const style = {
        divWid: size,
        divHei: parseInt(size) * 3 / 4 + 'px',
        wBarWid: '10%',
        wBarHei: '100%',
        wBarBorderRad: '3px',
        wBarNum: 7,
        wBarTransitionDuration: '1.5s',
    }
    let div = document.createElement('div');
    const divStyle = {
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
        width: style.divWid,
        height: style.divHei,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        display: 'none',
        // display : 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        opacity: '0',
        transition: '0.7s'
    }
    setStyle(div, divStyle);
    for (let i = 0; i < style.wBarNum; i++) {
        let wBarDiv = document.createElement('div');
        let wBarDivStyle = {
            margin: '0',
            padding: '0',
            boxSizing: 'border-box',
            width: style.wBarWid,
            height: style.wBarHei,
            borderRadius: style.wBarBorderRad,
            backgroundColor: color,
            animationDelay: i * 0.2 + 's',
            animationName: waveAnimation,
            animationDuration: style.wBarTransitionDuration,
            animationIterationCount: 'infinite'
        }
        setStyle(wBarDiv, wBarDivStyle);
        div.appendChild(wBarDiv);
    }
    return div;
}

const progressAnimationElement = function (form, color, size) {
    let pae;
    switch (form) {
        case 'wave':
            {
                pae = returnWavePAE(color, size);
                break;
            }
        default:
            {
                break;
            }
    }

    return pae
}

const successAnimationElement = function (size) {
    let sae = document.createElement('div');
    let sign = document.createElement('span');
    sign.innerText = 'Success!'
    setStyle(sign, {
        fontSize: '1.5rem',
        color: 'white'
    });
    sae.appendChild(sign);
    let style = {
        padding: '0',
        margin: '0',
        boxSizing: 'border-box',
        position: 'absolute',
        top: '0',
        left: '0',
        borderRadius: '10%',
        width: '100%',
        height: '100%',
        backgroundColor: '#2ecc71',
        zIndex: '10',
        opacity: '0',
        // display:'flex',
        display: 'none',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '2s'
    }
    setStyle(sae, style);
    return sae;
}

const failAnimationElement = function (size) {
    let fae = document.createElement('div');
    let sign = document.createElement('span');
    sign.innerText = 'Fail!'
    setStyle(sign, {
        fontSize: '1.5rem',
        color: 'white'
    });
    fae.appendChild(sign);
    let style = {
        textAlign: 'center',
        padding: '0',
        margin: '0',
        boxSizing: 'border-box',
        position: 'absolute',
        top: '0',
        left: '0',
        borderRadius: '10%',
        width: '100%',
        height: '100%',
        backgroundColor: '#e74c3c',
        zIndex: '10',
        opacity: '0',
        // display:'flex',
        display: 'none',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '2s'
    }
    setStyle(fae, style);
    return fae;
}

export {
    progressAnimationElement,
    successAnimationElement,
    failAnimationElement
}