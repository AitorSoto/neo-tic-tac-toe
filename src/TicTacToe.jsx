import React, { useState, useEffect } from "react";
import "./index.css";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [listX, setListX] = useState([]);
  const [listO, setListO] = useState([]);

  useEffect(() => {
    console.log("Board", board);
  }, [board]);

  const handleClick = (i) => {
    console.log("old board: ", board);
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[i]) {
      return;
    }
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    console.log("new board: ", newBoard);
    if (xIsNext) {
      setListX([...listX, i]);
      handleListItems([...listX, i], "X");
    } else {
      setListO([...listO, i]);
      handleListItems([...listO, i], "O");
    }

    setXIsNext(!xIsNext);
  };

  function handleListItems(list, listType) {
    if (list.length > 3) {
      const i = list[0];
      list.shift();
      if (listType === "X") {
        setListX([...list]);
      } else {
        setListO([...list]);
      }
      const newBoard = [...board];
      //console.log("new board: ", newBoard);
      newBoard[i] = null;
      setBoard(newBoard);
    }
  }

  const handleRestart = () => {
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setXIsNext(true);
      setListX([]);
      setListO([]);
    }, 2000);
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        <span className={board[i] === "X" ? "player-x" : "player-o"}>
          {board[i]}
        </span>
      </button>
    );
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    handleRestart();
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
