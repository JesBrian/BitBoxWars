

/**
 * 需要加载的资源
 */
const MENU_MODULE_LOAD_RESOURCE = {
  Mask: 'static/images/Mask.png',
  Close: 'static/images/icon/close.png',
};

export default function MenuModule(options) {
  let menuOptions = {
    initCallBack: Utils.noop,
    renderCallBack: Utils.noop,
    destroyCallBack: Utils.noop,
  }, menuStage, CloseBtn, CloseBtnTexture, CloseBtnOriginWidth;
  Object.assign(menuOptions, options);

  function _init() {
    menuOptions.initCallBack && menuOptions.initCallBack();
    menuStage = new PIXI.Container();

    loadResource({
      resource: MENU_MODULE_LOAD_RESOURCE,
      showProcess: false,
    }).then(_render);
  }

  function _render() {
    app.stage.addChild(menuStage);
    menuStage.width = gameWidth;
    menuStage.height = gameHeight;

    const MaskBg = PIXI.Sprite.from('Mask');
    MaskBg.width = gameWidth;
    MaskBg.height = gameHeight;

    CloseBtnTexture = PIXI.utils.TextureCache['Close'];
    CloseBtnOriginWidth = CloseBtnTexture.width;
    CloseBtnTexture.frame = new PIXI.Rectangle(CloseBtnOriginWidth / 4 * 2, 0, CloseBtnOriginWidth / 4, CloseBtnTexture.height);
    CloseBtn = new PIXI.Sprite(CloseBtnTexture);
    CloseBtn.x = 38;
    CloseBtn.y = 38;
    CloseBtn.width *= 1.5;
    CloseBtn.height *= 1.5;
    CloseBtn.buttonMode = true;
    CloseBtn.interactive = true;
    CloseBtn.on('pointertap', () => {
      _destroy();
    });

    menuStage.addChild(MaskBg, CloseBtn);
    menuOptions.renderCallBack && menuOptions.renderCallBack();
  }

  function _destroy() {
    CloseBtnTexture.frame = new PIXI.Rectangle(0, 0, CloseBtnOriginWidth, CloseBtnTexture.height);
    app.stage.removeChild(menuStage);
    menuOptions.destroyCallBack && menuOptions.destroyCallBack();
  }

  MenuModule.init = _init;
  MenuModule.render = _render;
  MenuModule.destroy = _destroy;
}
