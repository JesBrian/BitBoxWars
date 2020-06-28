
const LOADING_RESOURCE = {
    LoadingBg: 'static/images/loading/loadingBg.png',
    LoadingBar: 'static/images/loading/loadingBar.png'
};

/**
 * 通用加载资源组件
 * @param options
 * @returns {Promise|Promise|Promise|Promise}
 */
export default function loading(options) {
    let loadOptions = {
        resource: [],
        showProcess: true,
        position: {top: 0, left: 0}
    };
    Object.assign(loadOptions, options);

    let {
        resource, showProcess, position
    } = loadOptions;

    return new Promise((resolve, reject) => {
        let loadingStage = new PIXI.Container(),
            loadingError = false, loadingFinish = false,
            nowLoading = 10, maxLoading = showProcess ? 699 : 10,
            bunny1, sprite, texture;

        app.addChild(loadingStage);

        if (loading.hasInit) {
            loadComplete();
        } else {
            loader.add('loadingBg', LOADING_RESOURCE.LoadingBg).add('loadingBar', LOADING_RESOURCE.LoadingBar).load(loadComplete);
        }

        function loadComplete() {
            bunny1 = PixiUtils.genSprite('loadingBg');
            bunny1.anchor.set(0.5, 0.5);
            bunny1.x = gameWidth * 0.5 + (position.left || 0);
            bunny1.y = gameHeight * 0.68 + (position.top || 0);

            texture = PixiUtils.getTexture('loadingBar');
            texture.frame = new PIXI.Rectangle(0, 0, nowLoading, 32);
            sprite = PixiUtils.genSprite(texture);
            sprite.anchor.set(0, 0.5);
            sprite.x = (gameWidth - bunny1.width) * 0.5 + (position.left || 0);
            sprite.y = bunny1.y;

            showProcess && loadingStage.addChild(bunny1, sprite);
            ticker.add(_loadingLoop);

            loading.hasInit = true;

            if (resource) {
                // 判断以前没加载过该资源才添加到待加载资源列表内
                for (let key in resource) if (!loader.resources[key]) loader.add(key, resource[key]);

                loader.once('error', (loader) => {
                    loadingError = true;
                    return reject();
                }).once('complete', () => {
                    loadingFinish = true;
                    if (_checkEnd()) {
                        _finishEvent();
                        return resolve();
                    }
                }).load();
            } else {
                return resolve();
            }
        }

        function _checkEnd() {
            return (loadingStage && nowLoading >= maxLoading && loadingFinish);
        }

        function _loadingLoop() {
            if (_checkEnd()) {
                _finishEvent();
                return resolve();
            }
            nowLoading += 5;
            texture.frame = new PIXI.Rectangle(0, 0, nowLoading, 32);
        }

        function _finishEvent() {
            if (loadingError || _finishEvent.hasRun) return;
            app.removeChild(loadingStage);
            ticker.remove(_loadingLoop);
            _finishEvent.hasRun = true;
        }
    });
}
