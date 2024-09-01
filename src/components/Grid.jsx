// src/components/Grid.jsx
import React from 'react';
import './Grid.css'; // Import CSS for styling

const Grid = ({ gridData }) => {
  return (
    <div className="grid">
      {gridData.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              className="grid-cell"
              key={cellIndex}
              style={{ backgroundColor: cell.color }}
            >
              {cell.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
