import type { Plugin } from 'vite';

const virtualModuleId = 'virtual:shadow-root';

const injectShadowRootPlugin = (): Plugin => {
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'inject-shadow-root',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
          const shadowRoots = new Map();

          export function setShadowRoot(instanceId, root) {
            shadowRoots.set(instanceId, root);
          }

          export function getShadowRoots(instanceId) {
            return shadowRoots.get(instanceId);
          }

          export function cleanupShadowRoot(instanceId) {
            shadowRoots.delete(instanceId);
          }
        `;
      }
    }
  };
};

export default injectShadowRootPlugin;
