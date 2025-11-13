declare module 'app-shared/loaders' {
  import type { Quest } from '../interfaces/quest';
  import type { Paging } from '../interfaces/paging';

  export interface QuestLoaderResult {
    data: Quest[];
    pagination: Paging;
  }

  export const questLoader: (args: { request: Request }) => Promise<QuestLoaderResult>;
}

declare global {}

export {};