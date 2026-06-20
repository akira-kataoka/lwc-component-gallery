import { LightningElement, api } from 'lwc';

/**
 * uiInput — 汎用テキスト入力。
 * ラベル・プレースホルダ・必須表示に対応し、入力時に change イベント
 * (detail.value) を発火する。
 */
export default class UiInput extends LightningElement {
    /** ラベル */
    @api label;
    /** 入力値 */
    @api value = '';
    /** プレースホルダ */
    @api placeholder = '';
    /** input type: text | email | number | password など */
    @api type = 'text';
    /** true で必須マーク表示 */
    @api required = false;
    /** true で無効化 */
    @api disabled = false;

    handleInput(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
