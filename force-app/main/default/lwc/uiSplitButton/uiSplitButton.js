import { LightningElement, api, track } from 'lwc';

/**
 * uiSplitButton — 汎用分割ボタン。
 * 主ボタン（click イベント）と付随メニュー（items から生成、select イベント）を持つ。
 * 外側へフォーカスが外れるとメニューを閉じる。
 */
export default class UiSplitButton extends LightningElement {
    _items = [];

    /** 主ボタンのラベル */
    @api label;
    /** [{ label, value }] の配列 */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    @track open = false;

    handleMain() {
        this.dispatchEvent(new CustomEvent('click'));
    }

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
