import { install } from '@pixi/unsafe-eval';

install(PIXI);

PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL;
PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
PIXI.settings.SORTABLE_CHILDREN = true;

const {
    windowWidth,
    windowHeight,
    devicePixelRatio,
} = wx.getSystemInfoSync();

window.WebGLRenderingContext = {};
window.devicePixelRatio = devicePixelRatio;
window.windowWidth = windowWidth;
window.windowHeight = windowHeight;
window.gameWidth = Math.ceil(750 * windowWidth / windowHeight);
window.gameHeight = 750;
window.scaleX = gameWidth / windowWidth;
window.scaleY = gameHeight / windowHeight;
