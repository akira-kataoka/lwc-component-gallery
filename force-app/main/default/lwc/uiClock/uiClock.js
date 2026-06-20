import { LightningElement, api, track } from 'lwc';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

/**
 * uiClock — 汎用デジタル時計。
 * 現在時刻を 1 秒ごとに更新して表示する。hide-date / hide-seconds で表示を抑制できる。
 */
export default class UiClock extends LightningElement {
    /** true で日付を非表示 */
    @api hideDate = false;
    /** true で秒を非表示 */
    @api hideSeconds = false;

    @track now = new Date();
    _timer;

    connectedCallback() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this._timer = setInterval(() => {
            this.now = new Date();
        }, 1000);
    }

    disconnectedCallback() {
        if (this._timer) {
            clearInterval(this._timer);
        }
    }

    get showDate() {
        return !this.hideDate;
    }

    pad(n) {
        return String(n).padStart(2, '0');
    }

    get timeText() {
        const d = this.now;
        const base = `${this.pad(d.getHours())}:${this.pad(d.getMinutes())}`;
        return this.hideSeconds ? base : `${base}:${this.pad(d.getSeconds())}`;
    }

    get dateText() {
        const d = this.now;
        return `${d.getFullYear()}/${this.pad(d.getMonth() + 1)}/${this.pad(d.getDate())} (${WEEKDAYS[d.getDay()]})`;
    }
}
