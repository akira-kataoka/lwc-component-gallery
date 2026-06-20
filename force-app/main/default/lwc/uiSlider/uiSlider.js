import { LightningElement, api } from 'lwc';

/**
 * uiSlider — 汎用スライダー（範囲入力）。
 * min/max/step の範囲で値を選び、変更時に change イベント (detail.value) を発火する。
 */
export default class UiSlider extends LightningElement {
    /** ラベル */
    @api label;
    /** 最小値 */
    @api min = 0;
    /** 最大値 */
    @api max = 100;
    /** 刻み */
    @api step = 1;
    /** 現在値 */
    @api value = 50;
    /** true で現在値を併記 */
    @api showValue = false;

    handleInput(event) {
        this.value = Number(event.target.value);
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
