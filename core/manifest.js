import '../libs/weapp-adapter.js';
import '../libs/pixi.min.js';
import '../libs/unsafe-eval.min.js';
import { DOMParser } from '../libs/xmldom/xmldom.js';

import Utils from '../utils/functions.js';

window.Utils = Utils;
window.DOMParser = DOMParser;
window.WebGLRenderingContext = {};
window.windowWidth = window.innerWidth;
window.windowHeight = window.innerHeight;
window.gameWidth = Math.ceil(750 * windowWidth / innerHeight);
window.gameHeight = 750;
window.scaleX = gameWidth / windowWidth;
window.scaleY = gameHeight / windowHeight;
