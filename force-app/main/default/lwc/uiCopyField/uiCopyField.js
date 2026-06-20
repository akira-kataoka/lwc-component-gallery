import { LightningElement, api, track } from 'lwc';

/**
 * uiCopyField — 汎用コピー入力。
 * 読み取り専用のテキストとコピーボタンを組み合わせたフィールド。
 * コピー時に一時的にチェック表示へ切替え、copy イベント (detail.value) を発火する。
 */
export default class UiCopyField extends LightningElement {
    /** ラベル */
    @api label;
    /** 表示・コピーする値 */
    @api value = '';

    @track copied = false;
    _timer;

    get copyIcon() {
        return this.copied ? '✓' : '📋';
    }

    get buttonClass() {
        return this.copied
            ? 'ui-copyfield__btn ui-copyfield__btn_done'
            : 'ui-copyfield__btn';
    }

    handleCopy() {
        const text = this.value || '';
        const done = () => {
            this.copied = true;
            this.dispatchEvent(
                new CustomEvent('copy', { detail: { value: text } })
            );
            if (this._timer) {
                clearTimeout(this._timer);
            }
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            this._timer = setTimeout(() => {
                this.copied = false;
            }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, done);
        } else {
            done();
        }
    }
}
