import { LightningElement, api } from 'lwc';

/**
 * uiPhoneInput — 汎用電話番号入力。
 * 数字のみ受け付け、3-4-4 のハイフン区切りに自動整形する（最大 11 桁）。
 * 変更時に change イベント (detail.value) を発火する。
 */
export default class UiPhoneInput extends LightningElement {
    /** ラベル */
    @api label;
    /** 値（整形済みの文字列） */
    @api value = '';

    format(digits) {
        const d = digits.slice(0, 11);
        if (d.length > 7) {
            return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
        }
        if (d.length > 3) {
            return `${d.slice(0, 3)}-${d.slice(3)}`;
        }
        return d;
    }

    handleInput(event) {
        const digits = (event.target.value || '').replace(/[^0-9]/g, '');
        this.value = this.format(digits);
        event.target.value = this.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
