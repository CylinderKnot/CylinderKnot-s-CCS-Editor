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

const VISUAL_LAYERS = [
  'tiles',
  'rapids_paths',
  'rapids_paths_dispensers',
  'conveyor_belts',
  'conveyor_portals',
  'candies_blockers',
  'encasings',
  'order_locks',
  'order_locks_icons',
  'walls_up',
  'walls_down',
  'walls_left',
  'walls_right',
  'crystals',
  'portals',
  'exits',
  'dispensers',
  'dispensers_elements',
  'selection_image'
]

let currentLayer = 'tiles';
let layerOfCurrentlySelectedElement = 'tiles';

let currentDrawingMode = 'draw';

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
let dispensersElementsLayerContents = [[]];

let currentlySelectedElement = 'regular_tile';

let isMouseDown = false;

function initializeSelectedLayerRadio() {
  document.getElementById('selected_tiles').checked = true;
}

initializeSelectedLayerRadio();

function initializeDrawingMode() {
  document.getElementById('drawing-mode-draw').checked = true;
}

initializeDrawingMode();

function createNewBoard() {
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
  dispensersElementsLayerContents = initializeLayerDimensions(dispensersElementsLayerContents);

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
      if (i === 0) {
        dispensersLayerContents[i][j] = 'dispenser';
        // dispensersElements here
        dispensersElementsLayerContents[i][j] = [];
      } else {
        dispensersLayerContents[i][j] = 'empty';
        dispensersElementsLayerContents[i][j] = [];
      }
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
        image.src = `elements/candies_blockers/${candiesBlockersLayerContents[i][j]}.png`;
        rowCell.appendChild(image);
      }
      // encasings
      // order locks
      // walls
      // crystals
      // portals exits
      // dispensers
      if (dispensersLayerContents[i][j] !== 'empty') {
        let image = document.createElement('img');
        image.setAttribute('draggable', false);
        image.src = `elements/dispensers/${dispensersLayerContents[i][j]}.png`;
        image.classList.add('board-dispenser');
        rowCell.appendChild(image);


      }

      boardRow.appendChild(rowCell);
    }
  }
}

// more stuff here

function selectDrawingMode(object) {
  currentDrawingMode = object.getAttribute('value');
  console.log(`clicked radio to set current drawing mode to ${currentDrawingMode}`)
}

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

function updateDispenserElementSelection(object, element, layer) {
  if (object.classList.contains('dispenser-element-selected')) {
    object.classList.remove('dispenser-element-selected');
    console.log(`dispenser element ${element} no longer selected`);
  } else {
    object.classList.add('dispenser-element-selected');
    console.log(`selected dispenser element ${element}`);
  }
}

function updateTile(object) {
  let row = Number(object.getAttribute('pos-row'));
  let column = Number(object.getAttribute('pos-col'));

  if (currentDrawingMode === 'draw') {
    drawElement(row, column);
  }
  if (currentDrawingMode === 'delete') {
    deleteElement(row, column);
  }

  renderNewBoardFromLayers();
}

function drawElement(row, column) {
  if (currentLayer === 'tiles' && layerOfCurrentlySelectedElement === 'tiles') {
    tilesLayerContents[row][column] = currentlySelectedElement;
  }

  // rapids_paths: TODO

  // conveyor_belts: TODO
  
  if (currentLayer === 'candies_blockers' && layerOfCurrentlySelectedElement === 'candies_blockers') {
    // only add something if a tile is present
    if (tilesLayerContents[row][column] !== 'empty') {
      candiesBlockersLayerContents[row][column] = currentlySelectedElement;
    }
  }

  if (currentLayer === 'dispensers' && layerOfCurrentlySelectedElement === 'dispensers') {
    if (tilesLayerContents[row][column] !== 'empty') {
      dispensersLayerContents[row][column] = currentlySelectedElement;

      const selectedDispenserElements = document.querySelectorAll('.dispenser-element-selected');
      console.log(selectedDispenserElements.length);
      dispensersElementsLayerContents[row][column] = [];
      selectedDispenserElements.forEach(function(element) {
        console.log('ding');
        console.log(element.getAttribute('element'));
        dispensersElementsLayerContents[row][column].push(element.getAttribute('element'));
      });
    }
  }
}

function deleteElement(row, column) {
  // if you're deleting a tile, delete everything above it as well!
  if (currentLayer === 'tiles') {
    tilesLayerContents[row][column] = 'empty';
    candiesBlockersLayerContents[row][column] = 'empty';
    dispensersLayerContents[row][column] = 'empty';
    dispensersElementsLayerContents[row][column] = [];
  }

  // if you're deleting a candy or a blocker, keep the tile below. some encasings may have to be deleted
  if (currentLayer === 'candies_blockers') {
    candiesBlockersLayerContents[row][column] = 'empty';
  }

  // if you're deleting a dispenser, keep everything below. delete the spawn elements as well
  if (currentLayer === 'dispensers') {
    dispensersLayerContents[row][column] = 'empty';
    dispensersElementsLayerContents[row][column] = [];
  }
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

// Populate dispenser elements with images
document.querySelectorAll('.select-dispenser-element').forEach(function(element) {
  const elementName = element.getAttribute('element');
  const parent = element.parentElement;

  const button = document.createElement('button');
  button.setAttribute('element', elementName);
  const layer = element.getAttribute('gamelayer');

  let image = button.appendChild(document.createElement('img'));
  image.classList.add('selectionImage');
  image.src = `elements/${layer}/${elementName}.png`;

  // handle clicking on new elements
  button.setAttribute('onclick', `updateDispenserElementSelection(this, "${elementName}", "${layer}")`);

  element.remove();
  parent.appendChild(button);
});
