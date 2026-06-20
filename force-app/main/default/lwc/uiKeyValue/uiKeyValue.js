import { LightningElement, api } from 'lwc';

/**
 * uiKeyValue — 汎用定義リスト（キー・バリュー）。
 * items 配列 ([{ label, value }]) をラベルと値のペアで整列表示する。
 */
export default class UiKeyValue extends LightningElement {
    _items = [];

    /** [{ label, value }] の配列 */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    get rows() {
        return this._items.map((it, i) => ({
            key: i,
            label: it.label,
            value: it.value
        }));
    }
}
