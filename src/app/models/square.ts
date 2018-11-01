
export enum UserSquare {NONE, STEPPED, MARKED, EXPLODED}

export interface Point {
  x: number;
  y: number;
}

export interface Square {
  bomb: boolean;          // is it a mine?
  touchingBombs: number;  // how many mines are in the vicinity?
  action: UserSquare;     // user action upon the square
}

export interface MineMapWithOutcome {
  mineMap: Square[][];
  outcome: boolean;         // true - won, false - lost, undefined - game in progress
  remainingMines: number;   // number of mines that still have not yet been discovered.
  postponedSteps?: Set<number>;  // Set of hash codes of the squares that do not have nearby mines, but have not been stepped yet
                                // hash = x * Nx + y, Nx is width of the board
}
