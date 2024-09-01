// src/App.jsx
import React, { useState } from 'react';
import Grid from './components/Grid';
import './App.css';

const initialGridData = [
  [
    { color: '#fff', content: '' },
    { color: '#fff', content: '' },
    { color: '#fff', content: '' },
  ],
  [
    { color: '#fff', content: '' },
    { color: '#fff', content: '' },
    { color: '#fff', content: '' },
  ],
  [
    { color: '#fff', content: '' },
    { color: '#fff', content: '' },
    { color: '#fff', content: '' },
  ],
];

const dsls = [
  {
    name: 'Fill Diagonal',
    execute: (gridData) => {
      return gridData.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (rowIndex === cellIndex) {
            return { ...cell, color: '#4caf50' }; // Green color
          }
          return cell;
        })
      );
    },
  },
  {
    name: 'Fill Anti-Diagonal',
    execute: (gridData) => {
      return gridData.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (rowIndex + cellIndex === gridData.length - 1) {
            return { ...cell, color: '#f44336' }; // Red color
          }
          return cell;
        })
      );
    },
  },
  {
    name: 'Clear Grid',
    execute: (gridData) => {
      return gridData.map((row) =>
        row.map((cell) => ({ ...cell, color: '#fff', content: '' }))
      );
    },
  },
  // Add more DSLs as needed
];

const DSLList = ({ dsls, selectedDSL, setSelectedDSL }) => {
  return (
    <div className="dsl-list">
      <h3 className="dsl-list__title">Available DSLs</h3>
      <ul className="dsl-list__items">
        {dsls.map((dsl, index) => (
          <li key={index} className="dsl-list__item">
            <button
              onClick={() => setSelectedDSL(dsl)}
              className={`dsl-list__button ${dsl.name === selectedDSL?.name ? 'dsl-list__button--selected' : ''}`}
            >
              {dsl.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [gridData, setGridData] = useState(initialGridData);
  const [modifiedGridData, setModifiedGridData] = useState(initialGridData);
  const [selectedDSL, setSelectedDSL] = useState(null);

  const applyDSL = () => {
    if (selectedDSL) {
      const newGridData = selectedDSL.execute(gridData);
      setModifiedGridData(newGridData);
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">DSL Tester Interface</h1>
      <div className="app__container">
        <DSLList dsls={dsls} selectedDSL={selectedDSL} setSelectedDSL={setSelectedDSL} />
        <div className="app__grids">
          <div className="app__grid-wrapper">
            <h3 className="app__grid-title">Original Grid</h3>
            <Grid gridData={gridData} />
          </div>
          <div className="app__grid-wrapper">
            <h3 className="app__grid-title">Modified Grid</h3>
            <Grid gridData={modifiedGridData} />
          </div>
        </div>
      </div>
      <button className="app__apply-button" onClick={applyDSL} disabled={!selectedDSL}>
        Apply DSL
      </button>
    </div>
  );
};

export default App;
