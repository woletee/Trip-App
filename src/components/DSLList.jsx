// src/components/DSLList.js
import React from 'react';

const DSLList = ({ dsls, applyDSL }) => {
  return (
    <div className="dsl-list">
      <h3>Available DSLs</h3>
      <ul>
        {dsls.map((dsl, index) => (
          <li key={index}>
            <button onClick={() => applyDSL(dsl)}>{dsl.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DSLList;
