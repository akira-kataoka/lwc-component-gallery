import { LightningElement, api } from 'lwc';

/**
 * uiList — 汎用リスト。
 * items 配列 ([{ title, meta, icon }]) をクリック可能な行として表示し、
 * 行クリック時に select イベント (detail.value) を発火する。
 */
export default class UiList extends LightningElement {
    _items = [];

    /** [{ title, meta, icon }] の配列 */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    get computedItems() {
        return this._items.map((item, index) => ({
            key: index,
            title: item.title,
            meta: item.meta,
            icon: item.icon,
            hasIcon: !!item.icon,
            hasMeta: !!item.meta,
            value: item.title !== undefined ? item.title : index
        }));
    }

    handleSelect(event) {
        const value = event.currentTarget.dataset.value;
        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));
    }
}
