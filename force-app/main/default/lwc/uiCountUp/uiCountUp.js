import { LightningElement, api, track } from 'lwc';

/**
 * uiCountUp — 汎用カウントアップ。
 * 0 から value までアニメーションで数値を増やして表示する。
 * prefix / suffix を前後に付けられる。play() メソッドで再生し直せる。
 */
export default class UiCountUp extends LightningElement {
    /** 目標値 */
    @api value = 0;
    /** アニメーション時間(ms) */
    @api duration = 1200;
    /** 接頭辞（例: ¥） */
    @api prefix = '';
    /** 接尾辞（例: 件） */
    @api suffix = '';

    @track current = 0;
    _timer;
    _started = false;

    renderedCallback() {
        if (!this._started) {
            this._started = true;
            this.play();
        }
    }

    /** アニメーションを最初から再生する */
    @api
    play() {
        const target = Number(this.value) || 0;
        const dur = Math.max(1, Number(this.duration) || 1000);
        const steps = 30;
        const interval = dur / steps;
        let i = 0;
        this.current = 0;
        if (this._timer) {
            clearInterval(this._timer);
        }
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this._timer = setInterval(() => {
            i += 1;
            const t = i / steps;
            const eased = 1 - Math.pow(1 - t, 3);
            this.current = Math.round(target * eased);
            if (i >= steps) {
                this.current = target;
                clearInterval(this._timer);
            }
        }, interval);
    }

    disconnectedCallback() {
        if (this._timer) {
            clearInterval(this._timer);
        }
    }

    get display() {
        return `${this.prefix}${this.current.toLocaleString('ja-JP')}${this.suffix}`;
    }
}
