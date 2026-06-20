import { LightningElement, api } from 'lwc';

const VARIANTS = ['neutral', 'info', 'success', 'warning', 'error'];

/**
 * uiBadge — 汎用ステータスバッジ。
 * ラベルと色バリアント、任意のアイコンを表示する純粋な表示コンポーネント。
 */
export default class UiBadge extends LightningElement {
    /** 表示テキスト */
    @api label;
    /** 色バリアント: neutral | info | success | warning | error */
    @api variant = 'neutral';
    /** 任意の lightning-icon 名 (例: utility:check) */
    @api iconName;

    get computedClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'neutral';
        return `ui-badge ui-badge_${variant}`;
    }
}
