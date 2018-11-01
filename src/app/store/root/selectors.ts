import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  MineMapStoreSelectors
} from './../mine-map';

export const selectError: MemoizedSelector<object, string> = createSelector(
  MineMapStoreSelectors.selectMineMapError,
  (mineMapError: string) => {
    return mineMapError;
  }
);

// export const selectIsLoading: MemoizedSelector<
//   object,
//   boolean
//   > = createSelector(
//   MineMapStoreSelectors.selectMineMapIsLoading,
//   (mineMap: boolean) => {
//     return mineMap;
//   }
// );
