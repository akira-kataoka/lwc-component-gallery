import { LightningElement, api, track } from 'lwc';

const ICONS = {
    info: 'ℹ',
    success: '✓',
    warning: '!',
    error: '✕'
};

/**
 * uiBanner — 汎用バナー（横長の通知）。
 * variant に応じた色・アイコンでメッセージを横長に表示する。
 * closable=true で閉じるボタンを表示し、閉じると close イベントを発火する。
 * default スロットにアクション（ボタン等）を差し込める。
 */
export default class UiBanner extends LightningElement {
    /** info | success | warning | error */
    @api variant = 'info';
    /** メッセージ本文 */
    @api message;
    /** true で閉じるボタンを表示 */
    @api closable = false;

    @track closed = false;

    get isVisible() {
        return !this.closed;
    }

    get iconChar() {
        return ICONS[this.variant] || ICONS.info;
    }

    get bannerClass() {
        return `ui-banner ui-banner_${this.variant}`;
    }

    handleClose() {
        this.closed = true;
        this.dispatchEvent(new CustomEvent('close'));
    }
}
