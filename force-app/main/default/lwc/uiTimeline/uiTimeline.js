import { LightningElement, api } from 'lwc';

/**
 * uiTimeline — 汎用タイムライン。
 * items 配列 ([{ title, time, description }]) を縦並びで時系列表示する。
 */
export default class UiTimeline extends LightningElement {
    _items = [];

    /** [{ title, time, description }] の配列 */
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
            time: item.time,
            description: item.description,
            hasDescription: !!item.description
        }));
    }
}
