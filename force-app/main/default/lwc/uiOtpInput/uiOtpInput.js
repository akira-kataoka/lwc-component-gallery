import { LightningElement, api, track } from 'lwc';

/**
 * uiOtpInput — 汎用 OTP（ワンタイムコード）入力。
 * length 桁の 1 文字ずつのマス目に入力し、自動で次のマスへフォーカス移動する。
 * 全桁そろうと complete イベント (detail.value)、変更ごとに change イベントを発火する。
 */
export default class UiOtpInput extends LightningElement {
    /** 桁数 */
    @api length = 6;

    @track _digits = [];

    connectedCallback() {
        this._digits = Array.from({ length: Number(this.length) || 6 }, () => '');
    }

    get boxes() {
        return this._digits.map((d, i) => ({ key: i, index: i, value: d }));
    }

    get value() {
        return this._digits.join('');
    }

    handleInput(event) {
        const i = Number(event.target.dataset.index);
        const ch = (event.target.value || '').replace(/[^0-9]/g, '').slice(-1);
        this._digits = this._digits.map((d, idx) => (idx === i ? ch : d));
        event.target.value = ch;
        if (ch && i < this._digits.length - 1) {
            const next = this.template.querySelector(`input[data-index="${i + 1}"]`);
            if (next) {
                next.focus();
            }
        }
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
        if (this.value.length === this._digits.length && !this._digits.includes('')) {
            this.dispatchEvent(new CustomEvent('complete', { detail: { value: this.value } }));
        }
    }

    handleKeydown(event) {
        const i = Number(event.target.dataset.index);
        if (event.key === 'Backspace' && !event.target.value && i > 0) {
            const prev = this.template.querySelector(`input[data-index="${i - 1}"]`);
            if (prev) {
                prev.focus();
            }
        }
    }
}
