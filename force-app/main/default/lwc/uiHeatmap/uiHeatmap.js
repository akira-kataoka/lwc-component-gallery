import { LightningElement, api } from 'lwc';

/**
 * uiHeatmap — 汎用ヒートマップ。
 * values（数値配列）を columns 列のマス目に並べ、値の大きさで濃淡を付ける。
 * GitHub の貢献グラフ風の表示。マスクリックで cellselect イベントを発火する。
 */
export default class UiHeatmap extends LightningElement {
    _values = [];

    /** 数値の配列（マス1つにつき1値） */
    @api
    get values() {
        return this._values;
    }
    set values(value) {
        this._values = Array.isArray(value) ? value : [];
    }

    /** 列数 */
    @api columns = 14;

    get gridStyle() {
        const cols = Number(this.columns) || 14;
        return `grid-template-columns: repeat(${cols}, 1fr);`;
    }

    get cells() {
        const vals = this._values.map((v) => Number(v) || 0);
        const max = Math.max(1, ...vals);
        return vals.map((v, i) => {
            let level = 0;
            if (v > 0) {
                level = Math.min(4, Math.ceil((v / max) * 4));
            }
            return {
                key: i,
                index: i,
                title: String(v),
                cssClass: `ui-heatmap__cell ui-heatmap__cell_l${level}`
            };
        });
    }

    handleCell(event) {
        const i = Number(event.currentTarget.dataset.index);
        this.dispatchEvent(
            new CustomEvent('cellselect', {
                detail: { index: i, value: this._values[i] }
            })
        );
    }
}
