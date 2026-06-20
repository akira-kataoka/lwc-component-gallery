import { LightningElement, api } from 'lwc';

const TRENDS = {
    up: { icon: '▲', cls: 'up' },
    down: { icon: '▼', cls: 'down' },
    flat: { icon: '—', cls: 'flat' }
};

/**
 * uiStat — 汎用 KPI 表示タイル。
 * ラベル・大きな値・前期比（delta）を表示し、trend で増減色を切替える。
 */
export default class UiStat extends LightningElement {
    /** 指標ラベル */
    @api label;
    /** 主要な値（例: ¥1,250,000） */
    @api value;
    /** 補足の差分テキスト（例: +12.5%） */
    @api delta;
    /** 増減: up | down | flat */
    @api trend = 'flat';

    get hasDelta() {
        return this.delta !== undefined && this.delta !== null && this.delta !== '';
    }

    get trendIcon() {
        return (TRENDS[this.trend] || TRENDS.flat).icon;
    }

    get deltaClass() {
        const cls = (TRENDS[this.trend] || TRENDS.flat).cls;
        return `ui-stat__delta ui-stat__delta_${cls}`;
    }
}
