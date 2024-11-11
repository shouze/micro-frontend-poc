import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

class TaskWebComponent extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  static get observedAttributes() {
    return ['route-basename', 'api-baseurl'];
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    this.root = ReactDOM.createRoot(mountPoint);
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const basename = this.getAttribute('route-basename') || '';
    const apiBaseUrl = this.getAttribute('api-baseurl') || '';

    this.root?.render(
      <React.StrictMode>
        <App basename={basename} apiBaseUrl={apiBaseUrl} />
      </React.StrictMode>
    );
  }
}

customElements.define('task-web-component', TaskWebComponent);