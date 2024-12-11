import { getShadowRoots } from 'virtual:shadow-root';

export function getShadowRoot() {
  const instanceId = document.querySelector('calendar-web-component')?.getAttribute('data-uuid');
  if (!instanceId) throw new TypeError('Instance id is missing');

  return getShadowRoots(instanceId) ?? document;
}

export function getShadowElementById(id: string) {
  return getShadowRoot().getElementById(id);
}
