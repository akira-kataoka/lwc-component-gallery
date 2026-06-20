import { LightningElement, api } from 'lwc';

/**
 * uiPagerDots — 汎用ドットページャー。
 * total 個のドットを並べ、current（1 始まり）を強調する。
 * ドットクリックで change イベント (detail.index) を発火する。
 */
export default class UiPagerDots extends LightningElement {
    /** ドット総数 */
    @api total = 3;
    /** 現在の位置（1 始まり） */
    @api current = 1;

    get dots() {
        const total = Math.max(1, Number(this.total) || 1);
        const cur = Number(this.current) || 1;
        const list = [];
        for (let i = 1; i <= total; i += 1) {
            list.push({
                key: i,
                index: i,
                cssClass:
                    i === cur
                        ? 'ui-pagerdots__dot ui-pagerdots__dot_active'
                        : 'ui-pagerdots__dot'
            });
        }
        return list;
    }

    handleClick(event) {
        const index = Number(event.currentTarget.dataset.index);
        this.current = index;
        this.dispatchEvent(new CustomEvent('change', { detail: { index } }));
    }
}
