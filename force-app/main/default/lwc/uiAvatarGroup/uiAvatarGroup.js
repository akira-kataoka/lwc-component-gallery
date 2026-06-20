import { LightningElement, api } from 'lwc';

function toInitials(name) {
    const t = (name || '').trim();
    if (!t) {
        return '?';
    }
    const p = t.split(/\s+/);
    return p.length === 1
        ? p[0].slice(0, 2).toUpperCase()
        : (p[0][0] + p[1][0]).toUpperCase();
}

/**
 * uiAvatarGroup — 汎用アバターグループ。
 * people 配列 ([{ name, src }]) を重ねて表示し、max を超える分は「+N」で集約する。
 */
export default class UiAvatarGroup extends LightningElement {
    _people = [];

    /** [{ name, src }] の配列 */
    @api
    get people() {
        return this._people;
    }
    set people(value) {
        this._people = Array.isArray(value) ? value : [];
    }

    /** 表示する最大人数 */
    @api max = 4;

    get visible() {
        const max = Number(this.max) || 4;
        return this._people.slice(0, max).map((p, i) => ({
            key: i,
            name: p.name,
            src: p.src,
            hasImage: !!p.src,
            initials: toInitials(p.name)
        }));
    }

    get overflow() {
        const o = this._people.length - (Number(this.max) || 4);
        return o > 0 ? o : 0;
    }

    get hasOverflow() {
        return this.overflow > 0;
    }

    get overflowText() {
        return `+${this.overflow}`;
    }
}
