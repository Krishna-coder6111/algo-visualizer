import React, { useState } from 'react';
import './App.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState(generateRandomArray(100));
  const arrayContainer = document.querySelector(".array-container");

  function generateRandomArray(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);
  }

  function newArray() {
    setArray(generateRandomArray(100));
  }

  //bubble sort
  async function bubbleSort() {
      const bars = document.querySelectorAll(".array-bar");

      for (let i = 0; i < array.length - 1; i++) {
          for (let j = 0; j < array.length - 1 - i; j++) {
              bars[j].style.backgroundColor = "#007bff";
              bars[j + 1].style.backgroundColor = "#007bff";

              if (array[j] > array[j + 1]) {
                  await new Promise((resolve) => setTimeout(resolve, 100));

                  const temp = array[j];
                  array[j] = array[j + 1];
                  array[j + 1] = temp;

                  bars[j].style.height = `${array[j] * 2}px`;
                  bars[j + 1].style.height = `${array[j + 1] * 2}px`;
              }

              bars[j].style.backgroundColor = "#6c757d";
              bars[j + 1].style.backgroundColor = "#6c757d";
          }
      }
  }

  //selection sort
  async function selectionSort() {
      const bars = document.querySelectorAll(".array-bar");

      for (let i = 0; i < array.length - 1; i++) {
          let minIndex = i;
          bars[minIndex].style.backgroundColor = "#007bff";

          for (let j = i + 1; j < array.length; j++) {
              bars[j].style.backgroundColor = "#007bff";
              await new Promise((resolve) => setTimeout(resolve, 100));

              if (array[j] < array[minIndex]) {
                  bars[minIndex].style.backgroundColor = "#6c757d";
                  minIndex = j;
              } else {
                  bars[j].style.backgroundColor = "#6c757d";
              }
          }

          if (minIndex !== i) {
              [array[i], array[minIndex]] = [array[minIndex], array[i]];
              bars[i].style.height = `${array[i] * 2}px`;
              bars[minIndex].style.height = `${array[minIndex] * 2}px`;
              await new Promise((resolve) => setTimeout(resolve, 100));
          }

          bars[minIndex].style.backgroundColor = "#6c757d";
      }
  }

  //insertion sort
  async function insertionSort() {
      const bars = document.querySelectorAll(".array-bar");

      bars[0].style.backgroundColor = "#007bff";

      for (let i = 1; i < array.length; i++) {
          let key = array[i];
          let j = i - 1;

          bars[i].style.backgroundColor = "#007bff";
          await new Promise((resolve) => setTimeout(resolve, 100));

          while (j >= 0 && array[j] > key) {
              array[j + 1] = array[j];
              bars[j + 1].style.height = `${array[j + 1] * 2}px`;
              await new Promise((resolve) => setTimeout(resolve, 100));

              j--;
          }

          array[j + 1] = key;
          bars[j + 1].style.height = `${array[j + 1] * 2}px`;
          await new Promise((resolve) => setTimeout(resolve, 100));
      }
  }

  //heap sort methods

  async function heapify(n, i) {
      const bars = document.querySelectorAll(".array-bar");
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (left < n && array[left] > array[largest]) {
          largest = left;
      }

      if (right < n && array[right] > array[largest]) {
          largest = right;
      }

      if (largest !== i) {
          [array[i], array[largest]] = [array[largest], array[i]];
          bars[i].style.height = `${array[i] * 2}px`;
          bars[largest].style.height = `${array[largest] * 2}px`;
          await new Promise((resolve) => setTimeout(resolve, 100));

          await heapify(n, largest);
      }
  }

  async function heapSort() {
      const n = array.length;

      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
          await heapify(n, i);
      }

      for (let i = n - 1; i >= 0; i--) {
          [array[0], array[i]] = [array[i], array[0]];
          const bars = document.querySelectorAll(".array-bar");
          bars[0].style.height = `${array[0] * 2}px`;
          bars[i].style.height = `${array[i] * 2}px`;
          await new Promise((resolve) => setTimeout(resolve, 100));

          await heapify(i, 0);
      }
  }

  //merge sort methods

  async function merge(l, m, r) {
      const bars = document.querySelectorAll(".array-bar");
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = [];
      let R = [];

      for (let i = 0; i < n1; i++) {
          L[i] = array[l + i];
      }

      for (let i = 0; i < n2; i++) {
          R[i] = array[m + 1 + i];
      }

      let i = 0;
      let j = 0;
      let k = l;

      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              array[k] = L[i];
              i++;
          } else {
              array[k] = R[j];
              j++;
          }
          bars[k].style.height = `${array[k] * 2}px`;
          await new Promise((resolve) => setTimeout(resolve, 100));
          k++;
      }

      while (i < n1) {
          array[k] = L[i];
          bars[k].style.height = `${array[k] * 2}px`;
          await new Promise((resolve) => setTimeout(resolve, 100));
          i++;
          k++;
      }

      while (j < n2) {
          array[k] = R[j];
          bars[k].style.height = `${array[k] * 2}px`;
          await new Promise((resolve) => setTimeout(resolve, 100));
          j++;
          k++;
      }
  }

  async function mergeSortHelper(l, r) {
      if (l < r) {
          let m = l + Math.floor((r - l) / 2);
          await mergeSortHelper(l, m);
          await mergeSortHelper(m + 1, r);
          await merge(l, m, r);
      }
  }

  async function mergeSort() {
      await mergeSortHelper(0, array.length - 1);
  }

  //cocktail sort
  async function cocktailSort() {
      const bars = document.querySelectorAll(".array-bar");
      let swapped = true;
      let start = 0;
      let end = array.length;

      while (swapped) {
          swapped = false;

          for (let i = start; i < end - 1; i++) {
              if (array[i] > array[i + 1]) {
                  [array[i], array[i + 1]] = [array[i + 1], array[i]];
                  bars[i].style.height = `${array[i] * 2}px`;
                  bars[i + 1].style.height = `${array[i + 1] * 2}px`;
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  swapped = true;
              }
          }

          if (!swapped) {
              break;
          }

          swapped = false;
          end--;

          for (let i = end - 1; i >= start; i--) {
              if (array[i] > array[i + 1]) {
                  [array[i], array[i + 1]] = [array[i + 1], array[i]];
                  bars[i].style.height = `${array[i] * 2}px`;
                  bars[i + 1].style.height = `${array[i + 1] * 2}px`;
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  swapped = true;
              }
          }

          start++;
      }
  }

  //gnome sort
  async function gnomeSort() {
      const bars = document.querySelectorAll(".array-bar");
      let index = 0;

      while (index < array.length) {
          if (index === 0 || array[index] >= array[index - 1]) {
              index++;
          } else {
              [array[index], array[index - 1]] = [array[index - 1], array[index]];
              bars[index].style.height = `${array[index] * 2}px`;
              bars[index - 1].style.height = `${array[index - 1] * 2}px`;
              await new Promise((resolve) => setTimeout(resolve, 100));
              index--;
          }
      }
  }

  //quick sort
  async function partition(low, high) {
      const bars = document.querySelectorAll(".array-bar");
      let pivot = array[high];
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
          if (array[j] < pivot) {
              i++;
              [array[i], array[j]] = [array[j], array[i]];
              bars[i].style.height = `${array[i] * 2}px`;
              bars[j].style.height = `${array[j] * 2}px`;
              await new Promise((resolve) => setTimeout(resolve, 100));
          }
      }

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      bars[i + 1].style.height = `${array[i + 1] * 2}px`;
      bars[high].style.height = `${array[high] * 2}px`;
      await new Promise((resolve) => setTimeout(resolve, 100));

      return i + 1;
  }

  async function quickSortHelper(low, high) {
      if (low < high) {
          let pivotIndex = await partition(low, high);
          await quickSortHelper(low, pivotIndex - 1);
          await quickSortHelper(pivotIndex + 1, high);
      }
  }

  async function quickSort() {
      await quickSortHelper(0, array.length - 1);
  }

  function sort() {
    const algorithm = document.getElementById("algorithm").value;
  
    switch (algorithm) {
      case "bubble":
        bubbleSort();
        break;
      case "selection":
        selectionSort();
        break;
      case "insertion":
        insertionSort();
        break;
      case "heap":
        heapSort();
        break;
      case "merge":
        mergeSort();
        break;
      case "quick":
        quickSort();
        break;
      case "cocktail":
        cocktailSort();
        break;
      case "gnome":
        gnomeSort();
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Algo Visualizer</h1>
      </header>

      <main>
        <div className="control-panel">
          <button className="control-btn" onClick={newArray}>
            Generate New Array
          </button>
            {<select id="algorithm">
            <option value="bubble">Bubble Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="heap">Heap Sort</option>
            <option value="cocktail">Cocktail Sort</option>
            <option value="gnome">Gnome Sort</option>
          </select>}
          <button onClick={sort}>Sort</button>
        </div>

        <div className="array-container">
          {array.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{
                height: `${value * 2}px`,
              }}
            ></div>
          ))}
        </div>
      </main>
    </div>
  );
            };

export default SortingVisualizer;
