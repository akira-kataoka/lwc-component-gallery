import { LightningElement, api } from 'lwc';

/**
 * uiTileSelect — タイル選択。
 * options 配列 ([{ label, icon, value }]) をアイコン付きタイルで並べ、
 * 単一選択する。選択時に change イベント (detail.value) を発火する。
 */
export default class UiTileSelect extends LightningElement {
    _options = [];

    /** [{ label, icon, value }] の配列 */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = Array.isArray(value) ? value : [];
    }

    /** 選択値 */
    @api value;

    get tiles() {
        return this._options.map((o) => ({
            label: o.label,
            icon: o.icon,
            value: o.value,
            cssClass:
                String(o.value) === String(this.value)
                    ? 'ui-tile ui-tile_selected'
                    : 'ui-tile'
        }));
    }

    handleSelect(event) {
        this.value = event.currentTarget.dataset.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
