import { LightningElement, api, track } from 'lwc';

/**
 * uiSnackbar — 汎用スナックバー。
 * 画面下部に短いメッセージとアクションを表示する。show(message, actionLabel) で表示し、
 * duration 経過で自動的に閉じる。アクション押下で action、閉じる/自動クローズで close を発火。
 */
export default class UiSnackbar extends LightningElement {
    /** 自動クローズまでの ms（0 で無効） */
    @api duration = 4000;

    @track _message = '';
    @track _actionLabel = '';
    @track _visible = false;
    _timer;

    /** スナックバーを表示する */
    @api
    show(message, actionLabel) {
        this._message = message;
        this._actionLabel = actionLabel || '';
        this._visible = true;
        if (this._timer) {
            clearTimeout(this._timer);
        }
        if (this.duration > 0) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            this._timer = setTimeout(() => this.close(), this.duration);
        }
    }

    /** 閉じる */
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
    get hasAction() {
        return !!this._actionLabel;
    }
    get actionLabel() {
        return this._actionLabel;
    }

    handleAction() {
        this.dispatchEvent(new CustomEvent('action'));
        this.close();
    }
}
