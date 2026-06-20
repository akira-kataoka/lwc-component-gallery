import { LightningElement, api } from 'lwc';

const SIZES = ['small', 'medium', 'large'];

/**
 * uiSpinner — 汎用ローディングスピナー。
 * サイズと色バリアントに対応した CSS アニメーションの円形スピナー。
 */
export default class UiSpinner extends LightningElement {
    /** サイズ: small | medium | large */
    @api size = 'medium';
    /** バリアント: brand | inverse */
    @api variant = 'brand';
    /** スクリーンリーダー向けの代替テキスト */
    @api alternativeText = '読み込み中';

    get spinnerClass() {
        const size = SIZES.includes(this.size) ? this.size : 'medium';
        const variant = this.variant === 'inverse' ? 'inverse' : 'brand';
        return `ui-spinner ui-spinner_${size} ui-spinner_${variant}`;
    }
}
