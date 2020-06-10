
const LOADING_RESOURCE = {
  LoadingBg: 'images/loading/loadingBg.png',
  LoadingBar: 'images/loading/loadingBar.png'
};

/**
 * 通用加载资源组件
 * @param resource
 * @returns {Promise}
 */
export default function loading(resource = [], position = {top: 0, left: 0}) {
  const loader = app.loader;
  return new Promise((resolve, reject) => {
    let loadingStage = new PIXI.Container(),
      loadingError = false, loadingFinish = false,
      nowLoading = 10, maxLoading = 699,
      bunny1, sprite, texture;

    if (loading.hasInit) loadComplete();
    else loader.add('loadingBg', 'images/loading/loadingBg.png').add('loadingBar', 'images/loading/loadingBar.png').load(loadComplete);

    app.stage.addChild(loadingStage);

    function loadComplete() {
      bunny1 = PIXI.Sprite.from('loadingBg');
      bunny1.anchor.set(0.5, 0.5);
      bunny1.x = gameWidth * 0.5 + (position.left || 0);
      bunny1.y = gameHeight * 0.68 + (position.top || 0);
      loadingStage.addChild(bunny1);

      texture = PIXI.utils.TextureCache['loadingBar'];
      texture.frame = new PIXI.Rectangle(0, 0, nowLoading, 32);
      sprite = new PIXI.Sprite(texture);
      sprite.anchor.set(0, 0.5);
      sprite.x = (gameWidth - bunny1.width) * 0.5 + (position.left || 0);
      sprite.y = bunny1.y;
      loadingStage.addChild(sprite);

      app.ticker.add(_loadingLoop);
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
      app.stage.removeChild(loadingStage);
      app.ticker.remove(_loadingLoop);
      _finishEvent.hasRun = true;
    }
  });
}
