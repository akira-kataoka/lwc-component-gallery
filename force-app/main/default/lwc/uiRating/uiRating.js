import { LightningElement, api, track } from 'lwc';

/**
 * uiRating — 汎用スター評価。
 * value（現在値）と max（星の数）を表示し、クリックで評価を変更して
 * change イベント (detail.value) を発火する。readOnly で閲覧専用。
 */
export default class UiRating extends LightningElement {
    /** 現在の評価値 */
    @api value = 0;
    /** 星の数 */
    @api max = 5;
    /** true で閲覧専用 */
    @api readOnly = false;

    @track hover = 0;

    get stars() {
        const total = Math.max(1, Number(this.max) || 5);
        const filledTo = this.hover || Number(this.value) || 0;
        const list = [];
        for (let i = 1; i <= total; i += 1) {
            list.push({
                index: i,
                char: i <= filledTo ? '★' : '☆',
                cssClass:
                    i <= filledTo
                        ? 'ui-rating__star ui-rating__star_on'
                        : 'ui-rating__star'
            });
        }
        return list;
    }

    get rootClass() {
        return this.readOnly ? 'ui-rating ui-rating_readonly' : 'ui-rating';
    }

    handleClick(event) {
        if (this.readOnly) {
            return;
        }
        this.value = Number(event.currentTarget.dataset.index);
        this.dispatchEvent(
            new CustomEvent('change', { detail: { value: this.value } })
        );
    }

    handleEnter(event) {
        if (this.readOnly) {
            return;
        }
        this.hover = Number(event.currentTarget.dataset.index);
    }

    handleLeave() {
        this.hover = 0;
    }
}
