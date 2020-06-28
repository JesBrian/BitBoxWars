const MAIN_BTN_RESOURCE = {
    MainBtn: 'static/images/icon/button.png'
};

/**
 * 通用主按钮组件
 * @param options
 */
export default function MainBtn(options) {
    let mainBtnOptions = {
        scale: 1,
        anchor: [0, 0],
        position: {x: 0, y: 0},
        initCallBack: DashUtils.noop,
        clickCallBack: DashUtils.noop,
    }, MainBtnSprite, MainBtnTexture, MainBtnOriginHeight;
    Object.assign(mainBtnOptions, options);

    loadResource({
        resource: MAIN_BTN_RESOURCE,
        showProcess: false,
    }).then(_render);

    function _render() {
        MainBtnTexture = PixiUtils.getTexture('MainBtn');
        MainBtnOriginHeight = MainBtnTexture.height;
        MainBtnTexture.frame = new PIXI.Rectangle(0, 0, MainBtnTexture.width, MainBtnOriginHeight / 2);
        MainBtnSprite = PixiUtils.genSprite(MainBtnTexture);
        MainBtnSprite.x = mainBtnOptions.position.x;
        MainBtnSprite.y = mainBtnOptions.position.y;
        MainBtnSprite.width *= mainBtnOptions.scale;
        MainBtnSprite.height *= mainBtnOptions.scale;
        MainBtnSprite.anchor.set(...mainBtnOptions.anchor);
        MainBtnSprite.buttonMode = true;
        MainBtnSprite.interactive = true;
        mainBtnOptions.initCallBack && mainBtnOptions.initCallBack(MainBtnSprite);
        MainBtnSprite.on('touchstart', () => {
            MainBtnTexture.frame = new PIXI.Rectangle(0, MainBtnOriginHeight / 2, MainBtnTexture.width, MainBtnOriginHeight / 2);
        }).on('touchend', () => {
            MainBtnTexture.frame = new PIXI.Rectangle(0, 0, MainBtnTexture.width, MainBtnOriginHeight / 2);
        }).on('touchendoutside', () => {
            MainBtnTexture.frame = new PIXI.Rectangle(0, 0, MainBtnTexture.width, MainBtnOriginHeight / 2);
        }).on('pointertap', () => {
            mainBtnOptions.clickCallBack && mainBtnOptions.clickCallBack();
        });
    }

    function _remove() {
        MainBtnTexture.frame = new PIXI.Rectangle(0, 0, MainBtnTexture.width, MainBtnOriginHeight);
    }

    MainBtn.removeCallBack = _remove;
}
