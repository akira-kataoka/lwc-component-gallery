import { LightningElement, api } from 'lwc';

/**
 * uiColorSwatch — 汎用カラースウォッチ。
 * colors 配列（HEX 文字列 or [{ value, label }]）から色見本を並べ、
 * 選択時に change イベント (detail.value) を発火する。
 */
export default class UiColorSwatch extends LightningElement {
    _colors = [];

    /** 色の配列（'#0176d3' または { value, label }） */
    @api
    get colors() {
        return this._colors;
    }
    set colors(value) {
        this._colors = Array.isArray(value) ? value : [];
    }

    /** 選択中の色 */
    @api value;

    get swatches() {
        return this._colors.map((c) => {
            const val = typeof c === 'string' ? c : c.value;
            const label = typeof c === 'string' ? c : c.label || c.value;
            return {
                value: val,
                label,
                style: `background:${val}`,
                cssClass:
                    String(val) === String(this.value)
                        ? 'ui-swatch ui-swatch_selected'
                        : 'ui-swatch'
            };
        });
    }

    handleSelect(event) {
        this.value = event.currentTarget.dataset.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
