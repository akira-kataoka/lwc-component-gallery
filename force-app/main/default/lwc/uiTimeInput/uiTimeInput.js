import { LightningElement, api } from 'lwc';

/**
 * uiTimeInput — 汎用時刻入力。
 * ラベル付きの時刻入力。変更時に change イベント (detail.value) を発火する。
 */
export default class UiTimeInput extends LightningElement {
    /** ラベル */
    @api label;
    /** 値（HH:mm） */
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
