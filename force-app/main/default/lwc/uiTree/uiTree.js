import { LightningElement, api, track } from 'lwc';

/**
 * uiTree — 汎用ツリー（2 階層）。
 * nodes 配列 ([{ label, value, children: [{ label, value }] }]) を
 * 折りたたみ可能なツリーで表示し、ノード選択時に select イベント
 * (detail.value) を発火する。
 */
export default class UiTree extends LightningElement {
    _nodes = [];

    /** [{ label, value, children }] の配列 */
    @api
    get nodes() {
        return this._nodes;
    }
    set nodes(value) {
        this._nodes = Array.isArray(value) ? value : [];
    }

    @track expanded = [];

    get computedNodes() {
        return this._nodes.map((n, i) => {
            const hasChildren = Array.isArray(n.children) && n.children.length > 0;
            const isOpen = this.expanded.includes(n.value);
            return {
                key: i,
                label: n.label,
                value: n.value,
                hasChildren,
                isOpen,
                caret: isOpen ? '▾' : '▸',
                children: isOpen && hasChildren ? n.children : []
            };
        });
    }

    toggle(value) {
        this.expanded = this.expanded.includes(value)
            ? this.expanded.filter((v) => v !== value)
            : [...this.expanded, value];
    }

    handleParent(event) {
        const value = event.currentTarget.dataset.value;
        const node = this._nodes.find((n) => n.value === value);
        if (node && Array.isArray(node.children) && node.children.length) {
            this.toggle(value);
        }
        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));
    }

    handleChild(event) {
        const value = event.currentTarget.dataset.value;
        this.dispatchEvent(new CustomEvent('select', { detail: { value } }));
    }
}
