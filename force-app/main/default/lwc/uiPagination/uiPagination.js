import { LightningElement, api } from 'lwc';

/**
 * uiPagination — 汎用ページネーション。
 * totalPages と currentPage を受け取りページ番号を表示する。
 * ページ変更時に change イベント (detail.page) を発火する。
 */
export default class UiPagination extends LightningElement {
    /** 総ページ数 */
    @api totalPages = 1;
    /** 現在ページ（1 始まり） */
    @api currentPage = 1;

    get pages() {
        const total = Math.max(1, Number(this.totalPages) || 1);
        const list = [];
        for (let i = 1; i <= total; i += 1) {
            list.push({
                num: i,
                cssClass:
                    i === Number(this.currentPage)
                        ? 'ui-pagination__page ui-pagination__page_active'
                        : 'ui-pagination__page'
            });
        }
        return list;
    }

    get isFirst() {
        return Number(this.currentPage) <= 1;
    }

    get isLast() {
        return Number(this.currentPage) >= Number(this.totalPages);
    }

    goTo(page) {
        const target = Math.min(
            Math.max(1, page),
            Math.max(1, Number(this.totalPages) || 1)
        );
        if (target !== Number(this.currentPage)) {
            this.currentPage = target;
            this.dispatchEvent(
                new CustomEvent('change', { detail: { page: target } })
            );
        }
    }

    handlePage(event) {
        this.goTo(Number(event.currentTarget.dataset.page));
    }

    handlePrev() {
        this.goTo(Number(this.currentPage) - 1);
    }

    handleNext() {
        this.goTo(Number(this.currentPage) + 1);
    }
}
