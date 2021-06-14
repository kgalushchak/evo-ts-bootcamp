const cellsCount = 100;
const windows: number[] = [];
const windowCount = 10;

const wallContainer = document.querySelector('.app');
const handEl = document.querySelector('.hand');
const scoreEl = document.querySelector('.counter');

export const renderGrid = (): void => {
  for (let i = 0; i < windowCount; i++) {
    const window = Math.floor(Math.random() * cellsCount);
    windows.push(window);
  }
  for (let i = 1; i <= cellsCount; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('style', `grid-area: ${i % 10 + 1} / ${Math.ceil(i / 10)} / ${i % 10 + 2} / ${Math.ceil(i / 10) + 1};`);
    if (windows.find(elem => elem === i)) {
      cell.classList.add('window');
    } else {
      cell.classList.add('wall');
    }
    wallContainer.appendChild(cell);
  }
};

export const showCat = (): void => {
  const windowsEl = document.querySelectorAll('.window');
  const catEl = document.querySelector('.cat');
  const catCell = Math.floor(Math.random() * windowsEl.length);
  if (catEl) {
    catEl.classList.add('window');
    catEl.classList.remove('cat');
  }
  windowsEl[catCell].classList.add('cat');
  windowsEl[catCell].classList.remove('window');
};

export const moveHand = (x: MouseEvent): void => handEl.setAttribute('style', `left: ${x.clientX - 30}px; top: ${x.clientY}px;`);

export const isOverlap = (): boolean => {
  const catEl = document.querySelector('.cat');
  const catRect = catEl.getBoundingClientRect();
  const handRect = handEl.getBoundingClientRect();

  return !(
    catRect.top >= handRect.bottom ||
    catRect.right <= handRect.left ||
    catRect.bottom <= handRect.top ||
    catRect.left >= handRect.right);
};

export const countScore = (): void => {
  if (isOverlap()) {
    const currentScore = parseInt(scoreEl.textContent);
    scoreEl.textContent = (currentScore + 1).toString();
  }
};
