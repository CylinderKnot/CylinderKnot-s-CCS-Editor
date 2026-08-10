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
  "portals",
  "ingredient_exits",
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
  'ingredientexits',
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
let portalsLayerContents = [[]];
let ingredientExitsLayerContents = [[]];
let dispensersLayerContents = [[]];
let dispensersElementsLayerContents = [[]];

let currentlySelectedElement = 'regular_tile';

let isMouseDown = false;

let gameMode = "Classic moves";

let preferredColors = [0, 1, 2, 3, 4];

const orderCodes = {
  '1': 'Red candies',
  '2': 'Blue candies',
  '3': 'Yellow candies',
  '4': 'Orange candies',
  '5': 'Purple candies',
  '6': 'Green candies',
  '7': 'Wrapped candies',
  '8': 'Striped candies',
  '9': 'Color bombs',
  '10': 'Striped + striped',
  '11': 'Striped + wrapped',
  '12': 'Striped + color bomb',
  '13': 'Color bomb + color bomb',
  '14': 'Wrapped + color bomb',
  '15': 'Wrapped + wrapped',
  '16': 'Chocolate squares',
  '17': 'Frosting layers',
  '18': 'Licorice shells',
  '19': 'Licorice swirls',
  '20': 'Bombs',
  '21': 'Jelly fish',
  '22': 'Cake bombs',
  '23': 'Mystery candies',
  '24': 'Magic mixers',
  '25': 'Toffee swirls',
  '26': 'Dark chocolate squares',
  '27': 'Candy cane curl layers',
  '28': 'Crystal candy layers',
  '29': 'Rainbow twist layers',
  '30': 'Frog uses',
  '31': 'Sugar coat layers',
  '32': 'Bubblegum pop layers',
  '33': 'Licorice curl layers',
  '34': 'Sour skull hits',
  '35': 'Bonbon blitz charges',
  '36': 'Jelly jars',
  '37': 'Candy cobras',
  '38': 'Wonderful wrappers',
  '39': 'Gumballs',
  '40': 'Mall-o-matics',
  '41': 'Citrus chew hits',
  '42': 'Color cluster hits'
};

const ingredients = ['Hazelnuts', 'Cherries'];

function initializeSelectedLayerRadio() {
  document.getElementById('selected_tiles').checked = true;
}

initializeSelectedLayerRadio();

function initializeDrawingMode() {
  document.getElementById('drawing-mode-draw').checked = true;
}

initializeDrawingMode();

function initializeGameMode() {
  document.getElementById('game-mode-moves-option').checked = true;
}

initializeGameMode();

function initializeMovesAndTime() {
  document.getElementById('number-of-moves').value = '';
  document.getElementById('amount-of-time').value = '';
}

initializeMovesAndTime();

function initializeTargetScores() {
  document.getElementById('1-star-score').value = '';
  document.getElementById('2-star-score').value = '';
  document.getElementById('3-star-score').value = '';
}

initializeTargetScores();

function initializeAllowStartingBoosters() {
  document.getElementById('allow-starting-boosters').checked = true;
}

initializeAllowStartingBoosters();

function initializeOrderRequirementDropdowns() {
  let orderDropdowns = document.querySelectorAll('.order-requirement-dropdown');
  for (let i = 0; i < orderDropdowns.length; i++) {
    Object.keys(orderCodes).forEach(function(key) {
      let option = document.createElement('option');
      option.value = key;
      option.innerHTML = orderCodes[key];
      orderDropdowns[i].appendChild(option);
    })
  }
}

initializeOrderRequirementDropdowns();

function initializeOrderRequirementAmounts() {
  let orderRequirements = document.querySelectorAll('.order-requirement-amount');
  for (let i = 0; i < orderRequirements.length; i++) {
    orderRequirements[i].value = '0';
  }
}

initializeOrderRequirementAmounts();

function initializeIngredientRequirementDropdowns() {
  let ingredientDropdowns = document.querySelectorAll('.ingredient-requirement-dropdown');
  for (let i = 0; i < ingredientDropdowns.length; i++) {
    ingredients.forEach(function(ingredient) {
      let option = document.createElement('option');
      option.value = ingredient;
      option.innerHTML = ingredient;
      ingredientDropdowns[i].appendChild(option);
    })
  }
}

initializeIngredientRequirementDropdowns();

function initializeIngredientRequirementAmounts() {
  let ingredientRequirements = document.querySelectorAll('.ingredient-requirement-amount');
  for (let i = 0; i < ingredientRequirements.length; i++) {
    ingredientRequirements[i].value = '0';
  }
}

initializeIngredientRequirementAmounts();

function initializeElementInformationInputs() {
  let spawnInformationInputs = document.querySelectorAll('.spawn-information-input');
  for (let i = 0; i < spawnInformationInputs.length; i++) {
    spawnInformationInputs[i].value = '';
  }
}

initializeElementInformationInputs();

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
  portalsLayerContents = initializeLayerDimensions(portalsLayerContents);
  ingredientExitsLayerContents = initializeLayerDimensions(ingredientExitsLayerContents);
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
      portalsLayerContents[i][j] = 'empty';
      ingredientExitsLayerContents[i][j] = 'empty';
      dispensersLayerContents[i][j] = 'empty';
      dispensersElementsLayerContents[i][j] = [];
      if (i === 0) {
        dispensersLayerContents[i][j] = 'dispenser';
        dispensersElementsLayerContents[i][j].push('dispenser_candy_spawn');
      } else {
        dispensersLayerContents[i][j] = 'empty';
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
      if (document.getElementById('visible_tiles').checked && tilesLayerContents[i][j] !== 'empty') {
        let image = document.createElement('img');
        image.setAttribute('draggable', false);
        image.src = `elements/tiles/${tilesLayerContents[i][j]}.png`;
        rowCell.appendChild(image);
      }
      // rapids paths, TODO
      // conveyors belts, TODO
      // candies blockers
      if (document.getElementById('visible_candies_blockers').checked && candiesBlockersLayerContents[i][j] !== 'empty') {
        let image = document.createElement('img');
        image.setAttribute('draggable', false);
        image.src = `elements/candies_blockers/${candiesBlockersLayerContents[i][j]}.png`;
        rowCell.appendChild(image);
      }
      // encasings
      // order locks
      // walls
      // crystals
      // portals
      // exits
      if (document.getElementById('visible_ingredient_exits').checked && ingredientExitsLayerContents[i][j] !== 'empty') {
        let image = document.createElement('img');
        image.setAttribute('draggable', false);
        image.src = `elements/ingredient_exits/${ingredientExitsLayerContents[i][j]}.png`;
        image.classList.add('ingredient-exit');
        rowCell.appendChild(image);
      }

      // dispensers
      if (document.getElementById('visible_dispensers').checked && dispensersLayerContents[i][j] !== 'empty') {
        let image = document.createElement('img');
        image.setAttribute('draggable', false);
        image.src = `elements/dispensers/${dispensersLayerContents[i][j]}.png`;
        image.classList.add('board-dispenser');
        rowCell.appendChild(image);

        let dispenserElementsContainer = rowCell.appendChild(document.createElement('div'));
        dispenserElementsContainer.classList.add('board-dispenser-elements-container');

        for (let k = 0; k < dispensersElementsLayerContents[i][j].length; k++) {
          let dispenserElementImage = document.createElement('img');
          dispenserElementImage.setAttribute('draggable', false);
          dispenserElementImage.src = `elements/dispensers/${dispensersElementsLayerContents[i][j][k]}.png`;
          dispenserElementImage.classList.add('board-dispenser-element');
          dispenserElementsContainer.appendChild(dispenserElementImage);
        }
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

function updateLayerVisibilities() {
  renderNewBoardFromLayers();
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
  } else {
    object.classList.add('dispenser-element-selected');
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
  if (currentLayer === 'tiles' && layerOfCurrentlySelectedElement === 'tiles' && document.getElementById('visible_tiles').checked) {
    tilesLayerContents[row][column] = currentlySelectedElement;
  }

  // rapids_paths: TODO

  // conveyor_belts: TODO
  
  if (currentLayer === 'candies_blockers' && layerOfCurrentlySelectedElement === 'candies_blockers' && document.getElementById('visible_candies_blockers').checked) {
    // only add something if a tile is present
    if (tilesLayerContents[row][column] !== 'empty') {
      candiesBlockersLayerContents[row][column] = currentlySelectedElement;
    }
  }

  if (currentLayer === 'ingredient_exits' && layerOfCurrentlySelectedElement === 'ingredient_exits' && document.getElementById('visible_ingredient_exits').checked) {
    if (tilesLayerContents[row][column] !== 'empty') {
      ingredientExitsLayerContents[row][column] = currentlySelectedElement;
    }
  }

  if (currentLayer === 'dispensers' && layerOfCurrentlySelectedElement === 'dispensers' && document.getElementById('visible_dispensers')) {
    if (tilesLayerContents[row][column] !== 'empty') {
      dispensersLayerContents[row][column] = currentlySelectedElement;

      const selectedDispenserElements = document.querySelectorAll('.dispenser-element-selected');
      dispensersElementsLayerContents[row][column] = [];
      selectedDispenserElements.forEach(function(element) {
        dispensersElementsLayerContents[row][column].push(element.getAttribute('element'));
      });
    }
  }
}

function deleteElement(row, column) {
  // if you're deleting a tile, delete everything above it as well!
  if (currentLayer === 'tiles' && document.getElementById('visible_tiles').checked) {
    tilesLayerContents[row][column] = 'empty';
    candiesBlockersLayerContents[row][column] = 'empty';
    ingredientExitsLayerContents[row][column] = 'empty';
    dispensersLayerContents[row][column] = 'empty';
    dispensersElementsLayerContents[row][column] = [];
  }

  // if you're deleting a candy or a blocker, keep the tile below. some encasings may have to be deleted
  if (currentLayer === 'candies_blockers' && document.getElementById('visible_candies_blockers').checked) {
    candiesBlockersLayerContents[row][column] = 'empty';
  }

  // if you're deleting an ingredient exit, delete only the ingredient exit
  if (currentLayer === 'ingredient_exits' && document.getElementById('visible_ingredient_exits').checked) {
    ingredientExitsLayerContents[row][column] = 'empty';
  }

  // if you're deleting a dispenser, keep everything below. delete the spawn elements as well
  if (currentLayer === 'dispensers' && document.getElementById('visible_dispensers').checked) {
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

function selectGameMode() {
  gameMode = document.querySelector('input[name="game-mode"]:checked').getAttribute('value');
  console.log(`game mode is now ${gameMode}`);

  if (gameMode === 'Classic' || gameMode === 'Jelly Time') {
    document.getElementById('config-panel-number-of-moves').style.display = 'none';
    document.getElementById('config-panel-amount-of-time').style.display = '';
  } else {
    document.getElementById('config-panel-number-of-moves').style.display = '';
    document.getElementById('config-panel-amount-of-time').style.display = 'none';
  }

  updateRequirementsSections();
}

function togglePreferredColor(object) {
  const colorNumber = Number(object.getAttribute('value'));

  if (!preferredColors.includes(colorNumber)) {
    if (!object.classList.contains('preferred-color-selected')) {
      object.classList.add('preferred-color-selected');
    }

    preferredColors.push(colorNumber);
  } else {
    object.classList.remove('preferred-color-selected');
    preferredColors.splice(preferredColors.indexOf(colorNumber), 1);
  }
}

function updateRequirementsSections() {
  const hasOrderRequirements = ['Order', 'Jelly Order', 'Order Drop Down', 'Rainbow Rapids Order'];
  const hasIngredientRequirements = ['Drop down', 'Jelly Drop down', 'Order Drop Down', 'Rainbow Rapids Drop Down'];

  document.getElementById('config-panel-no-requirements').style.display = '';
  document.getElementById('config-panel-orders-requirements').style.display = 'none';
  document.getElementById('config-panel-ingredients-requirements').style.display = 'none';
  
  if (hasOrderRequirements.includes(gameMode)) {
    document.getElementById('config-panel-no-requirements').style.display = 'none';
    document.getElementById('config-panel-orders-requirements').style.display = '';
  }
  if (hasIngredientRequirements.includes(gameMode)) {
    document.getElementById('config-panel-no-requirements').style.display = 'none';
    document.getElementById('config-panel-ingredients-requirements').style.display = '';
  }
}
