import { LightningElement, api } from 'lwc';

/**
 * uiButtonToggle — 汎用トグルボタン。
 * 押下状態（pressed）を保持するボタン。切替時に change イベント
 * (detail.pressed) を発火する。
 */
export default class UiButtonToggle extends LightningElement {
    /** ラベル */
    @api label;
    /** アイコン文字（任意） */
    @api icon;
    /** 押下状態 */
    @api pressed = false;

    get buttonClass() {
        return this.pressed
            ? 'ui-btntoggle ui-btntoggle_on'
            : 'ui-btntoggle';
    }

    handleClick() {
        this.pressed = !this.pressed;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { pressed: this.pressed } })
        );
    }
}
