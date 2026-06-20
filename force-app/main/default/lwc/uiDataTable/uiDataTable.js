import { LightningElement, api, track } from 'lwc';

/**
 * uiDataTable — 汎用データテーブル。
 * columns ([{ label, fieldName, sortable }]) と data (オブジェクト配列) を受け取り、
 * ソート可能列のヘッダクリックで昇順→降順を切替える。
 * 行クリックで rowselect イベント (detail: { row }) を発火する。
 */
export default class UiDataTable extends LightningElement {
    @track _columns = [];
    @track _data = [];
    @track sortBy;
    @track sortDirection = 'asc';

    /** [{ label, fieldName, sortable }] の配列 */
    @api
    get columns() {
        return this._columns;
    }
    set columns(value) {
        this._columns = Array.isArray(value) ? value : [];
    }

    /** 表示するレコード (オブジェクト配列) */
    @api
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = Array.isArray(value) ? value : [];
    }

    get computedColumns() {
        return this._columns.map((c) => {
            const isSorted = c.sortable && c.fieldName === this.sortBy;
            let indicator = '';
            if (isSorted) {
                indicator = this.sortDirection === 'asc' ? ' ▲' : ' ▼';
            }
            return {
                ...c,
                cssClass: c.sortable
                    ? 'ui-dt__th ui-dt__th_sortable'
                    : 'ui-dt__th',
                headerLabel: c.label + indicator
            };
        });
    }

    get computedRows() {
        const rows = [...this._data];
        if (this.sortBy) {
            const dir = this.sortDirection === 'asc' ? 1 : -1;
            rows.sort((a, b) => {
                const av = a[this.sortBy];
                const bv = b[this.sortBy];
                if (av === bv) {
                    return 0;
                }
                if (av === undefined || av === null) {
                    return 1;
                }
                if (bv === undefined || bv === null) {
                    return -1;
                }
                return av > bv ? dir : -dir;
            });
        }
        return rows.map((row, index) => ({
            key: row.id !== undefined ? row.id : index,
            data: row,
            cells: this._columns.map((c) => ({
                key: c.fieldName,
                value: row[c.fieldName]
            }))
        }));
    }

    handleSort(event) {
        const field = event.currentTarget.dataset.field;
        const column = this._columns.find((c) => c.fieldName === field);
        if (!column || !column.sortable) {
            return;
        }
        if (this.sortBy === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortBy = field;
            this.sortDirection = 'asc';
        }
    }

    handleRowClick(event) {
        const index = Number(event.currentTarget.dataset.index);
        const row = this.computedRows[index];
        this.dispatchEvent(
            new CustomEvent('rowselect', { detail: { row: row && row.data } })
        );
    }
}
