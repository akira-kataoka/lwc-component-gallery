import { LightningElement, api, track } from 'lwc';

const ICONS = {
    info: 'ℹ',
    success: '✓',
    warning: '!',
    error: '✕'
};

/**
 * uiAlert — 汎用インラインアラート。
 * variant に応じた色とアイコンでメッセージ (default スロット) を表示する。
 * closable=true のとき×ボタンで閉じ、close イベントを発火する。
 */
export default class UiAlert extends LightningElement {
    /** バリアント: info | success | warning | error */
    @api variant = 'info';
    /** 見出し（任意） */
    @api title;
    /** true で閉じるボタンを表示 */
    @api closable = false;

    @track closed = false;

    get isVisible() {
        return !this.closed;
    }

    get alertClass() {
        const variant = ICONS[this.variant] ? this.variant : 'info';
        return `ui-alert ui-alert_${variant}`;
    }

    get iconChar() {
        return ICONS[this.variant] || ICONS.info;
    }

    handleClose() {
        this.closed = true;
        this.dispatchEvent(new CustomEvent('close'));
    }
}
