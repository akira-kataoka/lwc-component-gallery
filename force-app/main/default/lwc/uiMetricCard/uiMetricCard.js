import { LightningElement, api } from 'lwc';

const TRENDS = {
    up: { icon: '▲', cls: 'up' },
    down: { icon: '▼', cls: 'down' },
    flat: { icon: '▬', cls: 'flat' }
};

/**
 * uiMetricCard — 汎用指標カード（ダッシュボード KPI）。
 * アイコン・ラベル・大きな値・前期比をまとめた KPI カード。
 */
export default class UiMetricCard extends LightningElement {
    /** アイコン文字（絵文字可） */
    @api icon;
    /** 指標ラベル */
    @api label;
    /** 主要な値 */
    @api value;
    /** 差分テキスト（例: +12.5%） */
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
        return `ui-metric__delta ui-metric__delta_${cls}`;
    }
}
