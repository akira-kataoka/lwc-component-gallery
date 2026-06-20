import { LightningElement, api } from 'lwc';

const SIZES = ['small', 'medium', 'large'];

/**
 * uiAvatar — 汎用アバター。
 * 画像 (src) があれば画像、なければ name から生成したイニシャルを表示する。
 */
export default class UiAvatar extends LightningElement {
    /** 表示名（イニシャル生成に使用） */
    @api name = '';
    /** 画像 URL（指定時は画像を表示） */
    @api src;
    /** サイズ: small | medium | large */
    @api size = 'medium';
    /** 形状: circle | square */
    @api variant = 'circle';

    get hasImage() {
        return !!this.src;
    }

    get initials() {
        const text = (this.name || '').trim();
        if (!text) {
            return '?';
        }
        const parts = text.split(/\s+/);
        if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase();
        }
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    get avatarClass() {
        const size = SIZES.includes(this.size) ? this.size : 'medium';
        const shape = this.variant === 'square' ? 'square' : 'circle';
        return `ui-avatar ui-avatar_${size} ui-avatar_${shape}`;
    }
}
