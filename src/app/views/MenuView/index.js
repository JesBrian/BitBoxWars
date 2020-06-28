/**
 * 需要加载的资源
 */
const MENU_MODULE_LOAD_RESOURCE = {
    Mask: 'static/images/Mask.png',
};

export default function MenuView(options) {
    let menuOptions = {
        initCallBack: DashUtils.noop,
        renderCallBack: DashUtils.noop,
        destroyCallBack: DashUtils.noop,
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
        app.addChild(menuStage);
        menuStage.width = gameWidth;
        menuStage.height = gameHeight;

        const MaskBg = PixiUtils.genSprite('Mask');
        MaskBg.width = gameWidth;
        MaskBg.height = gameHeight;

        closeBtn({
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
        app.removeChild(menuStage);
        menuOptions.destroyCallBack && menuOptions.destroyCallBack();
        closeBtn.removeCallBack();
    }

    MenuView.init = _init;
    MenuView.render = _render;
    MenuView.destroy = _destroy;

    return MenuView;
}
