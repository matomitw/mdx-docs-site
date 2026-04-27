import { createContext, useContext } from 'react';
import type { PageInfo } from './getPages';

export const PagesContext = createContext<PageInfo[]>([]);

export function usePages() {
  return useContext(PagesContext);
}
