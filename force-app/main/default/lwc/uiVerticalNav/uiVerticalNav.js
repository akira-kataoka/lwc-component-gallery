import { LightningElement, api } from 'lwc';

/**
 * uiVerticalNav — 汎用縦型ナビゲーション。
 * items 配列 ([{ label, value, icon }]) を縦並びのボタンで表示し、
 * active と一致する項目を強調する。クリック時に select イベント
 * (detail.value) を発火する。
 */
export default class UiVerticalNav extends LightningElement {
    _items = [];

    /** [{ label, value, icon }] の配列 */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    /** 選択中の value */
    @api active;

    get computedItems() {
        return this._items.map((item, index) => {
            const isActive = item.value === this.active;
            return {
                key: index,
                label: item.label,
                value: item.value,
                icon: item.icon,
                hasIcon: !!item.icon,
                itemClass: `ui-vnav__item${
                    isActive ? ' ui-vnav__item_active' : ''
                }`
            };
        });
    }

    handleSelect(event) {
        const value = event.currentTarget.dataset.value;
        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));
    }
}
