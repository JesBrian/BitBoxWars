
const CLOSE_BTN_RESOURCE = {
  CloseBtn: 'static/images/icon/close.png'
};

/**
 * 通用关闭按钮组件
 * @param options
 */
export default function CloseBtn(options) {
  let closeBtnOptions = {
    scale: 1,
    anchor: [0, 0],
    position: {x: 0, y: 0},
    initCallBack: Utils.noop,
    clickCallBack: Utils.noop,
  }, CloseBtnSprite, CloseBtnTexture, CloseBtnOriginWidth;
  Object.assign(closeBtnOptions, options);

  loadResource({
    resource: CLOSE_BTN_RESOURCE,
    showProcess: false,
  }).then(_render);

  function _render() {
    CloseBtnTexture = PIXI.utils.TextureCache['CloseBtn'];
    CloseBtnOriginWidth = CloseBtnTexture.width;
    CloseBtnTexture.frame = new PIXI.Rectangle(CloseBtnOriginWidth / 3 * 2, 0, CloseBtnOriginWidth / 3, CloseBtnTexture.height);
    CloseBtnSprite = new PIXI.Sprite(CloseBtnTexture);
    CloseBtnSprite.x = closeBtnOptions.position.x;
    CloseBtnSprite.y = closeBtnOptions.position.y;
    CloseBtnSprite.width *= closeBtnOptions.scale;
    CloseBtnSprite.height *= closeBtnOptions.scale;
    CloseBtnSprite.anchor.set(...closeBtnOptions.anchor);
    CloseBtnSprite.buttonMode = true;
    CloseBtnSprite.interactive = true;
    closeBtnOptions.initCallBack && closeBtnOptions.initCallBack(CloseBtnSprite);
    CloseBtnSprite.on('touchstart', () => {
      CloseBtnTexture.frame = new PIXI.Rectangle(0, 0, CloseBtnOriginWidth / 3, CloseBtnTexture.height);
    }).on('touchend', () => {
      CloseBtnTexture.frame = new PIXI.Rectangle(CloseBtnOriginWidth / 3 * 2, 0, CloseBtnOriginWidth / 3, CloseBtnTexture.height);
    }).on('touchendoutside', () => {
      CloseBtnTexture.frame = new PIXI.Rectangle(CloseBtnOriginWidth / 3 * 2, 0, CloseBtnOriginWidth / 3, CloseBtnTexture.height);
    }).on('pointertap', () => {
      closeBtnOptions.clickCallBack && closeBtnOptions.clickCallBack();
    });
  }

  function _remove() {
    CloseBtnTexture.frame = new PIXI.Rectangle(0, 0, CloseBtnOriginWidth, CloseBtnTexture.height);
  }

  CloseBtn.removeCallBack = _remove;
}
