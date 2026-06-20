import { LightningElement, api } from 'lwc';

const TRENDS = {
    up: { icon: '▲', cls: 'up' },
    down: { icon: '▼', cls: 'down' },
    flat: { icon: '▬', cls: 'flat' }
};

/**
 * uiTrendBadge — 汎用トレンドバッジ。
 * 増減（trend）に応じた色・矢印で値（例: +12.5%）をコンパクトに表示する。
 */
export default class UiTrendBadge extends LightningElement {
    /** 表示テキスト（例: +12.5%） */
    @api value;
    /** 増減: up | down | flat */
    @api trend = 'up';

    get badgeClass() {
        const cls = (TRENDS[this.trend] || TRENDS.flat).cls;
        return `ui-trend ui-trend_${cls}`;
    }

    get iconChar() {
        return (TRENDS[this.trend] || TRENDS.flat).icon;
    }
}
