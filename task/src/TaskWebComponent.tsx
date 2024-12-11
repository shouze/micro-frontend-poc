import ReactDOM from 'react-dom/client';
import { App } from './App';
import styles from './App.css?inline';
import highlightStyles from 'highlight.js/styles/github.css?inline';
import { setShadowRoot, cleanupShadowRoot } from 'virtual:shadow-root';
import { StrictMode } from 'react';

class TaskWebComponent extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  static get observedAttributes() {
    return ['route-basename', 'api-baseurl', 'loading-delay', 'data-uuid'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    console.log('mount', this.getAttribute('data-uuid') || '');
    const mountPoint = document.createElement('div');
    const shadow = this.attachShadow({ mode: 'closed' });
    setShadowRoot(this.getAttribute('data-uuid'), shadow);

    const styleSheet = new CSSStyleSheet();
    const highlightStyleSheet = new CSSStyleSheet();

    styleSheet.replaceSync(styles);
    highlightStyleSheet.replaceSync(highlightStyles);

    shadow.adoptedStyleSheets = [styleSheet, highlightStyleSheet];
    shadow.appendChild(mountPoint);

    this.root = ReactDOM.createRoot(mountPoint);
    this.render();
  }

  disconnectedCallback() {
    cleanupShadowRoot(this.getAttribute('data-uuid'));
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const basename = this.getAttribute('route-basename') || '';
    const apiBaseUrl = this.getAttribute('api-baseurl') || '';
    const loadingDelay = parseInt(this.getAttribute('loading-delay') || '0');

    this.root?.render(
      <StrictMode>
        <App basename={basename} apiBaseUrl={apiBaseUrl} loadingDelay={loadingDelay} />
      </StrictMode>
    );
  }
}

customElements.define('task-web-component', TaskWebComponent);
