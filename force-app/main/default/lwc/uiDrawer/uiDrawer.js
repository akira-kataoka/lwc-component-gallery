import { LightningElement, api } from 'lwc';

/**
 * uiDrawer — 汎用ドロワー（スライドインパネル）。
 * open で表示制御し、画面端からスライドインする。背景・×・Esc で close を発火。
 * 本文は default スロット、フッタは footer スロットに置く。
 */
export default class UiDrawer extends LightningElement {
    /** ヘッダタイトル */
    @api header;
    /** true で表示 */
    @api open = false;
    /** 表示する側: right | left */
    @api side = 'right';

    get panelClass() {
        const side = this.side === 'left' ? 'left' : 'right';
        return `ui-drawer__panel ui-drawer__panel_${side}`;
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleKeydown(event) {
        if (event.key === 'Escape') {
            this.handleClose();
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
