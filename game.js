window.WebGLRenderingContext = true;
import './manifest';
import WXLoadPlugin from './libs/load/wxcache';
import App from './run/main';

WXLoadPlugin.boot('assets');
PIXI.Loader.registerPlugin(WXLoadPlugin);
App();
