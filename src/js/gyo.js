import GyoButton from './button';
import GyoToggleButton from './togglebutton';
import GyoProgressButton from './progressbutton';

import {
    noConflict
} from './utils'

let Gyo;
window.Gyo = Gyo = Gyo || {};

Gyo.button = GyoButton;
Gyo.toggleButton = GyoToggleButton;
// Gyo.progressButton = GyoProgressButton;

Gyo.noConflict = noConflict;