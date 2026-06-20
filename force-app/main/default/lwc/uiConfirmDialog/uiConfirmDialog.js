import { LightningElement, api } from 'lwc';

/**
 * uiConfirmDialog — 汎用確認ダイアログ。
 * open で表示制御し、確定／取消ボタンを持つ小型モーダル。
 * 確定で confirm、取消・背景・Esc で cancel イベントを発火する。
 */
export default class UiConfirmDialog extends LightningElement {
    /** ヘッダ */
    @api header = '確認';
    /** メッセージ本文 */
    @api message;
    /** true で表示 */
    @api open = false;
    /** 確定ボタンの種別: brand | destructive */
    @api variant = 'brand';
    /** 確定ボタンのラベル */
    @api confirmLabel = 'OK';
    /** 取消ボタンのラベル */
    @api cancelLabel = 'キャンセル';

    get confirmClass() {
        const v = this.variant === 'destructive' ? 'destructive' : 'brand';
        return `ui-confirm__btn ui-confirm__btn_${v}`;
    }

    handleConfirm() {
        this.dispatchEvent(new CustomEvent('confirm'));
    }

    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }

    handleKeydown(event) {
        if (event.key === 'Escape') {
            this.handleCancel();
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
