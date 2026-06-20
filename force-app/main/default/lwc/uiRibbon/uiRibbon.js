import { LightningElement, api } from 'lwc';

const COLORS = ['brand', 'success', 'warning', 'error'];

/**
 * uiRibbon — 汎用コーナーリボン。
 * default スロットの要素（カード等）の右上隅に斜めのリボンラベルを重ねる。
 */
export default class UiRibbon extends LightningElement {
    /** リボンに表示するテキスト */
    @api label;
    /** 色: brand | success | warning | error */
    @api color = 'brand';

    get ribbonClass() {
        const color = COLORS.includes(this.color) ? this.color : 'brand';
        return `ui-ribbon ui-ribbon_${color}`;
    }
}
