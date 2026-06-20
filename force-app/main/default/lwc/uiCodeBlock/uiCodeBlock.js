import { LightningElement, api, track } from 'lwc';

/**
 * uiCodeBlock — 汎用コードブロック。
 * code をシンタックス色なしの等幅で表示し、コピーボタンでクリップボードへコピーする。
 * コピー時に copy イベントを発火する。
 */
export default class UiCodeBlock extends LightningElement {
    /** 表示するコード */
    @api code = '';
    /** 言語ラベル（例: JS, Apex） */
    @api label = 'CODE';

    @track copied = false;
    _timer;

    get copyLabel() {
        return this.copied ? '✓ コピー済み' : '📋 コピー';
    }

    handleCopy() {
        const text = this.code || '';
        const done = () => {
            this.copied = true;
            this.dispatchEvent(new CustomEvent('copy'));
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
