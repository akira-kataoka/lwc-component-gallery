import { LightningElement, api } from 'lwc';

/**
 * uiPill — 汎用ピル（タグ）。
 * ラベルを表示し、removable=true のとき×ボタンで remove イベントを発火する。
 */
export default class UiPill extends LightningElement {
    /** 表示テキスト */
    @api label;
    /** true で削除ボタンを表示 */
    @api removable = false;

    handleRemove() {
        this.dispatchEvent(new CustomEvent('remove'));
    }
}
