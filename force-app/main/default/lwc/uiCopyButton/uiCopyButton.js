import { LightningElement, api, track } from 'lwc';

/**
 * uiCopyButton — 汎用コピーボタン。
 * value のテキストをクリップボードにコピーし、一時的に「コピー済み」表示に切替える。
 * コピー時に copy イベント (detail.value) を発火する。
 */
export default class UiCopyButton extends LightningElement {
    /** コピーするテキスト */
    @api value = '';
    /** ボタンラベル */
    @api label = 'コピー';

    @track copied = false;
    _timer;

    get displayLabel() {
        return this.copied ? 'コピー済み' : this.label;
    }

    get iconChar() {
        return this.copied ? '✓' : '📋';
    }

    get buttonClass() {
        return this.copied ? 'ui-copybtn ui-copybtn_done' : 'ui-copybtn';
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
