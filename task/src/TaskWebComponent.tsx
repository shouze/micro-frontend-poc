import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ShadowRootContext } from './contexts/ShadowRootContext';
import styles from './App.css?inline';
import highlightStyles from 'highlight.js/styles/github.css?inline';
import { setShadowRoot, cleanupShadowRoot } from 'virtual:shadow-root';

class TaskWebComponent extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private instanceId: string;

  static get observedAttributes() {
    return ['route-basename', 'api-baseurl', 'loading-delay'];
  }

  constructor() {
    super();
    this.instanceId = crypto.randomUUID();
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    const shadow = this.attachShadow({ mode: 'closed' });
    setShadowRoot(this.instanceId, shadow);

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
    cleanupShadowRoot(this.instanceId);
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const basename = this.getAttribute('route-basename') || '';
    const apiBaseUrl = this.getAttribute('api-baseurl') || '';
    const loadingDelay = parseInt(this.getAttribute('loading-delay') || '0');

    this.root?.render(
      <React.StrictMode>
        <ShadowRootContext.Provider value={this.instanceId}>
          <App basename={basename} apiBaseUrl={apiBaseUrl} loadingDelay={loadingDelay} />
        </ShadowRootContext.Provider>
      </React.StrictMode>
    );
  }
}

customElements.define('task-web-component', TaskWebComponent);
