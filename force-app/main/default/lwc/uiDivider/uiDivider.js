import { LightningElement, api } from 'lwc';

const SPACINGS = ['small', 'medium', 'large'];

/**
 * uiDivider — 汎用区切り線。
 * label を指定すると中央にラベル付きの区切り、無指定なら水平線を表示する。
 */
export default class UiDivider extends LightningElement {
    /** 中央に表示するラベル（任意） */
    @api label;
    /** 上下の余白: small | medium | large */
    @api spacing = 'medium';

    get rootClass() {
        const spacing = SPACINGS.includes(this.spacing) ? this.spacing : 'medium';
        return `ui-divider ui-divider_${spacing}`;
    }
}
