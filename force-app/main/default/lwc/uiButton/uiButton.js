import { LightningElement, api } from 'lwc';

const VARIANTS = ['brand', 'neutral', 'outline', 'success', 'destructive'];

/**
 * uiButton — 汎用ボタン。
 * 色バリアント・アイコン・無効化に対応し、click イベントを発火する。
 */
export default class UiButton extends LightningElement {
    /** ボタンラベル */
    @api label;
    /** 色バリアント: brand | neutral | outline | success | destructive */
    @api variant = 'brand';
    /** 任意の lightning-icon 名 (例: utility:add) */
    @api iconName;
    /** true で無効化 */
    @api disabled = false;
    /** ネイティブ type: button | submit | reset */
    @api type = 'button';
    /** true で横幅いっぱいに広げる */
    @api stretch = false;

    get computedClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        return `ui-button ui-button_${variant}${this.stretch ? ' ui-button_stretch' : ''}`;
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('click'));
    }
}
