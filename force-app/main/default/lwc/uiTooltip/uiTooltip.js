import { LightningElement, api } from 'lwc';

const POSITIONS = ['top', 'bottom', 'left', 'right'];

/**
 * uiTooltip — 汎用ツールチップ。
 * default スロットの要素にホバー／フォーカスすると content を吹き出し表示する。
 */
export default class UiTooltip extends LightningElement {
    /** 吹き出しに表示するテキスト */
    @api content;
    /** 表示位置: top | bottom | left | right */
    @api position = 'top';

    get rootClass() {
        const pos = POSITIONS.includes(this.position) ? this.position : 'top';
        return `ui-tooltip ui-tooltip_${pos}`;
    }
}
