import { LightningElement, api } from 'lwc';

const SIZES = ['small', 'medium', 'large'];

/**
 * uiModal — 汎用モーダルダイアログ。
 * open プロパティで表示制御し、本文 (default スロット) と
 * フッタ (footer スロット) を持つ。背景・×ボタン・Esc で close イベントを発火。
 */
export default class UiModal extends LightningElement {
    /** ヘッダタイトル */
    @api header;
    /** true で表示 */
    @api open = false;
    /** サイズ: small | medium | large */
    @api size = 'medium';

    get modalClass() {
        const size = SIZES.includes(this.size) ? this.size : 'medium';
        return `ui-modal ui-modal_${size}`;
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleBackdropKeydown(event) {
        if (event.key === 'Escape') {
            this.handleClose();
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
