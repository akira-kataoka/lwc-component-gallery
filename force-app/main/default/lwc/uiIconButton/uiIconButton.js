import { LightningElement, api } from 'lwc';

const VARIANTS = ['neutral', 'brand', 'ghost'];

/**
 * uiIconButton — 汎用アイコンボタン。
 * アイコン（絵文字や文字）のみの正方形ボタン。click イベントを発火する。
 */
export default class UiIconButton extends LightningElement {
    /** アイコン文字（絵文字可） */
    @api icon;
    /** バリアント: neutral | brand | ghost */
    @api variant = 'neutral';
    /** ツールチップ／アクセシブル名 */
    @api title;
    /** true で無効化 */
    @api disabled = false;

    get buttonClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'neutral';
        return `ui-iconbtn ui-iconbtn_${variant}`;
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('click'));
    }
}
