import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { Tab } from "bootstrap";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));
//TODO: Refactor.
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows, ncols, chanceLightStartsOn) {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  /** check the board in state to determine whether the player has won. */
  function hasWon(board) {
    console.log(board);
    return board.every(arr => arr.every(cell => cell === false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      // const newBoard = [];
      // for (let row of oldBoard) {
      //   const newRow = [...row]
      //   newBoard.push(newRow)
      // }

      const newBoard = oldBoard.map(row => [...row]);

      // in the copy, flip this cell and the cells around it
      flipCell(x, y, newBoard);
      flipCell(x + 1, y, newBoard);
      flipCell(x, y + 1, newBoard);
      flipCell(x, y - 1, newBoard);
      flipCell(x - 1, y, newBoard);

      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  const won = hasWon(board);

  return (
    <main>
      <h1>Lights Out</h1>
      <h2>{won && "You won!"}</h2>
      <table>
        <tbody>
          {board.map((r, idx) => <tr key={idx}>
            {r.map((c, x) => <Cell key={`${x}-${idx}`} flipCellsAroundMe={()=>flipCellsAround(`${x}-${idx}`)} isLit={c} />)}
          </tr>)}
        </tbody>
      </table>
    </main>
  );


  // TODO

  // make table board

  // TODO
}

export default Board;
