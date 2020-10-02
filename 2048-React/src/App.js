import React, { useState, useEffect } from 'react';
import { cloneDeep} from 'lodash';
import './App.css'
import { useEvent, getColors } from './components/util';

function App() {

  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(localStorage.getItem('gameBestScore') || 0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize

  const initialize = () => {
    let newGrid = cloneDeep(data);

    AddNumber(newGrid);
    AddNumber(newGrid);
    setData(newGrid);
  };

  // AddNumber

  const AddNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    while (!added) {
      if (gridFull) {
        break
      }
      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      };
    };
  };

  // Calculate Score

  const getScore = (addNum) => {
    const newScore = score + addNum;
    setScore(newScore);
    getBestScore(newScore);
  };

  // Calculate BestScore

  const getBestScore = (score) => {
    let newBestScore;
    if(score > bestScore) {
      newBestScore = score;
      setBestScore(newBestScore);
      localStorage.setItem('gameBestScore', newBestScore);
    };
  };

  // Swipe Left

  const swipeLeft = () => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;

      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }

        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            getScore(b[slow]);
            fast = slow + 1;
            slow++
          } else {
            slow++;
            fast = slow + 1;
          };
        };
      };
    };

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      AddNumber(newArray);
    }

    setData(newArray);
    checkGameOver(newArray);
  };

  // Swipe right

  const swipeRight = () => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 3;
      let fast = 2;

      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }

        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            getScore(b[slow]);
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          };
        };
      };
    };

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      AddNumber(newArray);
    }

    setData(newArray);
    checkGameOver(newArray);
  };

  // Swipe Up

  const swipeUp = () => {
    let oldGrid = data;
    let dataArray = cloneDeep(data);
    let rotateArray = [];
    let rotateRow = [];
    let newArray = [];

    // Rotate array 90 degree in anti-clockwise direction

    for(let i = 0; i < 4; i++){
      rotateRow = [];
      for(let j = 0; j < 4; j++) {
        rotateRow.push(dataArray[j][i]);
      }
      rotateArray.unshift(rotateRow);
    }

    // Used algorithm for swipe left

    for (let i = 0; i < 4; i++) {
      let b = rotateArray[i];
      let slow = 0;
      let fast = 1;

      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }

        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            getScore(b[slow]);
            fast = slow + 1;
            slow++
          } else {
            slow++;
            fast = slow + 1;
          };
        };
      };
    };

    // Rotate array 90 degree in clockwise direction

    for(let i = 0; i < 4; i++){
      rotateRow = [];
      for(let j = 0; j < 4; j++) {
        rotateRow.unshift(rotateArray[j][i]);
      };
      newArray.push(rotateRow);
    };

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      AddNumber(newArray);
    };

    setData(newArray);
    checkGameOver(newArray);
  };

  // Swipe Down

  const swipeDown = () => {
    let oldGrid = data;
    let dataArray = cloneDeep(data);
    let rotateArray = [];
    let rotateRow = [];
    let newArray = [];

    // Rotate array 90 degree in anti-clockwise direction

    for(let i = 0; i < 4; i++){
      rotateRow = [];
      for(let j = 0; j < 4; j++) {
        rotateRow.push(dataArray[j][i]);
      }
      rotateArray.unshift(rotateRow);
    }

    // Used algorithm for swipe right

    for (let i = 0; i < 4; i++) {
      let b = rotateArray[i];
      let slow = 3;
      let fast = 2;

      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }

        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            getScore(b[slow]);
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          };
        };
      };
    };

    // Rotate array 90 degree in clockwise direction

    for(let i = 0; i < 4; i++){
      rotateRow = [];
      for(let j = 0; j < 4; j++) {
        rotateRow.unshift(rotateArray[j][i]);
      };
      newArray.push(rotateRow);
    };

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      AddNumber(newArray);
    };

    setData(newArray);
    checkGameOver(newArray);
  };

  // Check GameOver

  const checkGameOver = (array) => {
    if(!array.flat().includes(0)) {
      let nextStep = {
        x_axis: [],
        y_axis: []
      }
  
      let x = array;
      let rotateRow;
      let y = [];

      // Rotate array 90 degree in anti-clockwise direction

      for(let i = 0; i < 4; i++){
        rotateRow = [];
        for(let j = 0; j < 4; j++) {
          rotateRow.push(x[j][i]);
        }
        y.unshift(rotateRow);
      }

      // Check x-axis

      for (let i = 0; i < 4; i++) {
        let b = x[i];
        let slow = 0;
        let fast = 1;

        while (slow < 3) {
          if(b[slow] !== b[fast]){
            slow++;
            fast++;
            nextStep.x_axis.push(false);
          } else {
            slow++;
            fast++;
            nextStep.x_axis.push(true);
          }
        }
      };
  
  // Check y-axis

        for (let i = 0; i < 4; i++) {
          let b = y[i];
          let slow = 0;
          let fast = 1;
  
          while (slow < 3) {
            if(b[slow] !== b[fast]){
              slow++;
              fast++;
              nextStep.y_axis.push(false);
            } else {
              slow++;
              fast++;
              nextStep.y_axis.push(true);
            };
          };
        };

          if(!nextStep.x_axis.includes(true) && !nextStep.y_axis.includes(true)) {
            setGameOver(true);
          };
    };
  };

  //Handle key Down

  const handleKeyDown = (event) => {
    if (gameOver) {
      return;
    };
    switch(event.keyCode) {
      case LEFT_ARROW:
        swipeLeft();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      default:
        break;
    };
  };

  // Reset

  const resetGame = () => {
    const resetGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];

    AddNumber(resetGrid);
    AddNumber(resetGrid);
    setData(resetGrid);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    initialize();
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  useEvent('keydown', handleKeyDown);

  return (
    <div className='game'>
      <div className='header'>
        <div className='header__info'>
          <div className='header__logo'>2048</div>
          <div className='score'><p>Score</p>{score}</div>
          <div className='score'><p>Best</p>{bestScore}</div>
        </div>
        <div className='newGameBTN' onClick={resetGame}>New Game</div>
      </div>
      <div className='playground'>
        {gameOver && <div className='gameOver'>Game Over</div>}
        {data.map((row, oneIndex) => {
          return (
            <div className='gameRow' key={oneIndex}>
              {row.map((digit, index) => (
                <Block num={digit} key={index} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Block = ({ num }) => {

  return (
    <div
      className={'rowItem'}
      style={{
        backgroundColor: getColors(num),
        color: num === 2 || num === 4 ? '#776e65' : '#f9f6f2'
      }}
    >
      {num !== 0 ? num : ''}
    </div>
  );
};

export default App;