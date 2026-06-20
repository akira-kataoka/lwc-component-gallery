import { LightningElement, api } from 'lwc';

/**
 * uiSelect — 汎用セレクト（ドロップダウン）。
 * options 配列 ([{ label, value }]) を表示し、選択時に change イベント
 * (detail.value) を発火する。
 */
export default class UiSelect extends LightningElement {
    _options = [];

    /** [{ label, value }] の配列 */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = Array.isArray(value) ? value : [];
    }

    /** ラベル */
    @api label;
    /** 選択値 */
    @api value = '';
    /** 未選択時のプレースホルダ */
    @api placeholder = '選択してください';
    /** true で無効化 */
    @api disabled = false;

    get computedOptions() {
        return this._options.map((o) => ({
            ...o,
            selected: String(o.value) === String(this.value)
        }));
    }

    get placeholderSelected() {
        return !this.value;
    }

    handleChange(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
