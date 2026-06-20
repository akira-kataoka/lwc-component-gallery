import { LightningElement, api } from 'lwc';

/**
 * uiTagCloud — 汎用タグクラウド。
 * tags 配列 ([{ label, weight }]) を重みに応じた文字サイズ・濃さで表示する。
 * タグクリックで select イベント (detail.label) を発火する。
 */
export default class UiTagCloud extends LightningElement {
    _tags = [];

    /** [{ label, weight }] の配列 */
    @api
    get tags() {
        return this._tags;
    }
    set tags(value) {
        this._tags = Array.isArray(value) ? value : [];
    }

    get computedTags() {
        const weights = this._tags.map((t) => Number(t.weight) || 1);
        const max = Math.max(1, ...weights);
        const min = Math.min(...weights, max);
        const range = max - min || 1;
        return this._tags.map((t, i) => {
            const w = Number(t.weight) || 1;
            const ratio = (w - min) / range;
            const size = (0.75 + ratio * 0.95).toFixed(2);
            const opacity = (0.55 + ratio * 0.45).toFixed(2);
            return {
                key: i,
                label: t.label,
                style: `font-size: ${size}rem; opacity: ${opacity};`
            };
        });
    }

    handleClick(event) {
        const label = event.currentTarget.dataset.label;
        this.dispatchEvent(new CustomEvent('select', { detail: { label } }));
    }
}
