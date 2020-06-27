const ticker = PIXI.Ticker.shared;
const loader = PIXI.Loader.shared;
const stage = new PIXI.Container();
const monitor = new PIXI.utils.EventEmitter();
const pixelRatio = Math.min(2, devicePixelRatio);

const renderer = new PIXI.Renderer({
    view: canvas,
    antialias: true,
    backgroundColor: 0x333333,
    width: gameWidth * pixelRatio,
    height: gameHeight * pixelRatio,
});

renderer.plugins.accessibility.destroy();
renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
    point.set(x * pixelRatio, y * pixelRatio);
};

ticker.add(() => renderer.render(stage));

export {
    stage,
    loader,
    ticker,
    monitor,
    renderer,
};
