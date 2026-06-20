import { LightningElement, api } from 'lwc';

/**
 * uiDateField — 汎用日付フィールド。
 * ラベル付きの日付入力。変更時に change イベント (detail.value) を発火する。
 */
export default class UiDateField extends LightningElement {
    /** ラベル */
    @api label;
    /** 値（YYYY-MM-DD） */
    @api value = '';
    /** true で無効化 */
    @api disabled = false;

    handleChange(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
