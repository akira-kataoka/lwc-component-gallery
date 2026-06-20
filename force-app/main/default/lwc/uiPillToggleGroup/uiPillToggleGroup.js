import { LightningElement, api, track } from 'lwc';

/**
 * uiPillToggleGroup — 汎用ピル複数選択。
 * options 配列 ([{ label, value }]) からピル状の複数選択 UI を生成し、
 * 変更時に change イベント (detail.values) を発火する。
 */
export default class UiPillToggleGroup extends LightningElement {
    _options = [];
    @track _values = [];

    /** [{ label, value }] の配列 */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = Array.isArray(value) ? value : [];
    }

    /** 選択中の value 配列 */
    @api
    get values() {
        return this._values;
    }
    set values(value) {
        this._values = Array.isArray(value) ? [...value] : [];
    }

    get computedPills() {
        return this._options.map((o) => ({
            label: o.label,
            value: o.value,
            cssClass: this._values.includes(o.value)
                ? 'ui-pilltoggle ui-pilltoggle_on'
                : 'ui-pilltoggle'
        }));
    }

    handleToggle(event) {
        const value = event.currentTarget.dataset.value;
        this._values = this._values.includes(value)
            ? this._values.filter((v) => v !== value)
            : [...this._values, value];
        this.dispatchEvent(
            new CustomEvent('change', { detail: { values: [...this._values] } })
        );
    }
}
