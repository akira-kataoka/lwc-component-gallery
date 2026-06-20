import { LightningElement, api, track } from 'lwc';

const ICONS = {
    info: 'ℹ',
    success: '✓',
    warning: '!',
    error: '✕'
};

/**
 * uiToast — 汎用トースト通知。
 * show(message, variant) で表示し、duration 経過後に自動で閉じる。
 * ×ボタンまたは自動クローズ時に close イベントを発火する。
 */
export default class UiToast extends LightningElement {
    /** 既定バリアント: info | success | warning | error */
    @api variant = 'info';
    /** 自動クローズまでの ms（0 で自動クローズしない） */
    @api duration = 3000;

    @track _message = '';
    @track _variant = 'info';
    @track _visible = false;
    _timer;

    /** トーストを表示する */
    @api
    show(message, variant) {
        this._message = message;
        this._variant = ICONS[variant] ? variant : this.variant;
        this._visible = true;
        if (this._timer) {
            clearTimeout(this._timer);
        }
        if (this.duration > 0) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            this._timer = setTimeout(() => this.close(), this.duration);
        }
    }

    /** トーストを閉じる */
    @api
    close() {
        if (this._timer) {
            clearTimeout(this._timer);
        }
        this._visible = false;
        this.dispatchEvent(new CustomEvent('close'));
    }

    get isVisible() {
        return this._visible;
    }

    get message() {
        return this._message;
    }

    get toastClass() {
        return `ui-toast ui-toast_${this._variant}`;
    }

    get iconChar() {
        return ICONS[this._variant] || ICONS.info;
    }
}
