import CloseBtn from '../../components/CloseBtn/index.js';

/**
 * 需要加载的资源
 */
const MENU_MODULE_LOAD_RESOURCE = {
  Mask: 'static/images/Mask.png',
};

export default function MenuView(options) {
  let menuOptions = {
    initCallBack: Utils.noop,
    renderCallBack: Utils.noop,
    destroyCallBack: Utils.noop,
  }, menuStage;
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

    CloseBtn({
      scale: 1.5,
      position: {x: 38, y: 38},
      initCallBack: (closeBtn) => {
        menuStage.addChild(closeBtn);
      },
      clickCallBack: _destroy,
    });

    menuStage.addChild(MaskBg);
    menuOptions.renderCallBack && menuOptions.renderCallBack();
  }

  function _destroy() {
    app.stage.removeChild(menuStage);
    menuOptions.destroyCallBack && menuOptions.destroyCallBack();
    CloseBtn.removeCallBack();
  }

  MenuView.init = _init;
  MenuView.render = _render;
  MenuView.destroy = _destroy;

  return MenuView;
}
