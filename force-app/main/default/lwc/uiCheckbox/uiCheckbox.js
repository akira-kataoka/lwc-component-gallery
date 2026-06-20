import { LightningElement, api } from 'lwc';

/**
 * uiCheckbox — 汎用チェックボックス。
 * ラベル付きのチェックボックスで、変更時に change イベント
 * (detail.checked) を発火する。
 */
export default class UiCheckbox extends LightningElement {
    /** ラベル */
    @api label;
    /** チェック状態 */
    @api checked = false;
    /** true で無効化 */
    @api disabled = false;

    handleChange(event) {
        this.checked = event.target.checked;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { checked: this.checked } })
        );
    }
}
