import { LightningElement, api } from 'lwc';

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' };

/**
 * uiLeaderboard — 汎用ランキング。
 * items 配列 ([{ name, value }]) を値の大きい順に並べ、順位・バー・値で表示する。
 * 行クリックで select イベント (detail.name) を発火する。
 */
export default class UiLeaderboard extends LightningElement {
    _items = [];

    /** [{ name, value }] の配列 */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    get rows() {
        const sorted = [...this._items].sort(
            (a, b) => (Number(b.value) || 0) - (Number(a.value) || 0)
        );
        const max = Math.max(1, ...sorted.map((s) => Number(s.value) || 0));
        return sorted.map((s, i) => {
            const rank = i + 1;
            return {
                key: i,
                rank,
                badge: MEDALS[rank] || String(rank),
                name: s.name,
                value: s.value,
                barStyle: `width: ${((Number(s.value) || 0) / max) * 100}%`,
                rowClass: rank <= 3 ? 'ui-lb__row ui-lb__row_top' : 'ui-lb__row'
            };
        });
    }

    handleSelect(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: { name: event.currentTarget.dataset.name }
            })
        );
    }
}
