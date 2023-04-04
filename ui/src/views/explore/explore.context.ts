import { createContext } from '@/utils';

export type ExploreContext = {
  search: string;
  orderBy: string;
  pageNumber: number;
  endReached: boolean;
};

const [ExploreProvider, useExploreContext] = createContext<ExploreContext>({
  name: 'Explore.Context',
  hookName: 'Explore.useExploreContext',
  providerName: 'Explore.Provider',
});

export abstract class Explore {
  static readonly useExploreContext = useExploreContext;
}
