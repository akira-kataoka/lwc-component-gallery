import { LightningElement, api, track } from 'lwc';

/**
 * uiVerticalTabs — 汎用縦タブ。
 * tabs 配列 ([{ label, value, content }]) を左に縦並びのタブ、右に本文で表示する。
 * 切替時に select イベント (detail.value) を発火する。
 */
export default class UiVerticalTabs extends LightningElement {
    @track _tabs = [];
    @track activeValue;

    /** [{ label, value, content }] の配列 */
    @api
    get tabs() {
        return this._tabs;
    }
    set tabs(value) {
        this._tabs = Array.isArray(value) ? value : [];
        if (this._tabs.length && !this._hasActive()) {
            this.activeValue = this._tabs[0].value;
        }
    }

    _hasActive() {
        return this._tabs.some((t) => t.value === this.activeValue);
    }

    get computedTabs() {
        return this._tabs.map((t) => ({
            label: t.label,
            value: t.value,
            cssClass:
                t.value === this.activeValue
                    ? 'ui-vtabs__tab ui-vtabs__tab_active'
                    : 'ui-vtabs__tab'
        }));
    }

    get activeContent() {
        const tab = this._tabs.find((t) => t.value === this.activeValue);
        return tab ? tab.content : '';
    }

    handleSelect(event) {
        this.activeValue = event.currentTarget.dataset.value;
        this.dispatchEvent(
            new CustomEvent('select', { detail: { value: this.activeValue } })
        );
    }
}
