import { LightningElement, api } from 'lwc';

/**
 * uiPriceCard — 料金カード。
 * プラン名・価格・期間・特長リスト・CTA を持つ料金プランカード。
 * featured=true で強調表示し、CTA 押下で select イベントを発火する。
 */
export default class UiPriceCard extends LightningElement {
    /** プラン名 */
    @api plan;
    /** 価格（例: ¥1,980） */
    @api price;
    /** 期間（例: /月） */
    @api period = '/月';
    /** CTA ボタンのラベル */
    @api ctaLabel = '選択する';
    /** true で強調 */
    @api featured = false;

    _features = [];

    /** 特長（文字列の配列） */
    @api
    get features() {
        return this._features;
    }
    set features(value) {
        this._features = Array.isArray(value) ? value : [];
    }

    get cardClass() {
        return this.featured ? 'ui-price ui-price_featured' : 'ui-price';
    }

    get ctaClass() {
        return this.featured
            ? 'ui-price__cta ui-price__cta_featured'
            : 'ui-price__cta';
    }

    get featureList() {
        return this._features.map((f, i) => ({ key: i, label: f }));
    }

    handleSelect() {
        this.dispatchEvent(new CustomEvent('select'));
    }
}
