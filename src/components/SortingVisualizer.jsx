import React, { useEffect, useState } from "react";
import "../styles.css";

function SortingVisualizer() {
  const red = "rgba(219, 57, 57, 0.8)";
  const green = "rgba(78, 216, 96, 0.8)";
  const yellow = "rgba(237,234,59,0.8)";
  const purple = "rgba(169, 92, 232, 0.8)";
  const blue = "rgba(66, 134, 244, 0.8)";
  let screenWidth = window.innerWidth;
  let setWidth = 0;
  if (screenWidth < 420) {
    setWidth = 200;
  } else {
    setWidth = 300;
  }
  const [upperLimit, setUpperLimit] = useState(setWidth);
  const [SortAlgo, setSortAlgo] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [flag, setFlag] = useState(0);
  var width;
  if (upperLimit <= 100) {
    width = 1;
  } else if (upperLimit > 100 && upperLimit <= 200) {
    width = 1;
  } else {
    width = 2;
  }

  const [array, setArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  useEffect(() => {
    resetArray();
  }, []);

  function resetArray() {
    const temp = [];
    const tempColor = [];
    for (let i = 0; i < upperLimit; i++) {
      temp.push(genRandomNumbers(5, 500));
      tempColor.push(blue);
    }
    setArray([...temp]);
    setColorArray([...tempColor]);
    setFlag(0);
    setIsSorted(false);
    setIsSorting(false);
  }
  async function BubbleSort(A) {
    for (let i = 0; i < A.length - 2; i++) {
      for (let j = 0; j < A.length - i - 1; j++) {
        await handle2ColorChangeQS(colorArray, j, j + 1, red);
        if (A[j] > A[j + 1]) {
          [A[j], A[j + 1]] = await swapEle(A[j], A[j + 1]);
          await handle2ColorChangeQS(colorArray, j, j + 1, green);
          await sleep(0);
          handle2ColorChangeQS(colorArray, j, j + 1, blue);
        } else handle2ColorChangeQS(colorArray, j, j + 1, blue);
      }
      handleColorChangeQS(colorArray, A.length - i - 1, purple);
    }
    for (let i = 0; i < A.length; i++) {
      handleColorChangeQS(colorArray, i, green);
    }
    await sleep(500);
    for (let i = 0; i < A.length; i++) {
      handleColorChangeQS(colorArray, i, purple);
    }
    setArray([...A]);
    setIsSorted(true);
  }
  async function InsertionSort(A) {
    for (let i = 1; i < A.length; ++i) {
      let key = A[i];
      let j = i - 1;
      await handleColorChangeQS(colorArray, i, yellow);
      while (j >= 0 && A[j] > key) {
        handleColorChangeQS(colorArray, j, red);
        A[j + 1] = A[j];
        await sleep(1);
        handleColorChangeQS(colorArray, j, blue);
        j = j - 1;
      }
      A[j + 1] = key;
      await sleep(1);
      for (let k = 0; k <= i; k++) handleColorChangeQS(colorArray, k, purple);
    }
    for (let i = 0; i < A.length; i++) {
      handleColorChangeQS(colorArray, i, green);
    }
    await sleep(500);
    for (let i = 0; i < A.length; i++) {
      handleColorChangeQS(colorArray, i, purple);
    }
    setArray([...A]);
    setIsSorted(true);
  }
  async function QuickSort(A, start, end) {
    if (start >= end) {
      return;
    }
    let index = await partition(A, start, end);
    handleColorChangeQS(colorArray, index, yellow);
    await QuickSort(A, start, index - 1);
    await QuickSort(A, index + 1, end);
    handleColorChangeQS(colorArray, index, purple);
    handle2ColorChangeQS(colorArray, start, end, purple);
  }
  async function partition(A, start, end) {
    let pivot = A[end];
    let pIndex = start;
    for (let i = start; i < end; i++) {
      await handle2ColorChangeQS(colorArray, i, end, red);
      if (A[i] <= pivot) {
        [A[i], A[pIndex]] = await swapEle(A[i], A[pIndex]);
        handle2ColorChangeQS(colorArray, i, pIndex, green);
        handle2ColorChangeQS(colorArray, i, pIndex, blue);
        pIndex++;
      }
      handleColorChangeQS(colorArray, i, blue);
    }
    [A[pIndex], A[end]] = await swapEle(A[pIndex], A[end]);
    handle2ColorChangeQS(colorArray, pIndex, end, green);
    handle2ColorChangeQS(colorArray, pIndex, end, blue);
    return pIndex;
  }
  async function swapEle(ele1, ele2) {
    ele1 = ele1 + ele2;
    ele2 = ele1 - ele2;
    ele1 = ele1 - ele2;
    return [ele1, ele2];
  }
  async function handle2ColorChangeQS(arr, index1, index2, Color) {
    arr[index1] = Color;
    arr[index2] = Color;
    setColorArray([...arr]);
    await sleep(0);
  }
  async function handleColorChangeQS(arr, index, Color) {
    arr[index] = Color;
    setColorArray([...arr]);
    await sleep(0);
  }
  async function SelectionSort(A) {
    let n = A.length;
    let tempIdx = 0;
    for (let i = 0; i < n - 1; i++) {
      let min_idx = i;
      for (let j = i + 1; j < n; j++) {
        await handleColorChangeQS(colorArray, j, red);
        if (A[j] < A[min_idx]) {
          min_idx = j;
          await sleep(1);
        }
        handleColorChangeQS(colorArray, j, blue);
        if (tempIdx !== min_idx) {
          handleColorChangeQS(colorArray, tempIdx, blue);
          tempIdx = min_idx;
          await sleep(1);
          handleColorChangeQS(colorArray, min_idx, "orange");
        }
      }
      handle2ColorChangeQS(colorArray, min_idx, i, red);
      await sleep(10);
      [A[min_idx], A[i]] = await swapEle(A[min_idx], A[i]);
      await sleep(0);
      handle2ColorChangeQS(colorArray, min_idx, i, green);
      await sleep(10);
      await handleColorChangeQS(colorArray, i, purple);
      for (let k = 0; k <= i; k++) {
        handleColorChangeQS(colorArray, k, purple);
      }
    }
    for (let i = 0; i < A.length; i++) {
      handleColorChangeQS(colorArray, i, green);
    }
    await sleep(500);
    for (let i = 0; i < A.length; i++) {
      handleColorChangeQS(colorArray, i, purple);
    }
    setArray([...A]);
    setIsSorted(true);
  }
  async function CockTailSort(A) {
    let swapped = true;
    let start = 0;
    let end = A.length;
    while (swapped === true) {
      swapped = false;
      for (let i = start; i < end - 1; ++i) {
        await handle2ColorChangeQS(colorArray, i, i + 1, red);
        if (A[i] > A[i + 1]) {
          [A[i], A[i + 1]] = await swapEle(A[i], A[i + 1]);
          await handle2ColorChangeQS(colorArray, i, i + 1, green);
          await sleep(0);
          handle2ColorChangeQS(colorArray, i, i + 1, blue);
          swapped = true;
        } else if (swapped === false) {
          handle2ColorChangeQS(colorArray, i, i + 1, purple);
        } else {
          handle2ColorChangeQS(colorArray, i, i + 1, blue);
        }
      }
      await handleColorChangeQS(colorArray, end - 1, purple);
      if (swapped === false) break;
      swapped = false;
      end = end - 1;
      for (let i = end - 1; i >= start; i--) {
        await handle2ColorChangeQS(colorArray, i, i + 1, red);
        if (A[i] > A[i + 1]) {
          [A[i], A[i + 1]] = await swapEle(A[i], A[i + 1]);
          await handle2ColorChangeQS(colorArray, i, i + 1, green);
          await sleep(0);
          handle2ColorChangeQS(colorArray, i, i + 1, blue);
          swapped = true;
        } else if (i === end - 1) {
          handleColorChangeQS(colorArray, i, blue);
          handleColorChangeQS(colorArray, i + 1, purple);
        } else if (swapped === false) {
          handle2ColorChangeQS(colorArray, i, i + 1, purple);
        } else {
          handle2ColorChangeQS(colorArray, i, i + 1, blue);
        }
        handleColorChangeQS(colorArray, i, purple);
      }
      start = start + 1;
    }
    for (let i = 0; i < A.length; i++) {
      handleColorChangeQS(colorArray, i, green);
    }
    await sleep(500);
    for (let i = 0; i < A.length; i++) {
      handleColorChangeQS(colorArray, i, purple);
    }
    setArray([...A]);
    setIsSorted(true);
  }

  return (
    <div class="everything">
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <span
            style={{ fontFamily: "Merriweather, serif", fontWeight: "700" }}
          >
            Sorting Visualizer
          </span>
        </a>
        <div className="btn-container">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => {
              if (!isSorting) resetArray();
              else {
                alert("Array is being sorted.");
              }
            }}
          >
            Generate New Array
          </button>
          <button
            className="btn btn-sm btn-warning bubble"
            onClick={() => {
              if (!isSorted && !isSorting) {
                setSortAlgo("bubble");
              }
              const temp = flag + 1;
              setFlag(temp);
            }}
          >
            Bubble Sort
          </button>
          <button
            className="btn btn-sm btn-warning insert"
            onClick={() => {
              if (!isSorted && !isSorting) {
                setSortAlgo("insert");
              }
              const temp = flag + 1;
              setFlag(temp);
            }}
          >
            Insertion Sort
          </button>
          <button
            className="btn btn-sm btn-warning quick"
            onClick={() => {
              if (!isSorted && !isSorting) {
                setSortAlgo("quick");
              }
              const temp = flag + 1;
              setFlag(temp);
            }}
          >
            Quick Sort
          </button>
          <button
            className="btn btn-sm btn-warning cocktail"
            onClick={() => {
              if (!isSorted) setSortAlgo("cocktail");
              const temp = flag + 1;
              setFlag(temp);
            }}
          >
            Cocktail Sort
          </button>
          <button
            className="btn btn-sm btn-warning select"
            onClick={() => {
              if (!isSorted) setSortAlgo("select");
              const temp = flag + 1;
              setFlag(temp);
            }}
          >
            Selection Sort
          </button>
        </div>
        <div class="sort-btn">
          {flag > 0 ? (
            <button
              class="btn btn-md btn-primary"
              onClick={async () => {
                if (!isSorted && !isSorting) {
                  setIsSorting(true);
                  if (SortAlgo === "bubble") {
                    await BubbleSort(array);
                    setIsSorted(true);
                  } else if (SortAlgo === "insert") {
                    await InsertionSort(array);
                    setIsSorted(true);
                  } else if (SortAlgo === "quick") {
                    await QuickSort(array, 0, array.length - 1);
                    await sleep(0);
                    for (let i = 0; i < array.length; i++) {
                      handleColorChangeQS(colorArray, i, green);
                    }
                    await sleep(500);
                    for (let i = 0; i < array.length; i++) {
                      handleColorChangeQS(colorArray, i, purple);
                    }
                    setIsSorted(true);
                  } else if (SortAlgo === "cocktail") {
                    await CockTailSort(array);
                    setIsSorted(true);
                  } else if (SortAlgo === "select") {
                    await SelectionSort(array);
                    setIsSorted(true);
                  }
                  setIsSorting(false);
                } else if (isSorted) {
                  alert("Array is Sorted");
                } else if (isSorting) {
                  alert("Array is being sorted.");
                }
              }}
            >
              Sort
            </button>
          ) : null}
        </div>
      </nav>

      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div className="array-container">
              <div className="array-container-up">
                {array.map(function (value, index) {
                  return (
                    <div
                      className="array-bar array-bar-up"
                      key={index}
                      style={{
                        height: `${value / 2}px`,
                        width: `${width}px`,
                        backgroundColor: `${colorArray[index]}`,
                      }}
                    ></div>
                  );
                })}
              </div>
              <div className="array-container-down">
                {array.map(function (value, index) {
                  return (
                    <div
                      className="array-bar array-bar-down"
                      key={index}
                      style={{
                        height: `${value / 2}px`,
                        width: `${width}px`,
                        backgroundColor: `${colorArray[index]}`,
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container">
          <span class="text-muted">&copy; 2020, All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}
function genRandomNumbers(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  if (number % 2 === 0) return number;
  else return number - 1;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default SortingVisualizer;
