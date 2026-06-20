import { LightningElement, api, track } from 'lwc';

/**
 * uiDropdownMenu — 汎用ドロップダウンメニュー。
 * トリガーボタンで items 配列 ([{ label, value }]) を開閉し、
 * 項目選択時に select イベント (detail.value) を発火する。
 * メニュー外へフォーカスが外れると自動で閉じる。
 */
export default class UiDropdownMenu extends LightningElement {
    _items = [];

    /** トリガーのラベル */
    @api label = 'メニュー';
    /** [{ label, value }] の配列 */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    @track open = false;

    handleToggle() {
        this.open = !this.open;
    }

    handleSelect(event) {
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
