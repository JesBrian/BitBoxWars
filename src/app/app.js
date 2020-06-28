import {stage, monitor, loader, ticker} from '../core/core.js';

import loading from './components/Loading/index.js';
import entry  from './views/EntryView/index.js';

/**
 * 游戏主入口
 */
export default function main() {
    window.app = stage;

    window.loader = loader;
    window.ticker = ticker;
    window.loadResource = loading;

    entry();
}
