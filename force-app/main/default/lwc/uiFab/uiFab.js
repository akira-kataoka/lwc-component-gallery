import { LightningElement, api } from 'lwc';

const VARIANTS = ['brand', 'neutral', 'success'];

/**
 * uiFab — 汎用フローティングアクションボタン。
 * アイコンの丸ボタン。label を指定すると横長の拡張 FAB になる。click を発火する。
 */
export default class UiFab extends LightningElement {
    /** アイコン文字（絵文字可） */
    @api icon = '＋';
    /** ラベル（指定で拡張 FAB） */
    @api label;
    /** バリアント: brand | neutral | success */
    @api variant = 'brand';

    get hasLabel() {
        return !!this.label;
    }

    get fabClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        const ext = this.hasLabel ? ' ui-fab_extended' : '';
        return `ui-fab ui-fab_${variant}${ext}`;
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('click'));
    }
}
