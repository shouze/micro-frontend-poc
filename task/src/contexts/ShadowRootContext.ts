import { createContext, useContext } from 'react';

export const ShadowRootContext = createContext<string>('');

export function useShadowRootInstance() {
  return useContext(ShadowRootContext);
}
