import './libs/weapp-adapter';
import './libs/pixi';
import './libs/unsafe-eval.min';
import './libs/gsap3/gsap.min';
import './libs/gsap3/PixiPlugin.min';

window.DOMParser = require('./libs/xmldom/xmldom.js').DOMParser;
window.windowWidth = window.innerWidth;
window.windowHeight = window.innerHeight;
window.gameWidth = Math.ceil(750 * windowWidth / innerHeight);
window.gameHeight = 750;
window.scaleX = gameWidth / windowWidth;
window.scaleY = gameHeight / windowHeight;
