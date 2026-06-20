import { LightningElement, api, track } from 'lwc';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

/**
 * uiCalendar — 汎用月間カレンダー。
 * year / month（1〜12）の月を表示し、日付クリックで select イベント
 * (detail.{ year, month, day }) を発火する。省略時は現在の月を表示。
 */
export default class UiCalendar extends LightningElement {
    /** 年（省略時は今年） */
    @api year;
    /** 月 1〜12（省略時は今月） */
    @api month;

    @track _selected;

    /** 選択中の日 */
    @api
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
    }

    get computedYear() {
        return Number(this.year) || new Date().getFullYear();
    }

    get computedMonth() {
        return Number(this.month) || new Date().getMonth() + 1;
    }

    get title() {
        return `${this.computedYear}年 ${this.computedMonth}月`;
    }

    get weekdays() {
        return WEEKDAYS.map((d, i) => ({ key: i, label: d }));
    }

    get weeks() {
        const y = this.computedYear;
        const m = this.computedMonth;
        const startDow = new Date(y, m - 1, 1).getDay();
        const daysInMonth = new Date(y, m, 0).getDate();
        const cells = [];
        for (let i = 0; i < startDow; i += 1) {
            cells.push({ key: `b${i}`, blank: true });
        }
        for (let d = 1; d <= daysInMonth; d += 1) {
            const selected = Number(this._selected) === d;
            cells.push({
                key: `d${d}`,
                blank: false,
                day: d,
                cssClass: selected
                    ? 'ui-cal__day ui-cal__day_selected'
                    : 'ui-cal__day'
            });
        }
        while (cells.length % 7 !== 0) {
            cells.push({ key: `e${cells.length}`, blank: true });
        }
        const weeks = [];
        for (let i = 0; i < cells.length; i += 7) {
            weeks.push({ key: i, days: cells.slice(i, i + 7) });
        }
        return weeks;
    }

    handleDay(event) {
        const day = Number(event.currentTarget.dataset.day);
        this._selected = day;
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: { year: this.computedYear, month: this.computedMonth, day }
            })
        );
    }
}
