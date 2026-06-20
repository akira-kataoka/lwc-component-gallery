import { LightningElement, api, track } from 'lwc';

/**
 * uiLookupField — ルックアップ検索フィールド。
 * 入力で options を絞り込み、アイコン＋サブラベル付きの候補から選択する。
 * 選択時に change イベント (detail.value)、クリアで change(null) を発火する。
 * options は親で Apex 検索結果などを渡す（[{ label, sublabel, icon, value }]）。
 */
export default class UiLookupField extends LightningElement {
    _options = [];

    /** [{ label, sublabel, icon, value }] の配列 */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = Array.isArray(value) ? value : [];
    }

    /** ラベル */
    @api label;
    /** プレースホルダ */
    @api placeholder = '検索…';

    @track query = '';
    @track open = false;
    @track selected = null;

    get filtered() {
        const q = (this.query || '').toLowerCase();
        return this._options.filter((o) =>
            (o.label || '').toLowerCase().includes(q)
        );
    }

    get hasSelection() {
        return !!this.selected;
    }

    get isEmpty() {
        return this.filtered.length === 0;
    }

    handleInput(event) {
        this.query = event.target.value;
        this.open = true;
    }

    handleFocus() {
        this.open = true;
    }

    handleSelect(event) {
        const v = event.currentTarget.dataset.value;
        this.selected = this._options.find((o) => String(o.value) === v) || null;
        this.open = false;
        this.query = '';
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: v } })
        );
    }

    handleClear() {
        this.selected = null;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: null } }));
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
