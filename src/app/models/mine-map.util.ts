import {Setting} from './setting';
import {MineMapWithOutcome, Point, Square, UserSquare} from './square';

/**
 * These functions represent functionality of manipulating the mine map.
 *
 * TODO: Investigate to refactor these functions.
 * Many of these functions pass around the same parameters, which is ok from Functional programming stand point. However,
 * this can avoided by nesting some private functions and use closure to hold references to common objects like mineMap and setting
 * and possibly others. Anther solution is to use OOO and create a class to keep references to these objects
 */

/**
 * Generates the mine map based on the given settings. The created mine map is a two dimensional array (settings.map.y by settings.map.x)
 * containing randomly generated mines in the specified quantity (setting.mines), squares surrounding each mine specifying the
 * number of mines it touches, and the rest of the empty squares.
 *
 * @param setting : Setting
 */
export function generateMineMap(setting: Setting): MineMapWithOutcome {
  const mineMap: Square[][] = []; // resulting mine map

  for (let i = 0; i < setting.mines; i++) {
    const mine: Point = getNewMineCoordinates(mineMap, setting);
    set(mineMap, mine.x, mine.y, {
      bomb: true,
      touchingBombs: 0,
      action: UserSquare.NONE
    });
    walkAround(mine, 1, mineMap, setting, (x, y, map) => {
      if (get(map, x, y)) {
        map[x][y].touchingBombs++;
      } else {
        set(map, x, y, {
          bomb: false,
          touchingBombs: 1,
          action: UserSquare.NONE
        });
      }
      return false;
    });
  }

  // Setting empty squares not connected to any mine
  for (let x = 0; x < setting.map.x; x++) {
    for (let y = 0; y < setting.map.y; y++) {
      if (!get(mineMap, x, y)) {
        set(mineMap, x, y, {
          bomb: false,
          touchingBombs: 0,
          action: UserSquare.NONE
        });
      }
    }
  }

  return {
    mineMap,
    remainingMines: setting.mines,
    outcome: undefined
  };
}

/**
 * Marks the element in the mineMap as STEPPED. If user steps on the mine function returns outcome=false and if user steps on the last
 * square that does not have the the mine. Otherwise outcome would remain undefined.
 *
 * Currently this algorithm is not recursive as recursive algorithm, which was implemented first created a stack overflow errors on
 * larger map like 100x100. Even though the non-recursive algorithm does not produce this error it still very slow for
 * maps of size 100x100.
 *
 * @param x
 * @param y
 * @param mineMap
 * @param setting
 * @param postponeSteps - currently set is always empty, but at some point we might want to return coordinates of some squares that
 * have not steps on yet. This could be useful if user stepped on large empty area and if we want to update view of the map with some
 * portion of uncovered and uncover others with the other API calls.
 */
export function step(x: number, y: number, mineMap: Square[][],
                     setting: Setting, postponeSteps: Set<number> = new Set<number>()): MineMapWithOutcome {
  if (justStep(x, y, mineMap, setting, postponeSteps)) {
    getOutcome(mineMap, setting, postponeSteps);
  }
  postponeSteps.delete(getHash(x, y, setting)); // just stepped, so remove it from postponed steps
  // Go though all postponed steps
  while (postponeSteps.size > 0) {
    postponeSteps.forEach( hash => {
      const point = getPoint(hash, setting);
      // Step on postpone step
      if (justStep(point.x, point.y, mineMap, setting, postponeSteps)) {
        // should not happen
        throw new Error('Internal Error: Mine near empty space;');
      }
      postponeSteps.delete(hash); // just stepped, so remove it from postponed steps
    });
  }
  return getOutcome(mineMap, setting, postponeSteps);
}

/**
 * Mark/un-mark step which possibly has a mine.
 * @param x - coordinate x
 * @param y - coordinate y
 * @param mineMap - mine maps
 * @param setting - settings
 */
export function mark(x: number, y: number, mineMap: Square[][], setting: Setting): MineMapWithOutcome {
  if (mineMap[x][y].action === UserSquare.MARKED) {
    mineMap[x][y].action = UserSquare.NONE;
  } else if (mineMap[x][y].action === UserSquare.NONE) {
    mineMap[x][y].action = UserSquare.MARKED;
  }
  return getOutcome(mineMap, setting);
}

/**
 * Walk though the perimeter of the outer square around the given center and call the callback function for each single coordinate
 * on the perimeter.
 * @param center - coordinates of the center
 * @param radius - distance between center and the edge of the outer square
 * @param m - map of game
 * @param callback - callback function, if the function returns true we stop the walk though
 *
 * @return true if callback function has returned true and false otherwise
 */
export function walkAround( center: Point, radius: number, m: Square[][], setting: Setting,
                     callback: (x: number, y: number, m: Square[][]) => boolean ): boolean {
  for (let y = center.y - radius; y <= center.y + radius; y++) {
    if ( y < 0 || y >= setting.map.y ) {
      continue; // out of bounds
    }
    if (y === center.y - radius || y === center.y + radius) {
      // For first and last line walk through all the x values,
      // but skip out of bounds lines
      for (let x = center.x - radius; x <= center.x + radius; x++) {
        if ( x >= 0 && x < setting.map.x) {
          // skip out of bounds values
          if (callback(x, y, m)) {
            return true;
          }
        }
      }
    } else {
      const x1 = center.x - radius;
      if ( x1 >= 0 && x1 < setting.map.x) {
        if (callback(x1, y, m)) {
          return true;
        }
      }
      // For other lines only walk on the edges
      const x2 = center.x + radius;
      if ( x2 >= 0 && x2 < setting.map.x) {
        if (callback(x2, y, m)) {
          return true;
        }
      }
    }
  }
}

// private functions
/**
 *  Step on (x,y) and discover all nearby steps (postponeSteps) that should be stepped on in the near future.
 * @param x
 * @param y
 * @param mineMap
 * @param setting
 * @param postponeSteps
 */
export function justStep(x: number, y: number, mineMap: Square[][], setting: Setting, postponeSteps: Set<number>): boolean {
  if (mineMap[x][y].bomb) {
    mineMap[x][y].action = UserSquare.EXPLODED;
    for (x = 0; x < setting.map.x; x++) {
      for (y = 0; y < setting.map.y; y++) {
        const square = mineMap[x][y];
        if (square.action !== UserSquare.EXPLODED
          && square.bomb) {
          square.action = UserSquare.STEPPED;
        }
      }
    }
    return true;
  }
  if (mineMap[x][y].action === UserSquare.STEPPED) {
    return false;
  }
  mineMap[x][y].action = UserSquare.STEPPED;
  postponeSteps.delete(getHash(x, y, setting)); // just stepped, so remove it from postponed stepps
  if (mineMap[x][y].touchingBombs === 0) {
    // step on squares in the vicinity
    walkAround({x, y}, 1, mineMap, setting, (x1: number, y1: number, map: Square[][]) => {
      // Call justStep here if we want to change this algorithm into recursive and remove other line inside walk around
      if (mineMap[x1][y1].action !== UserSquare.STEPPED) {
        if (mineMap[x1][y1].touchingBombs === 0) {
          postponeSteps.add(getHash(x1, y1, setting));
        } else {
          justStep(x1, y1, map, setting, postponeSteps);
        }
      }
      return false;
    });
  }
  return false;
}

function getHash(x: number, y: number, setting: Setting): number {
  return x * setting.map.x + y;
}

function getPoint(hash: number, setting: Setting): Point {
  const y = hash % setting.map.x;
  return {x: (hash - y) / setting.map.x, y};
}

function getOutcome(mineMap: Square[][], setting: Setting, postponedSteps?: Set<number>): MineMapWithOutcome {
  let remainingMines = setting.mines;
  let steppedSquares = 0;
  let outcome: boolean;
  for (let x = 0; x < mineMap.length; x++) {
    for (let y = 0; y < mineMap[x].length; y++) {
      const square = mineMap[x][y];
      if (square.action  === UserSquare.MARKED) {
        remainingMines--;
      }
      // Check the outcome
      if (square.action  === UserSquare.STEPPED) {
        if (square.bomb) {
          outcome = false; // you lost
        } else {
          steppedSquares++;
        }
      }
    }
  }
  if (outcome === undefined) {
    if (setting.map.x * setting.map.y - steppedSquares === setting.mines) {
      // if we stepped on all squeares except on ones with mines we won
      outcome = true;
    }
  }
  return {
    mineMap,
    outcome,
    remainingMines,
    postponedSteps
  };
}

function set(map: Square[][], x: number, y: number, value: Square) {
  if (!map[x]) {
    map[x] = [];
  }
  map[x][y] = value;
}

function get(map: Square[][], x: number, y: number): Square {
  if (!map[x]) {
    return null;
  }
  return map[x][y];
}

function getRandomMine(setting: Setting) {
  return {
    x: Math.floor(Math.random() * setting.map.x),
    y: Math.floor(Math.random() * setting.map.y)
  };
}

function getNewMineCoordinates(mineMap: Square[][], setting: Setting): Point {
  const mine = getRandomMine(setting);
  if (!mineMap[mine.x]) {
    return mine;
  } else {
    if (mineMap[mine.x][mine.y]) {
      // If the mine is already at this place, walk around and find a new place for it
      const center: Point = {...mine};
      const isFound = false;
      const maxRadius = Math.max(mine.x - 1, mine.y - 1, Math.abs(mine.x - setting.map.x - 1), Math.abs(mine.y - setting.map.y - 1));
      for (let radius = 1; radius < maxRadius; radius++) {
        walkAround(center, radius, mineMap, setting, (x, y, map) => {
          if (map[x] && map[x][y]) {
            if (!map[x][y].bomb) {
              mine.x = x;
              mine.y = y;
              return true;
            }
          }
        });
      }
    }
  }
  return mine;
}
