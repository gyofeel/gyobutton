import GyoButton from './button';
import {
    progressAnimationElement,
    successAnimationElement,
    failAnimationElement
} from './elements';
import {
    setStyle,
    returnComputedStyle,
} from './functions';

'use strict';

const GyoProgressButton = function (sel) {

    //GyoProgressButton
    //Private Member
    //Variables
    const _this = GyoButton.call(this, sel);
    let nodeElementsArr;
    const nodeArr = _this.getNodeArr();
    //Methods
    const _private = {
        showResult: function (el, res) {
            if (res) {
                setStyle(el.successEl, {
                    display: 'flex',
                });
                setTimeout(() => {
                    setStyle(el.successEl, {
                        opacity: '1',
                    });
                }, 1000);
                setTimeout(() => {
                    setStyle(el.successEl, {
                        opacity: '0',
                    });
                    setTimeout(() => {
                        setStyle(el.successEl, {
                            display: 'none'
                        });
                    }, 2000);
                }, 5000);
            } else {
                setStyle(el.failEl, {
                    display: 'flex',
                });
                setTimeout(() => {
                    setStyle(el.failEl, {
                        opacity: '1',
                    });
                }, 1000)
                setTimeout(() => {
                    setStyle(el.failEl, {
                        opacity: '0',
                    });
                    setTimeout(() => {
                        setStyle(el.failEl, {
                            display: 'none'
                        })
                    }, 2000);
                }, 5000);
            }
        },
        initProgressBtnEl: function (nodeElementsArr) {
            for (let el of nodeElementsArr) {
                el.node.insertAdjacentElement('beforebegin', el.wrap);
                el.wrap.appendChild(el.node);
                setStyle(el.wrap, {
                    margin: '0',
                    padding: '0',
                    position: 'relative',
                    width: 'auto',
                    height: 'auto',
                    display: 'inline-block',
                    boxSizing: 'border-box',
                });
                el.wrap.appendChild(el.successEl);
                el.wrap.appendChild(el.failEl);
                el.node.insertAdjacentElement('afterend', el.progressEl);
            }
        }
    };

    return {
        ..._this,
        progressInit: function ({
            form,
            position,
            color,
            size
        }) {
            if (!nodeElementsArr) {
                let that = this;
                form = form || 'wave';
                position = position || 'top';
                color = color || 'gray';
                size = size || '30px';

                const callback = function (e) {
                    const idx = nodeElementsArr.findIndex((o) => o.node === e.currentTarget);
                    const element = nodeElementsArr[idx];
                    element.progressEl.style.display = 'flex';
                    switch (position) {
                        case 'top':
                            {
                                element.progressEl.style.top = parseInt(returnComputedStyle(element.node, 'height')) / 7 + 'px';
                                break;
                            }
                        case 'right':
                            {
                                element.progressEl.style.left = parseInt(returnComputedStyle(element.wrap, 'width')) - parseInt(returnComputedStyle(element.wrap, 'width')) / 8 + 'px';
                                break;
                            }
                        case 'bottom':
                            {
                                element.progressEl.style.top = parseInt(returnComputedStyle(element.wrap, 'height')) - parseInt(returnComputedStyle(element.wrap, 'height')) / 7 + 'px';
                                break;
                            }
                        case 'left':
                            {
                                element.progressEl.style.left = parseInt(returnComputedStyle(element.node, 'width')) / 8 + 'px';
                                break;
                            }
                        case 'center':
                            {
                                break;
                            }
                        default:
                            break;
                    }
                    element.progressEl.style.opacity = '1';
                }
                nodeElementsArr = Array.from(nodeArr).map((el) => ({
                    node: el,
                    wrap: document.createElement('div'),
                    progressEl: progressAnimationElement(form, color, size),
                    successEl: successAnimationElement(),
                    failEl: failAnimationElement()
                }));
                for (let el of nodeElementsArr) {
                    el.node.addEventListener('click', callback);
                }
                _private.initProgressBtnEl(nodeElementsArr);
            }
        },
        getNode: function () {
            return nodeArr
        },
        progressEnd: function (node, res) {
            const idx = nodeElementsArr.findIndex((o) => o.node === node);
            nodeElementsArr[idx].progressEl.style.left = '50%';
            nodeElementsArr[idx].progressEl.style.top = '50%';
            nodeElementsArr[idx].progressEl.style.opacity = '0';
            let temp = parseInt(nodeElementsArr[idx].progressEl.style.transitionDuration);
            setTimeout(() => {
                nodeElementsArr[idx].progressEl.style.display = 'none';
            }, (temp <= 0) ? 1000 : temp * 1000);

            _private.showResult(nodeElementsArr[idx], res);
        }
    }
};

export default GyoProgressButton;