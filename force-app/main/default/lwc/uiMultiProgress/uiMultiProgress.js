import { LightningElement, api } from 'lwc';

/**
 * uiMultiProgress — 汎用多段プログレス。
 * segments 配列 ([{ label, value, color }]) を 1 本のバーに積み上げて表示し、
 * 凡例を併記する。構成比つきの進捗表現に使う。
 */
export default class UiMultiProgress extends LightningElement {
    _segments = [];

    /** [{ label, value, color }] の配列 */
    @api
    get segments() {
        return this._segments;
    }
    set segments(value) {
        this._segments = Array.isArray(value) ? value : [];
    }

    get total() {
        return (
            this._segments.reduce((a, s) => a + (Number(s.value) || 0), 0) || 1
        );
    }

    get bars() {
        return this._segments.map((s, i) => ({
            key: i,
            style: `width: ${((Number(s.value) || 0) / this.total) * 100}%; background: ${s.color};`
        }));
    }

    get legend() {
        return this._segments.map((s, i) => ({
            key: i,
            label: s.label,
            value: Number(s.value) || 0,
            swatchStyle: `background: ${s.color}`
        }));
    }
}
