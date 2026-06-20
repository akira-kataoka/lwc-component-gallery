import { LightningElement, api } from 'lwc';

/**
 * uiFilterChips — 汎用フィルターチップ。
 * 適用中のフィルタ ([{ label, value }]) を×付きチップで並べ、「すべてクリア」を備える。
 * 個別削除で remove イベント (detail.value)、全消去で clear イベントを発火する。
 */
export default class UiFilterChips extends LightningElement {
    _filters = [];

    /** [{ label, value }] の配列 */
    @api
    get filters() {
        return this._filters;
    }
    set filters(value) {
        this._filters = Array.isArray(value) ? value : [];
    }

    get hasFilters() {
        return this._filters.length > 0;
    }

    get chips() {
        return this._filters.map((f, i) => ({
            key: i,
            label: f.label,
            value: f.value
        }));
    }

    handleRemove(event) {
        this.dispatchEvent(
            new CustomEvent('remove', {
                detail: { value: event.currentTarget.dataset.value }
            })
        );
    }

    handleClear() {
        this.dispatchEvent(new CustomEvent('clear'));
    }
}
