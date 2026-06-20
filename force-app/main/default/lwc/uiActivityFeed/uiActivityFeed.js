import { LightningElement, api } from 'lwc';

/**
 * uiActivityFeed — 汎用アクティビティフィード。
 * items 配列 ([{ icon, text, time }]) を時系列の活動ログとして表示する。
 */
export default class UiActivityFeed extends LightningElement {
    _items = [];

    /** [{ icon, text, time }] の配列 */
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
            icon: it.icon || '•',
            text: it.text,
            time: it.time
        }));
    }
}
