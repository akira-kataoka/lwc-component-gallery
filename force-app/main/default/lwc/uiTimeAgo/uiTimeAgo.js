import { LightningElement, api } from 'lwc';

/**
 * uiTimeAgo — 汎用相対時刻表示。
 * value（ISO 文字列 or ミリ秒）と現在時刻の差を「3分前」「2時間前」などに整形する。
 * 7 日以上前は日付表示にフォールバックする。
 */
export default class UiTimeAgo extends LightningElement {
    /** 日時（ISO 文字列または ミリ秒） */
    @api value;

    get text() {
        if (this.value === undefined || this.value === null || this.value === '') {
            return '';
        }
        const t = new Date(this.value).getTime();
        if (Number.isNaN(t)) {
            return String(this.value);
        }
        const diff = Date.now() - t;
        const sec = Math.floor(diff / 1000);
        if (sec < 0) {
            return 'まもなく';
        }
        if (sec < 60) {
            return 'たった今';
        }
        const min = Math.floor(sec / 60);
        if (min < 60) {
            return `${min}分前`;
        }
        const hr = Math.floor(min / 60);
        if (hr < 24) {
            return `${hr}時間前`;
        }
        const day = Math.floor(hr / 24);
        if (day < 7) {
            return `${day}日前`;
        }
        const d = new Date(t);
        const pad = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
    }
}
