import { getShadowRoots } from 'virtual:shadow-root';

export function getShadowRoot() {
  const instanceId = document.querySelector('task-web-component')?.getAttribute('data-uuid');
  if (!instanceId) throw new TypeError('Shadow root instance ID not found');

  return getShadowRoots(instanceId) ?? document;
}

export function getShadowElementById( id: string) {
  return getShadowRoot().getElementById(id);
}
