import { LightningElement, api } from 'lwc';

/**
 * uiBreadcrumb — 汎用パンくずリスト。
 * items 配列 ([{ label, value }]) を「/」区切りで表示する。
 * 最後の項目以外はリンクとして navigate イベント (detail.value) を発火する。
 */
export default class UiBreadcrumb extends LightningElement {
    _items = [];

    /** [{ label, value }] の配列 */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    get computedItems() {
        const last = this._items.length - 1;
        return this._items.map((item, index) => ({
            label: item.label,
            value: item.value !== undefined ? item.value : item.label,
            clickable: index !== last,
            showSep: index !== last
        }));
    }

    handleClick(event) {
        event.preventDefault();
        const value = event.currentTarget.dataset.value;
        this.dispatchEvent(
            new CustomEvent('navigate', { detail: { value } })
        );
    }
}
