import GyoButton from './button';
import GyoToggleButton from './togglebutton';
import {noConflict} from './methods.js'

let Gyo;
window.Gyo = Gyo = Gyo || {};

Gyo.button = GyoButton;
Gyo.toggleButton = GyoToggleButton;

Gyo.noConflict = noConflict;