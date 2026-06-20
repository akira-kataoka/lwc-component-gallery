import { LightningElement, api } from 'lwc';

/**
 * uiButtonGroup — 汎用ボタングループ（セグメンテッドコントロール）。
 * buttons 配列 ([{ label, value }]) を横並びで表示し、選択時に
 * select イベント (detail.value) を発火する。
 */
export default class UiButtonGroup extends LightningElement {
    _buttons = [];

    /** [{ label, value }] の配列 */
    @api
    get buttons() {
        return this._buttons;
    }
    set buttons(value) {
        this._buttons = Array.isArray(value) ? value : [];
    }

    /** 選択中の value */
    @api active;

    get computedButtons() {
        return this._buttons.map((b) => ({
            label: b.label,
            value: b.value,
            cssClass:
                String(b.value) === String(this.active)
                    ? 'ui-btngroup__item ui-btngroup__item_active'
                    : 'ui-btngroup__item'
        }));
    }

    handleClick(event) {
        this.active = event.currentTarget.dataset.value;
        this.dispatchEvent(
            new CustomEvent('select', { detail: { value: this.active } })
        );
    }
}
