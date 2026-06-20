import { LightningElement, api, track } from 'lwc';

/**
 * uiCollapsibleSection — 汎用折りたたみセクション。
 * タイトル行のクリックで本文 (default スロット) を開閉する単一セクション。
 * 開閉時に toggle イベント (detail.open) を発火する。
 */
export default class UiCollapsibleSection extends LightningElement {
    /** タイトル */
    @api title;
    /** 初期表示で開く */
    @api open = false;

    @track _opened = false;

    connectedCallback() {
        this._opened = this.open;
    }

    get isOpen() {
        return this._opened;
    }

    get caret() {
        return this._opened ? '▾' : '▸';
    }

    handleToggle() {
        this._opened = !this._opened;
        this.dispatchEvent(
            new CustomEvent('toggle', { detail: { open: this._opened } })
        );
    }
}
