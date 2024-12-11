declare module 'virtual:shadow-root' {
  export interface SetShadowRoot {
    (id: string | null, root: unknown): void;
  }
  export interface GetShadowRoots {
    (id: string | null): Document | null;
  }
  export interface CleanupShadowRoot {
    (id: string | null): void;
  }

  const setShadowRoot: SetShadowRoot;
  const getShadowRoots: GetShadowRoots;
  const cleanupShadowRoot: CleanupShadowRoot;

  export { setShadowRoot, getShadowRoots, cleanupShadowRoot };
}
