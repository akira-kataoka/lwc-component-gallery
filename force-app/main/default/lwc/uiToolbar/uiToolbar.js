import { LightningElement, api } from 'lwc';

/**
 * uiToolbar — 汎用ツールバー。
 * 左にタイトル、右にアクション（default スロット）を配置する横長のバー。
 */
export default class UiToolbar extends LightningElement {
    /** 左側のタイトル */
    @api title;
}
