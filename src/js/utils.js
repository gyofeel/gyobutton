let _Gyo = window.Gyo;
const noConflict = (deep) => {
    let temp = window.Gyo;
    if (deep && window.Gyo === Gyo) {
        window.Gyo = _Gyo;
    }
    return temp;
}

export {
    noConflict
};