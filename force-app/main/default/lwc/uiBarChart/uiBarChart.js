import { LightningElement, api } from 'lwc';

/**
 * uiBarChart — 汎用横棒グラフ。
 * data 配列 ([{ label, value }]) を、最大値を基準にした横棒で表示する。
 */
export default class UiBarChart extends LightningElement {
    _data = [];

    /** [{ label, value }] の配列 */
    @api
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = Array.isArray(value) ? value : [];
    }

    /** バーの色 */
    @api color = '#0176d3';

    get computedBars() {
        const values = this._data.map((d) => Number(d.value) || 0);
        const max = Math.max(1, ...values);
        return this._data.map((d, i) => {
            const value = Number(d.value) || 0;
            return {
                key: i,
                label: d.label,
                value,
                barStyle: `width: ${Math.round((value / max) * 100)}%; background: ${this.color};`
            };
        });
    }
}
