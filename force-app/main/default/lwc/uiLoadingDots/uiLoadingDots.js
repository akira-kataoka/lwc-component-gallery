import { LightningElement, api } from 'lwc';

const VARIANTS = ['brand', 'neutral'];

/**
 * uiLoadingDots — 汎用ローディングドット。
 * 3 つのドットが順に弾むローディング表現。スピナーより控えめな読み込み中表示。
 */
export default class UiLoadingDots extends LightningElement {
    /** 色: brand | neutral */
    @api variant = 'brand';
    /** スクリーンリーダー向けテキスト */
    @api alternativeText = '読み込み中';

    get rootClass() {
        const variant = VARIANTS.includes(this.variant) ? this.variant : 'brand';
        return `ui-dots ui-dots_${variant}`;
    }
}
