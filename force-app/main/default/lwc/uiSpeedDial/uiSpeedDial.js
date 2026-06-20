import { LightningElement, api, track } from 'lwc';

/**
 * uiSpeedDial — 汎用スピードダイヤル。
 * メイン FAB を押すと actions（[{ label, icon, value }]）が上方向に展開する。
 * アクション選択で select イベント (detail.value) を発火し、外側クリックで閉じる。
 */
export default class UiSpeedDial extends LightningElement {
    _actions = [];

    /** [{ label, icon, value }] の配列 */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = Array.isArray(value) ? value : [];
    }

    /** メイン FAB のアイコン */
    @api icon = '＋';

    @track open = false;

    get fabIcon() {
        return this.open ? '✕' : this.icon;
    }

    handleToggle() {
        this.open = !this.open;
    }

    handleAction(event) {
        const value = event.currentTarget.dataset.value;
        this.open = false;
        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));
    }

    handleFocusOut(event) {
        if (
            this.open &&
            (!event.relatedTarget ||
                !event.currentTarget.contains(event.relatedTarget))
        ) {
            this.open = false;
        }
    }
}
