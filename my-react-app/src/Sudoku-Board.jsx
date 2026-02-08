import { useState } from "react";
import "./index.css"; // import the CSS file
import Axios from "axios";

import CreateBoardButton from "./create-board";



function SudokuGrid() {
  
  const puzzle = [
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0
  ];
  const [grid, setGrid] = useState(puzzle);

  const updateGrid = async () => {
    try {
      const response = await Axios.get("http://127.0.0.1:8000/puzzle");
        setGrid(response.data.board);
      }
      catch (error) {
      console.error("Error fetching puzzle:", error);
      setGrid(puzzle); // Fallback to the initial puzzle if API call fails
    }
  };


  return (
    <>
      <div className="sudoku-grid">
        {Array.from({ length: 9 }).map((_, boxIndex) => (
          <div key={boxIndex} className="sudoku-box">
            {Array.from({ length: 9 }).map((_, cellIndex) => {
              const row = Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3);
              const col = (boxIndex % 3) * 3 + (cellIndex % 3);
              const index = row * 9 + col;
              const value = grid[index];

              return (
                <div
                  key={cellIndex}
                  className={`sudoku-cell ${value !== 0 ? "given" : ""}`}
                  onClick={() => updateCell(index, 5)}
                >
                  {value !== 0 ? value : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <CreateBoardButton create={updateGrid}/>
    </>
  );
}

export default SudokuGrid;
