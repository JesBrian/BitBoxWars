import { loader } from '../core/core.js';

const getTexture = (name = '') => {
    return loader.resources[name].texture;
};

const genSprite = (target = '') => {
    return new PIXI.Sprite(typeof(target) === 'string' ? getTexture(target) : target);
};

export default {
    getTexture, genSprite
};
