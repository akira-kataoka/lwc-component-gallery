import { LightningElement, api } from 'lwc';

/**
 * uiCurrencyInput — 汎用通貨入力。
 * 数値を 3 桁区切りで整形しながら入力し、記号を前置する。
 * 変更時に change イベント (detail.value = 数値) を発火する。
 */
export default class UiCurrencyInput extends LightningElement {
    /** ラベル */
    @api label;
    /** 数値の値 */
    @api value = 0;
    /** 通貨記号 */
    @api symbol = '¥';

    get display() {
        return Number(this.value || 0).toLocaleString('ja-JP');
    }

    handleInput(event) {
        const raw = (event.target.value || '').replace(/[^0-9]/g, '');
        this.value = raw ? Number(raw) : 0;
        event.target.value = this.value.toLocaleString('ja-JP');
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
