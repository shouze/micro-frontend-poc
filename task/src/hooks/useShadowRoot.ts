import { useShadowRoot } from 'virtual:shadow-root';
import { useShadowRootInstance } from '../contexts/ShadowRootContext';

export function useGetShadowRoot() {
  const instanceId = useShadowRootInstance();
  return useShadowRoot(instanceId);
}

export function useElementInShadow(id: string) {
  const instanceId = useShadowRootInstance();
  const shadowRoot = useShadowRoot(instanceId);
  return shadowRoot?.getElementById(id) ?? document.getElementById(id);
}
