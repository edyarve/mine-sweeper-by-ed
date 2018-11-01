import {generateMineMap} from './mine-map.util';
import {Setting} from './setting';
import {Square, UserSquare} from './square';

describe('Mine Map', () => {
  const setting1: Setting = {
    mines: 10,
    map: { x: 9, y: 9},
    timer: true
  };

  const countRowMines = (acc: number, sq: Square) =>
    acc + (sq.bomb ? 1 : 0);
  const countMines = (acc: number, squares: Square[]) =>
    acc + squares.reduce(countRowMines, 0);

  const walkBoardRow = (row: Square[], callback) =>
    row.forEach(callback);

  const walkBoard = (board: Square[][], callback) =>
    board.forEach( row =>
      walkBoardRow(row, callback));

  it('#generateMineMap map size', () => {
    const map1 = generateMineMap( setting1);
    const mineMap1: Square[][] = map1.mineMap;
    expect(map1.mineMap.length).toBe(setting1.map.x);
    expect(map1.mineMap[0].length).toBe(setting1.map.y);
    expect(mineMap1.reduce( countMines, 0)).toBe(setting1.mines);
  });

  it('#generateMineMap count mines', () => {
    const map1 = generateMineMap( setting1);
    const mineMap1: Square[][] = map1.mineMap;
    expect(mineMap1.reduce( countMines, 0)).toBe(setting1.mines);
  });

  // More tests are needed:
  // - count mines around the number
  // - corner cases: small board and large board
  // - step (normal, on bomb, on empty space, for a win)
  // - mark
  // ...
});
