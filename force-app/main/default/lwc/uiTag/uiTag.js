import { LightningElement, api } from 'lwc';

const COLORS = ['neutral', 'blue', 'green', 'red', 'orange', 'purple'];

/**
 * uiTag — 汎用タグ（色ラベル）。
 * color に応じた淡い背景色でラベルを表示する純粋な表示コンポーネント。
 */
export default class UiTag extends LightningElement {
    /** 表示テキスト */
    @api label;
    /** 色: neutral | blue | green | red | orange | purple */
    @api color = 'neutral';

    get tagClass() {
        const color = COLORS.includes(this.color) ? this.color : 'neutral';
        return `ui-tag ui-tag_${color}`;
    }
}
