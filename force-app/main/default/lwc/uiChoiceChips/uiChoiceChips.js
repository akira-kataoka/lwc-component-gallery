import { LightningElement, api } from 'lwc';

/**
 * uiChoiceChips — 汎用選択チップ。
 * options 配列 ([{ label, value }]) からチップ状の単一選択 UI を生成し、
 * 選択時に change イベント (detail.value) を発火する。
 */
export default class UiChoiceChips extends LightningElement {
    _options = [];

    /** [{ label, value }] の配列 */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = Array.isArray(value) ? value : [];
    }

    /** 選択値 */
    @api value;

    get computedChips() {
        return this._options.map((o) => ({
            label: o.label,
            value: o.value,
            cssClass:
                String(o.value) === String(this.value)
                    ? 'ui-chip ui-chip_selected'
                    : 'ui-chip'
        }));
    }

    handleSelect(event) {
        this.value = event.currentTarget.dataset.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
