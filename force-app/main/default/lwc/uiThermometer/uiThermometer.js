import { LightningElement, api } from 'lwc';

const VARIANTS = ['brand', 'success', 'warning', 'error'];

/**
 * uiThermometer — 汎用サーモメーター（縦型メーター）。
 * 0〜100 の値を下から積み上がる縦バーで表示する。
 */
export default class UiThermometer extends LightningElement {
    /** 値 0〜100 */
    @api value = 0;
    /** ラベル */
    @api label;
    /** 色: brand | success | warning | error */
    @api variant = 'brand';

    get clamped() {
        const n = Number(this.value);
        if (Number.isNaN(n)) {
            return 0;
        }
        return Math.min(100, Math.max(0, n));
    }

    get fillStyle() {
        return `height: ${this.clamped}%`;
    }

    get fillClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        return `ui-thermo__fill ui-thermo__fill_${variant}`;
    }

    get valueText() {
        return `${Math.round(this.clamped)}%`;
    }
}
