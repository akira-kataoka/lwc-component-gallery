import { LightningElement, api, track } from 'lwc';

/**
 * uiPopover — 汎用ポップオーバー。
 * トリガーボタンのクリックで、ヘッダ付きの吹き出し（default スロット）を
 * 開閉する。外側へフォーカスが外れると自動で閉じる。
 */
export default class UiPopover extends LightningElement {
    /** トリガーのラベル */
    @api triggerLabel = '詳細';
    /** ポップオーバーの見出し（任意） */
    @api header;

    @track open = false;

    handleToggle() {
        this.open = !this.open;
    }

    handleClose() {
        this.open = false;
    }

    handleFocusOut(event) {
        if (
            this.open &&
            (!event.relatedTarget ||
                !event.currentTarget.contains(event.relatedTarget))
        ) {
            this.open = false;
        }
    }
}
