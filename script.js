// bunch of consts up here
const DEFAULT_BOARD_ROWS = 9;
const DEFAULT_BOARD_COLUMNS = 9;

const currentBoardRows = DEFAULT_BOARD_ROWS;
const currentBoardColumns = DEFAULT_BOARD_COLUMNS;

const BOARD_LAYERS = [
  "tiles",
  "rapids_paths",
  "conveyor_belts",
  "candies_blockers",
  "encasings",
  "order_locks",
  "walls",
  "crystals",
  "portals_exits",
  "dispensers",
  "selection_image"
];

let currentLayer = 'tiles';
let layerOfCurrentlySelectedElement = 'tiles';

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

let currentlySelectedElement = 'regular_tile';

let isMouseDown = false;

function initializeSelectedLayerRadio() {
  document.getElementById('selected_tiles').checked = true;
}

initializeSelectedLayerRadio();

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
      rapidsPathsLayerContents[i][j] = 'empty';
      conveyorBeltsLayerContents[i][j] = 'empty';
      candiesBlockersLayerContents[i][j] = 'candy_random';
      encasingsLayerContents[i][j] = 'empty';
      orderLocksLayerContents[i][j] = 'empty';
      wallsLayerContents[i][j] = 'empty';
      crystalsLayerContents[i][j] = 'empty';
      portalsExitsLayerContents[i][j] = 'empty';
      dispensersLayerContents[i][j] = 'empty';
    }
  }

  renderNewBoardFromLayers();
}

createNewBoard();

document.addEventListener('mouseup', function() {
  isMouseDown = false;
}, true);

function initializeLayerDimensions(array) {
  array = [...Array(currentBoardRows)].map(e => Array(currentBoardColumns));
  return array;
}

function renderNewBoardFromLayers() {
  // Get board table element
  let boardTable = document.getElementById('board');
  boardTable.innerHTML = "";

  // Add rows and columns to board table
  for (let i = 0; i < currentBoardRows; i++) {
    let boardRow = document.createElement('tr');
    boardTable.appendChild(boardRow);

    for (let j = 0; j < currentBoardColumns; j++) {
      let rowCell = document.createElement('td');
      rowCell.setAttribute("pos-row", i);
      rowCell.setAttribute("pos-col", j);

      // handle mouse-over of tile
      rowCell.onmouseover = function(event) {
        event.preventDefault();
        if (isMouseDown) {
          updateTile(this);
        }
      }

      // allow for updating tile
      rowCell.onmousedown = function(event) {
        event.preventDefault();
        if (event.button === 0) {
          event.preventDefault();
          isMouseDown = true;
          updateTile(this);
        }
      }

      // handle mouse-away from tile
      rowCell.onmouseout = function(event) {
        event.preventDefault();
        try {

        } catch {

        }
      }

      // tiles
      if (tilesLayerContents[i][j] !== 'empty') {
        let image = document.createElement('img');
        image.setAttribute('draggable', false);
        image.src = `elements/tiles/${tilesLayerContents[i][j]}.png`;
        rowCell.appendChild(image);
      }
      // rapids paths, TODO
      // conveyors belts, TODO
      // candies blockers
      if (candiesBlockersLayerContents[i][j] !== 'empty') {
        let image = document.createElement('img');
        image.setAttribute('draggable', false);
        image.src = `elements/candies_blockers/${candiesBlockersLayerContents[i][j]}.png`
        rowCell.appendChild(image);
      } 

      boardRow.appendChild(rowCell);
    }
  }
}

// more stuff here

function selectLayerViaRadio(object) {
  currentLayer = object.getAttribute('value');
  console.log(`clicked radio to set current layer to ${currentLayer}`);
}

function toggleDropdown(object) {
  let dropdownButtonId = object.getAttribute("associd");
  let dropdownContents = document.getElementById(dropdownButtonId);

  if (dropdownContents.style.display === "none") {
    dropdownContents.style.display = "";
  } else {
    dropdownContents.style.display = "none";
  }
}

function updateSelection(object, element, layer) {
  try {
    document.querySelector(".element-selected").classList.remove("element-selected");
  } catch {

  }

  // set current element
  object.classList.add("element-selected");
  currentlySelectedElement = element;
  console.log(`current element is ${currentlySelectedElement}`);

  // set current layer
  let layerRadio = document.getElementById(`selected_${layer}`);
  layerRadio.checked = true;
  currentLayer = layer;
  layerOfCurrentlySelectedElement = layer;
  console.log(`current layer is ${currentLayer}`);
  console.log(`layer of currently selected element is ${layerOfCurrentlySelectedElement}`)

  // enable current layer's visibility if it's disabled
}

function updateTile(object) {
  let row = Number(object.getAttribute('pos-row'));
  let column = Number(object.getAttribute('pos-col'));

  if (currentLayer === 'tiles' && layerOfCurrentlySelectedElement === 'tiles') {
    tilesLayerContents[row][column] = currentlySelectedElement;
  }
  // rapids_paths: TODO
  // conveyor_belts: TODO
  if (currentLayer === 'candies_blockers' && layerOfCurrentlySelectedElement === 'candies_blockers') {
    candiesBlockersLayerContents[row][column] = currentlySelectedElement;
  }

  renderNewBoardFromLayers();
}

// Populate each layers dropdown with images
document.querySelectorAll(".select-element").forEach(function(element) {
  const elementName = element.getAttribute('element');
  const parent = element.parentElement;

  const button = document.createElement('button');
  const layer = element.getAttribute('gamelayer');

  let image = button.appendChild(document.createElement('img'));
  image.classList.add('selectionImage');
  image.src = `elements/${layer}/${elementName}.png`;

  // handle clicking on new elements...
  button.setAttribute('onclick', `updateSelection(this, \"${elementName}\", \"${layer}\")`);

  element.remove();
  parent.appendChild(button);
});
