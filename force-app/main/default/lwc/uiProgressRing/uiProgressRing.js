import { LightningElement, api } from 'lwc';

const SIZES = ['small', 'medium', 'large'];
const VARIANTS = ['brand', 'success', 'warning', 'error'];
const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * uiProgressRing — 汎用円形プログレス。
 * 0〜100 の値を SVG リングで表示し、任意で中央にパーセントを併記する。
 */
export default class UiProgressRing extends LightningElement {
    /** 進捗率 0〜100 */
    @api value = 0;
    /** サイズ: small | medium | large */
    @api size = 'medium';
    /** 色: brand | success | warning | error */
    @api variant = 'brand';
    /** true で中央にパーセント表示 */
    @api showLabel = false;

    get clampedValue() {
        const n = Number(this.value);
        if (Number.isNaN(n)) {
            return 0;
        }
        return Math.min(100, Math.max(0, n));
    }

    get rootClass() {
        const size = SIZES.includes(this.size) ? this.size : 'medium';
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        return `ui-ring ui-ring_${size} ui-ring_${variant}`;
    }

    get ringStyle() {
        const offset = CIRCUMFERENCE * (1 - this.clampedValue / 100);
        return `stroke-dasharray: ${CIRCUMFERENCE}; stroke-dashoffset: ${offset};`;
    }

    get labelText() {
        return `${Math.round(this.clampedValue)}%`;
    }
}
