// bunch of consts up here
const DEFAULT_BOARD_ROWS = 9;
const DEFAULT_BOARD_COLUMNS = 9;

const currentBoardRows = DEFAULT_BOARD_ROWS;
const currentBoardColumns = DEFAULT_BOARD_COLUMNS;

const BOARD_LAYERS = [
  "tiles",
  "rapidsPaths",
  "conveyorBelts",
  "candiesBlockers",
  "encasings",
  "orderLocks",
  "walls",
  "crystals",
  "portalsExits",
  "dispensers",
  "selectionImage"
];

let tilesLayerContents = [[]];
let rapidsPathsLayerContents = [[]];
let conveyorBeltsLayerContents = [[]];
let candiesBlockersLayerContents = [[]];
let encasingsLayerContents = [[]];
let orderLocksLayerContents = [[]];
let wallsLayerContents = [[]];
let crystalsLayerContents = [[]];
let portalsExitsLayerContents = [[]];
let dispensersLayerContents = [[]];

function createNewBoard() {
  // tilesLayerContents = [...Array(currentBoardRows)].map(e => Array(currentBoardColumns));

  // Initialize layer dimensions
  tilesLayerContents = initializeLayerDimensions(tilesLayerContents);
  rapidsPathsLayerContents = initializeLayerDimensions(rapidsPathsLayerContents);
  conveyorBeltsLayerContents = initializeLayerDimensions(conveyorBeltsLayerContents);
  candiesBlockersLayerContents = initializeLayerDimensions(candiesBlockersLayerContents);
  encasingsLayerContents = initializeLayerDimensions(encasingsLayerContents);
  orderLocksLayerContents = initializeLayerDimensions(orderLocksLayerContents);
  wallsLayerContents = initializeLayerDimensions(wallsLayerContents);
  crystalsLayerContents = initializeLayerDimensions(crystalsLayerContents);
  portalsExitsLayerContents = initializeLayerDimensions(portalsExitsLayerContents);
  dispensersLayerContents = initializeLayerDimensions(dispensersLayerContents);

  // Populate layers with default elements
  for (let i = 0; i < currentBoardRows; i++) {
    for (let j = 0; j < currentBoardColumns; j++) {
      tilesLayerContents[i][j] = 'regular_tile';
      // TODO: candiesBlockersLayerContents and dispensersLayerContents
    }
  }

  // Get board table element
  let boardTable = document.getElementById('board');
  boardTable.innerHTML = "";

  // Add rows and columns to board table
  for (let i = 0; i < currentBoardRows; i++) {
    let boardRow = document.createElement('tr');
    boardTable.appendChild(boardRow);

    for (let j = 0; j < currentBoardColumns; j++) {
      let rowCell = document.createElement('td');

      // ...

      boardRow.appendChild(rowCell);
    }
  }

  // for (let i = 0; i < currentBoardRows; i++) {
  //   let row = document.createElement('tr');
  //   boardTable.appendChild(row);

  //   for (let j = 0; j < currentBoardColumns; j++) {
  //     let object = document.createElement('td');
  //     object.setAttribute('style', 'position: relative; left: 0; top: 0;');
  //     object.setAttribute('pos-row', i);
  //     object.setAttribute('pos-col', j);

  //     let image = document.createElement('img');
  //     image.setAttribute('draggable', false);
  //     image.src = 'elements/tiles/regular_tile.png';
  //     image.classList.remove('default');

  //     row.appendChild(object);
  //   }
  // }
}

createNewBoard();

function initializeLayerDimensions(array) {
  array = [...Array(currentBoardRows)].map(e => Array(currentBoardColumns));
  return array;
}

// more stuff here

function toggleDropdown(object) {
  let dropdownButtonId = object.getAttribute("associd");
  let dropdownContents = document.getElementById(dropdownButtonId);

  if (dropdownContents.style.display === "none") {
    dropdownContents.style.display = "";
  } else {
    dropdownContents.style.display = "none";
  }
}
