import { LightningElement, api } from 'lwc';

/**
 * uiMeter — 汎用メーター。
 * value / max の割合を色付きバーで表示する。割合に応じて
 * 低（赤）/中（橙）/高（緑）に色が変わる。
 */
export default class UiMeter extends LightningElement {
    /** 現在値 */
    @api value = 0;
    /** 最大値 */
    @api max = 100;
    /** ラベル */
    @api label;

    get ratio() {
        const max = Number(this.max) || 1;
        const v = Number(this.value) || 0;
        return Math.min(1, Math.max(0, v / max));
    }

    get fillClass() {
        const r = this.ratio;
        let level = 'high';
        if (r < 0.34) {
            level = 'low';
        } else if (r < 0.67) {
            level = 'mid';
        }
        return `ui-meter__fill ui-meter__fill_${level}`;
    }

    get fillStyle() {
        return `width: ${Math.round(this.ratio * 100)}%`;
    }

    get valueText() {
        return `${this.value} / ${this.max}`;
    }
}
