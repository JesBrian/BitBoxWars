

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
    menuStage = new PIXI.Container();
    menuStage.width = gameWidth;
    menuStage.height = gameHeight;
    menuStage.zIndex = 100;
    menuOptions.initCallBack && menuOptions.initCallBack();
    _render();
  }

  function _render() {
    app.stage.addChild(menuStage);
    menuOptions.renderCallBack && menuOptions.renderCallBack();
  }

  function _destroy() {
    app.stage.removeChild(menuStage);
    menuOptions.destroyCallBack && menuOptions.destroyCallBack();
    // return new Promise((resolve, reject) => {
    //   resolve();
    // });
  }

  MenuModule.init = _init;
  MenuModule.render = _render;
  MenuModule.destroy = _destroy;
}
