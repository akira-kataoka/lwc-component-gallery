import { LightningElement, api } from 'lwc';

const RADIUS = 40;
const ARC_LEN = Math.PI * RADIUS;
const VARIANTS = ['brand', 'success', 'warning', 'error'];

/**
 * uiGauge — 汎用半円ゲージ。
 * 0〜100 の値を半円アーク（SVG）で表示し、中央に数値を出す。
 */
export default class UiGauge extends LightningElement {
    /** 値 0〜100 */
    @api value = 0;
    /** ラベル */
    @api label;
    /** 単位（既定は %） */
    @api unit = '%';
    /** 色: brand | success | warning | error */
    @api variant = 'brand';

    get clamped() {
        const n = Number(this.value);
        if (Number.isNaN(n)) {
            return 0;
        }
        return Math.min(100, Math.max(0, n));
    }

    get dash() {
        const filled = (this.clamped / 100) * ARC_LEN;
        return `${filled.toFixed(2)} ${ARC_LEN.toFixed(2)}`;
    }

    get barClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        return `ui-gauge__bar ui-gauge__bar_${variant}`;
    }

    get valueText() {
        return `${Math.round(this.clamped)}${this.unit}`;
    }
}
