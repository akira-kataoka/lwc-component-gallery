import { LightningElement, api } from 'lwc';

/**
 * uiToggle — 汎用トグルスイッチ。
 * checked の ON/OFF を切替え、change イベント (detail.checked) を発火する。
 */
export default class UiToggle extends LightningElement {
    /** ラベル */
    @api label;
    /** ON 状態 */
    @api checked = false;
    /** true で無効化 */
    @api disabled = false;

    get trackClass() {
        return this.checked
            ? 'ui-toggle__track ui-toggle__track_on'
            : 'ui-toggle__track';
    }

    handleClick() {
        if (this.disabled) {
            return;
        }
        this.checked = !this.checked;
        this.dispatchEvent(
            new CustomEvent('change', { detail: { checked: this.checked } })
        );
    }
}
