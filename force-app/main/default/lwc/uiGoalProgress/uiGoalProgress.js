import { LightningElement, api } from 'lwc';

/**
 * uiGoalProgress — 汎用目標プログレス。
 * current / target の達成度をバーと割合で表示するダッシュボード向け部品。
 */
export default class UiGoalProgress extends LightningElement {
    /** ラベル */
    @api label;
    /** 現在値 */
    @api current = 0;
    /** 目標値 */
    @api target = 100;

    get ratio() {
        const target = Number(this.target) || 1;
        const cur = Number(this.current) || 0;
        return Math.min(1, Math.max(0, cur / target));
    }

    get pctText() {
        return `${Math.round(this.ratio * 100)}%`;
    }

    get barStyle() {
        return `width: ${Math.round(this.ratio * 100)}%`;
    }

    get fillClass() {
        return this.ratio >= 1
            ? 'ui-goal__fill ui-goal__fill_done'
            : 'ui-goal__fill';
    }

    get valueText() {
        const cur = Number(this.current) || 0;
        const target = Number(this.target) || 0;
        return `${cur.toLocaleString('ja-JP')} / ${target.toLocaleString('ja-JP')}`;
    }
}
