import { LightningElement, api } from 'lwc';

/**
 * uiDonutChart — 汎用ドーナツチャート。
 * segments 配列 ([{ label, value, color }]) を conic-gradient のドーナツと
 * 凡例で表示する純粋な表示コンポーネント。
 */
export default class UiDonutChart extends LightningElement {
    _segments = [];

    /** [{ label, value, color }] の配列 */
    @api
    get segments() {
        return this._segments;
    }
    set segments(value) {
        this._segments = Array.isArray(value) ? value : [];
    }

    /** 中央に表示する見出し（任意） */
    @api centerLabel;

    get total() {
        return (
            this._segments.reduce((a, s) => a + (Number(s.value) || 0), 0) || 1
        );
    }

    get backgroundStyle() {
        let acc = 0;
        const parts = this._segments.map((s) => {
            const start = (acc / this.total) * 360;
            acc += Number(s.value) || 0;
            const end = (acc / this.total) * 360;
            return `${s.color} ${start.toFixed(1)}deg ${end.toFixed(1)}deg`;
        });
        return `background: conic-gradient(${parts.join(', ')});`;
    }

    get legend() {
        return this._segments.map((s, i) => ({
            key: i,
            label: s.label,
            pct: Math.round(((Number(s.value) || 0) / this.total) * 100),
            swatchStyle: `background: ${s.color}`
        }));
    }
}
