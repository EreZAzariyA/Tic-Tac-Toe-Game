import { useEffect, useState } from "react";
import Square from "./Square";
import "../index.css";

type Player = 'X' | 'O' | 'BOTH' | null;

const Board = () => {
      const [squares, setSquares] = useState(Array(9).fill(null));
      const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>();
      const [winner, setWinner] = useState<Player>(null);

      const setSquareValue = (index: number) => {
            const newDate = squares.map((val, i) => {
                  if (i === index) {
                        return currentPlayer;
                  }
                  return val;
            });
            setSquares(newDate);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      };

      const reset = () => {
            setSquares(Array(9).fill(null));
            setWinner(null);
            setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
      }

      const calculateWinner = (squares: Player[]) => {
            const lines = [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6]
            ];
            for (let i = 0; i < lines.length; i++) {
                  const [a, b, c] = lines[i];
                  if (squares[a] &&
                        squares[a] === squares[b] &&
                        squares[a] === squares[c]) {
                        return squares[a]
                  }
            }
            return null
      }

      useEffect(() => {
            const w = calculateWinner(squares);
            if (w) {
                  setWinner(w);
            }

            if (!w && !squares.filter((square) => !square).length) {
                  setWinner('BOTH');
            }
      }, [winner, squares]);

      return (
            <div>
                  {!winner && !currentPlayer && <p> Press to start the game </p>}

                  {!winner && currentPlayer && <p>Hey {currentPlayer}, it`s your turn</p>}

                  {/* If there is a winner */}
                  {winner && winner !== "BOTH" && <p>Congratulations {winner} is the winner</p>}

                  {/* If there is no winner */}
                  {winner && winner === "BOTH" && (<p> Congratulations you`re both winners</p>)}

                  <div className="grid">
                        {Array(9).fill(null).map((_, i) => {
                              return (
                                    <Square key={i}
                                          winner={winner}
                                          onClick={() => setSquareValue(i)}
                                          value={squares[i]}
                                    />
                              );
                        })}
                  </div>

                  <button className="reset" disabled={!winner} onClick={reset}>
                        Reset
                  </button>


                  {/* <button className="reset" disabled={!winner} onClick={reset}>Reset</button> */}
            </div>
      )
}

export default Board;