import { LightningElement, api, track } from 'lwc';

/**
 * uiTabs — 汎用タブ。
 * tabs 配列 ([{ label, value, content }]) を受け取り、
 * ヘッダ切替で本文を表示し、select イベントで選択値を通知する。
 */
export default class UiTabs extends LightningElement {
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
            ...t,
            cssClass:
                t.value === this.activeValue
                    ? 'ui-tab ui-tab_active'
                    : 'ui-tab',
            selected: t.value === this.activeValue
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
