import { LightningElement, api } from 'lwc';

/**
 * uiRelatedList — 関連リスト。
 * items 配列 ([{ title, subtitle, meta }]) を Salesforce の関連リスト風カードで表示し、
 * 件数バッジと「新規」ボタンを持つ。行クリックで select、新規で new イベントを発火する。
 * 親で Apex 等から取得したレコード配列を渡して使う。
 */
export default class UiRelatedList extends LightningElement {
    _items = [];

    /** [{ title, subtitle, meta }] の配列 */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    /** ヘッダタイトル */
    @api title;
    /** ヘッダアイコン（lightning-icon 名） */
    @api iconName = 'standard:record';

    get count() {
        return this._items.length;
    }

    get rows() {
        return this._items.map((it, i) => ({
            key: i,
            index: i,
            title: it.title,
            subtitle: it.subtitle,
            meta: it.meta,
            hasSubtitle: !!it.subtitle,
            hasMeta: !!it.meta
        }));
    }

    handleSelect(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: { index: Number(event.currentTarget.dataset.index) }
            })
        );
    }

    handleNew() {
        this.dispatchEvent(new CustomEvent('new'));
    }
}
