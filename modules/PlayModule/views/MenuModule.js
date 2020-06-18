

/**
 * 需要加载的资源
 */
const MENU_MODULE_LOAD_RESOURCE = {
};

export default function MenuModule(options) {
  let menuStage, menuOptions = {
    initCallBack: Utils.noop,
    renderCallBack: Utils.noop,
    destroyCallBack: Utils.noop,
  };
  Object.assign(menuOptions, options);

  function _init() {
    menuOptions.initCallBack && menuOptions.initCallBack();
    menuStage = new PIXI.Container();
    _render();
  }

  function _render() {
    app.stage.addChild(menuStage);
    menuStage.width = gameWidth;
    menuStage.height = gameHeight;
    menuOptions.renderCallBack && menuOptions.renderCallBack();
  }

  function _destroy() {
    app.stage.removeChild(menuStage);
    menuOptions.destroyCallBack && menuOptions.destroyCallBack();
  }

  MenuModule.init = _init;
  MenuModule.render = _render;
  MenuModule.destroy = _destroy;
}
