import { LightningElement, api } from 'lwc';

/**
 * uiGrid — 汎用レスポンシブグリッド。
 * default スロットの子要素を auto-fill のグリッドで並べる。
 * min-width 未満になると自動で段組みが減り、スマホでも崩れない。
 */
export default class UiGrid extends LightningElement {
    /** 各セルの最小幅(px) */
    @api minWidth = 160;
    /** セル間の余白(px) */
    @api gap = 12;

    get gridStyle() {
        const min = Number(this.minWidth) || 160;
        const gap = Number(this.gap) || 12;
        return `grid-template-columns: repeat(auto-fill, minmax(${min}px, 1fr)); gap: ${gap}px;`;
    }
}
