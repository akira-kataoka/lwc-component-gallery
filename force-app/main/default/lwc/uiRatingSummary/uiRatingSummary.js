import { LightningElement, api } from 'lwc';

/**
 * uiRatingSummary — 汎用評価サマリー。
 * 平均評価・件数・星分布（5★〜1★の件数）をまとめて表示する純粋な表示コンポーネント。
 */
export default class UiRatingSummary extends LightningElement {
    /** 平均評価（例: 4.3） */
    @api average = 0;
    /** 総件数 */
    @api count = 0;

    _distribution = [];

    /** 5★→1★ の件数配列（長さ 5） */
    @api
    get distribution() {
        return this._distribution;
    }
    set distribution(value) {
        this._distribution = Array.isArray(value) ? value : [];
    }

    get averageText() {
        return (Number(this.average) || 0).toFixed(1);
    }

    get stars() {
        const filled = Math.round(Number(this.average) || 0);
        return [1, 2, 3, 4, 5].map((n) => ({
            key: n,
            char: n <= filled ? '★' : '☆'
        }));
    }

    get rows() {
        const total = this._distribution.reduce((a, b) => a + (Number(b) || 0), 0) || 1;
        return this._distribution.map((c, i) => {
            const star = 5 - i;
            const value = Number(c) || 0;
            return {
                key: star,
                star,
                value,
                barStyle: `width: ${Math.round((value / total) * 100)}%`
            };
        });
    }
}
