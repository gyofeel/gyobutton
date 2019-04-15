import {
  prefixArr,
} from './constants';

'use strict';

const setStyle = (node, style) => {
  const _style = Object.entries(style);
  for (const v of _style) {
    node.style[v[0]] = v[1];
    // To add vendor-prefix(Cross Browsing)
    // v[0][0].toUpperCase(): first chracter of property name to capital chracter.
    // Array.from(v[0]).splice(1).join(''): remove first character
    // let temp = v[0][1].toUpperCase() + Array.from(v[0]).map((el, i)=>{if(i!==0)return el})
    const temp = v[0][0].toUpperCase() + Array.from(v[0]).splice(1).join('');
    for (const el of prefixArr) node.style[el + temp] = v[1];
  }
};

const returnComputedStyle = (node, property) => window.getComputedStyle(node)[property];

const addEvent = (node, event, callback) => {
  node.addEventListener(event, callback);
};
const removeEvent = (node, event, callback) => {
  node.removeEventListener(event, callback);
};

export {
  setStyle,
  returnComputedStyle,
  addEvent,
  removeEvent,
};