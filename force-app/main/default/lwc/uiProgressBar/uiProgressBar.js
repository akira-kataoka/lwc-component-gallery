import { LightningElement, api } from 'lwc';

const VARIANTS = ['brand', 'success', 'warning', 'error'];

/**
 * uiProgressBar — 汎用プログレスバー。
 * 0〜100 の値を色付きバーで表示し、任意でパーセント数値を併記する。
 */
export default class UiProgressBar extends LightningElement {
    /** 進捗率 0〜100 */
    @api value = 0;
    /** 色バリアント: brand | success | warning | error */
    @api variant = 'brand';
    /** true でパーセント表示 */
    @api showLabel = false;

    get clampedValue() {
        const n = Number(this.value);
        if (Number.isNaN(n)) {
            return 0;
        }
        return Math.min(100, Math.max(0, n));
    }

    get barStyle() {
        return `width: ${this.clampedValue}%`;
    }

    get fillClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        return `ui-progress__fill ui-progress__fill_${variant}`;
    }

    get labelText() {
        return `${Math.round(this.clampedValue)}%`;
    }
}
