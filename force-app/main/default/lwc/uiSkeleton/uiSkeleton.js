import { LightningElement, api } from 'lwc';

const WIDTHS = ['100%', '92%', '78%', '85%', '65%'];

/**
 * uiSkeleton — 汎用スケルトン（読み込みプレースホルダ）。
 * lines 本のシマーアニメーションのプレースホルダ行を表示する。
 * avatar=true で先頭に円形のプレースホルダも表示する。
 */
export default class UiSkeleton extends LightningElement {
    /** 行数 */
    @api lines = 3;
    /** true で円形アバターのプレースホルダを表示 */
    @api avatar = false;

    get lineList() {
        const n = Math.max(1, Number(this.lines) || 1);
        const list = [];
        for (let i = 0; i < n; i += 1) {
            const width = WIDTHS[i % WIDTHS.length];
            list.push({
                key: i,
                style: `width:${width}`
            });
        }
        return list;
    }
}
