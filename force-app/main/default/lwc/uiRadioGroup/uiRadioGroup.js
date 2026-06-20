import { LightningElement, api } from 'lwc';

let GID = 0;

/**
 * uiRadioGroup — 汎用ラジオボタングループ。
 * options 配列 ([{ label, value }]) から単一選択の UI を生成し、
 * 選択時に change イベント (detail.value) を発火する。
 */
export default class UiRadioGroup extends LightningElement {
    _options = [];
    groupName = `ui-radio-${GID++}`;

    /** グループの見出し */
    @api label;
    /** 選択値 */
    @api value;
    /** ラジオ name 属性（未指定なら自動採番） */
    @api name;

    /** [{ label, value }] の配列 */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = Array.isArray(value) ? value : [];
    }

    get computedName() {
        return this.name || this.groupName;
    }

    get computedOptions() {
        return this._options.map((o) => ({
            label: o.label,
            value: o.value,
            checked: String(o.value) === String(this.value)
        }));
    }

    handleChange(event) {
        this.value = event.target.value;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }
}
