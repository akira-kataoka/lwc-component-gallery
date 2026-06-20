import { LightningElement, api } from 'lwc';

/**
 * uiSparkline — 汎用スパークライン。
 * values 配列の数値を小さな折れ線グラフ（SVG）で表示する純粋な表示コンポーネント。
 */
export default class UiSparkline extends LightningElement {
    _values = [];

    /** 数値の配列 */
    @api
    get values() {
        return this._values;
    }
    set values(value) {
        this._values = Array.isArray(value) ? value : [];
    }

    /** 線の色 */
    @api color = '#0176d3';
    /** 幅(px) */
    @api width = 120;
    /** 高さ(px) */
    @api height = 36;

    get coords() {
        const vals = this._values.map(Number).filter((v) => !Number.isNaN(v));
        if (!vals.length) {
            return [];
        }
        const max = Math.max(...vals);
        const min = Math.min(...vals);
        const range = max - min || 1;
        const w = Number(this.width) || 120;
        const h = Number(this.height) || 36;
        const pad = 3;
        const denom = Math.max(1, vals.length - 1);
        const step = (w - pad * 2) / denom;
        return vals.map((v, i) => ({
            x: Number((pad + i * step).toFixed(1)),
            y: Number((pad + (h - pad * 2) * (1 - (v - min) / range)).toFixed(1))
        }));
    }

    get points() {
        return this.coords.map((c) => `${c.x},${c.y}`).join(' ');
    }

    get last() {
        const c = this.coords;
        return c.length ? c[c.length - 1] : { x: 0, y: 0 };
    }

    get lastX() {
        return this.last.x;
    }

    get lastY() {
        return this.last.y;
    }

    get viewBox() {
        return `0 0 ${this.width} ${this.height}`;
    }
}
