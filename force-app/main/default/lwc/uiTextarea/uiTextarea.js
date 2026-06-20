import { LightningElement, api } from 'lwc';

/**
 * uiTextarea — 汎用複数行テキスト入力。
 * ラベル・行数・プレースホルダに対応し、入力時に change イベント
 * (detail.value) を発火する。
 */
export default class UiTextarea extends LightningElement {
    /** ラベル */
    @api label;
    /** 入力値 */
    @api value = '';
    /** プレースホルダ */
    @api placeholder = '';
    /** 表示行数 */
    @api rows = 4;
    /** true で無効化 */
    @api disabled = false;

    handleInput(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
