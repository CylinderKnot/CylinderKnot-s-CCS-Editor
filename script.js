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
  'ingredient_exits',
  'dispensers',
  'dispensers_elements',
  'selection_image'
];

const SUGAR_COATABLE = [
  'candy_random', 'candy_blue', 'candy_green', 'candy_orange', 'candy_purple', 'candy_red', 'candy_yellow',
  'striped_horizontal_random', 'striped_horizontal_blue', 'striped_horizontal_green', 'striped_horizontal_orange', 'striped_horizontal_purple', 'striped_horizontal_red', 'striped_horizontal_yellow',
  'striped_vertical_random', 'striped_vertical_blue', 'striped_vertical_green', 'striped_vertical_orange', 'striped_vertical_purple', 'striped_vertical_red', 'striped_vertical_yellow',
  'wrapped_random', 'wrapped_blue', 'wrapped_green', 'wrapped_orange', 'wrapped_purple', 'wrapped_red', 'wrapped_yellow',
  'bomb_random', 'bomb_blue', 'bomb_green', 'bomb_orange', 'bomb_purple', 'bomb_red', 'bomb_yellow',
  'key_random', 'key_blue', 'key_green', 'key_orange', 'key_purple', 'key_red', 'key_yellow',
  'lucky_candy_random', 'lucky_candy_blue', 'lucky_candy_green', 'lucky_candy_orange', 'lucky_candy_purple', 'lucky_candy_red', 'lucky_candy_yellow',
  'jelly_fish_random', 'jelly_fish_blue', 'jelly_fish_green', 'jelly_fish_orange', 'jelly_fish_purple', 'jelly_fish_red', 'jelly_fish_yellow',
  'jelly_fish_striped_random', 'jelly_fish_striped_blue', 'jelly_fish_striped_green', 'jelly_fish_striped_orange', 'jelly_fish_striped_purple', 'jelly_fish_striped_red', 'jelly_fish_striped_yellow',
  'jelly_fish_wrapped_random', 'jelly_fish_wrapped_blue', 'jelly_fish_wrapped_green', 'jelly_fish_wrapped_orange', 'jelly_fish_wrapped_purple', 'jelly_fish_wrapped_red', 'jelly_fish_wrapped_yellow',
  'jelly_fish_color_bomb_random', 'jelly_fish_color_bomb_blue', 'jelly_fish_color_bomb_green', 'jelly_fish_color_bomb_orange', 'jelly_fish_color_bomb_purple', 'jelly_fish_color_bomb_red', 'jelly_fish_color_bomb_yellow',
  'color_bomb',
  'coconut_wheel',
  'ufo',
  'hazelnut',
  'cherry',
  'licorice_swirl',
  'toffee_swirl_1',
  'toffee_swirl_2',
  'toffee_swirl_3',
  'toffee_swirl_4',
  'toffee_swirl_5',
];

let currentLayer = 'tiles';
let layerOfCurrentlySelectedElement = 'tiles';

let currentDrawingMode = 'draw';
let lockDrawing = false;

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

let portalPaths = [];
let placedPortalEntranceOnly = false;

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
      portalsLayerContents[i][j] = ['empty', 'empty'];
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
  lockDrawing = false;
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
        } else {
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
      if (document.getElementById('visible_encasings').checked && encasingsLayerContents[i][j] !== 'empty') {
        let image = document.createElement('img');
        image.setAttribute('draggable', false);
        image.src = `elements/encasings/${encasingsLayerContents[i][j]}.png`;
        rowCell.appendChild(image);
      }
      // order locks
      // walls
      // crystals
      // portals
      if (document.getElementById('visible_portals').checked) {
        for (let k = 0; k < portalsLayerContents[i][j].length; k++) {
          if (portalsLayerContents[i][j][k] !== 'empty') {
            let image = document.createElement('img');
            image.setAttribute('draggable', false);
            image.src = `elements/portals/${portalsLayerContents[i][j][k]}.png`;

            if (portalsLayerContents[i][j][k] === 'portal_entrance') {
              image.classList.add('portal-entrance');
            } else if (portalsLayerContents[i][j][k] === 'portal_exit') {
              image.classList.add('portal-exit');
            }

            rowCell.appendChild(image);
          }
        }
      }

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

  if (currentDrawingMode !== 'draw') {
    deleteIncompletePortalsAndRestartPortalDrawing();
  }

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

  let largeBlockersHelpText = document.getElementById('large-blockers-help-text');

  if (element === 'cake_bomb_ui') {
    largeBlockersHelpText.innerText = '^ To draw a cake bomb, click where its upper-left corner will be.'
  } else {
    largeBlockersHelpText.innerText = '';
  }

  let portalsHelpText = document.getElementById('portals-help-text');

  if (element === 'portal_entrance') {
    portalsHelpText.innerText = '^ Click the board where you want the entrance to be.'
  } else {
    deleteIncompletePortalsAndRestartPortalDrawing();
    portalsHelpText.innerText = '';
  }

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
    drawTileAt(row, column);
  }

  // rapids_paths: TODO

  // conveyor_belts: TODO
  
  if (currentLayer === 'candies_blockers' && layerOfCurrentlySelectedElement === 'candies_blockers' && document.getElementById('visible_candies_blockers').checked) {
    drawCandyOrBlockerAt(row, column);
  }

  if (currentLayer === 'encasings' && layerOfCurrentlySelectedElement === 'encasings' && document.getElementById('visible_encasings').checked) {
    drawEncasingAt(row, column);
  }

  if (currentLayer === 'portals' && layerOfCurrentlySelectedElement === 'portals' && document.getElementById('visible_portals').checked) {
    drawPortalAt(row, column);
  }

  if (currentLayer === 'ingredient_exits' && layerOfCurrentlySelectedElement === 'ingredient_exits' && document.getElementById('visible_ingredient_exits').checked) {
    drawIngredientExitAt(row, column);
  }

  if (currentLayer === 'dispensers' && layerOfCurrentlySelectedElement === 'dispensers' && document.getElementById('visible_dispensers')) {
    drawDispenserAt(row, column);
  }
}

function drawTileAt(row, column) {
  tilesLayerContents[row][column] = currentlySelectedElement;
}

function drawCandyOrBlockerAt(row, column) {
  // only add something if a tile is present
  if (tilesLayerContents[row][column] !== 'empty') {
    const colorsToPaint = ['candy_random_ui', 'candy_blue', 'candy_green', 'candy_orange', 'candy_purple', 'candy_red', 'candy_yellow'];
    
    // we're doing color painting
    if (colorsToPaint.includes(currentlySelectedElement)) {
      const colorableElementPrefixes = ['candy_', 'striped_horizontal_', 'striped_vertical_', 'wrapped_', 'bomb_', 'key_', 'lucky_candy_', 'jelly_fish_', 'jelly_fish_striped_', 'jelly_fish_wrapped_', 'jelly_fish_color_bomb_'];
      
      let isElementColorable = false;
      for (let i = 0; i < colorableElementPrefixes.length; i++) {
        if (candiesBlockersLayerContents[row][column].indexOf(colorableElementPrefixes[i]) === 0) {
          isElementColorable = true;
        }
      }

      if (isElementColorable) {
        // get color after last underscore of selected color
        let colorToSet = currentlySelectedElement.split('_').pop();
        if (colorToSet === 'ui') {
          colorToSet = 'random';
        }

        // replace
        let currentCandy = candiesBlockersLayerContents[row][column];
        let currentCandyArray = currentCandy.split('_');
        currentCandyArray[currentCandyArray.length - 1] = colorToSet;
        let newCandy = currentCandyArray.join('_');
        candiesBlockersLayerContents[row][column] = newCandy;
      }

    } else { // we're doing regular drawing
      // multi-tile blockers: delete them first
      if (candiesBlockersLayerContents[row][column].includes('cake_bomb_')) {
        deleteCandyOrBlockerAt(row, column);
      }

      candiesBlockersLayerContents[row][column] = currentlySelectedElement;

      // however, if sugar coats are present, remove them if a blocker cannot be sugar coated
      if (!SUGAR_COATABLE.includes(currentlySelectedElement) && encasingsLayerContents[row][column].includes('sugar_coat_')) {
        deleteEncasingAt(row, column);
      }

      if (currentlySelectedElement === 'cake_bomb_ui') {
        if (row < currentBoardRows && column < currentBoardColumns) {
          deleteCandyOrBlockerAt(row, column);
          deleteCandyOrBlockerAt(row, column + 1);
          deleteCandyOrBlockerAt(row + 1, column);
          deleteCandyOrBlockerAt(row + 1, column + 1);
          candiesBlockersLayerContents[row][column] = 'cake_bomb_top_left';
          candiesBlockersLayerContents[row][column + 1] = 'cake_bomb_top_right';
          candiesBlockersLayerContents[row + 1][column] = 'cake_bomb_bottom_left';
          candiesBlockersLayerContents[row + 1][column + 1] = 'cake_bomb_bottom_right';
        }
      }
    }
  }
}

function drawEncasingAt(row, column) {
  // only add something if a tile is present
  if (tilesLayerContents[row][column] !== 'empty') {
    // sugar coat not selected? just add it
    if (!currentlySelectedElement.includes('sugar_coat_')) {
      encasingsLayerContents[row][column] = currentlySelectedElement;
    } else {
      // if sugar coat is selected:
      if (SUGAR_COATABLE.includes(candiesBlockersLayerContents[row][column])) {
        encasingsLayerContents[row][column] = currentlySelectedElement;
      }
    }
  }
}

function drawPortalAt(row, column) {
  // only add something if a tile is present
  if (tilesLayerContents[row][column] !== 'empty' && lockDrawing === false) {
    lockDrawing = true;

    if (!placedPortalEntranceOnly) {
      console.log(`placing portal entrance at ${row}, ${column}`)
      drawPortalEntranceAt(row, column);
    } else {
      console.log(`placing portal exit at ${row}, ${column}`)
      drawPortalExitAt(row, column);
    }
  }
}

function drawPortalEntranceAt(row, column) {
  placedPortalEntranceOnly = true;

  // delete the portal by entrance that already exists
  if (portalsLayerContents[row][column][0] === 'portal_entrance') {
    deletePortalByEntrance(row, column);
  }

  portalsLayerContents[row][column][0] = currentlySelectedElement;
  portalPaths.push([]);
  portalPaths[portalPaths.length - 1].push([row, column, 14]);

  let portalsHelpText = document.getElementById('portals-help-text');
  portalsHelpText.innerText = '^ Click the board where you want the exit to be.';
}

function drawPortalExitAt(row, column) {
  placedPortalEntranceOnly = false;

  // delete the portal by exit that already exists
  if (portalsLayerContents[row][column][1] === 'portal_exit') {
    deletePortalByExit(row, column);
  }

  portalsLayerContents[row][column][1] = 'portal_exit';
  portalPaths[portalPaths.length - 1].push([row, column, 14]);

  let portalsHelpText = document.getElementById('portals-help-text');
  portalsHelpText.innerText = '^ Click the board where you want the entrance to be.';
}

function drawIngredientExitAt(row, column) {
  // only add something if a tile is present
  if (tilesLayerContents[row][column] !== 'empty') {
    ingredientExitsLayerContents[row][column] = currentlySelectedElement;
  }
}

function drawDispenserAt(row, column) {
  // only add something if a tile is present
  if (tilesLayerContents[row][column] !== 'empty') {
    dispensersLayerContents[row][column] = currentlySelectedElement;

    const selectedDispenserElements = document.querySelectorAll('.dispenser-element-selected');
    dispensersElementsLayerContents[row][column] = [];
    selectedDispenserElements.forEach(function(element) {
      dispensersElementsLayerContents[row][column].push(element.getAttribute('element'));
    });
  }
}

function deleteElement(row, column) {
  if (currentLayer === 'tiles' && document.getElementById('visible_tiles').checked) {
    deleteTileAt(row, column);
  }

  if (currentLayer === 'candies_blockers' && document.getElementById('visible_candies_blockers').checked) {
    deleteCandyOrBlockerAt(row, column);
  }

  if (currentLayer === 'encasings' && document.getElementById('visible_encasings').checked) {
    deleteEncasingAt(row, column);
  }

  if (currentLayer === 'portals' && document.getElementById('visible_portals').checked) {
    console.log('attempting to delete portals');
    deletePortalsAt(row, column);
  }

  if (currentLayer === 'ingredient_exits' && document.getElementById('visible_ingredient_exits').checked) {
    deleteIngredientExitAt(row, column);
  }

  if (currentLayer === 'dispensers' && document.getElementById('visible_dispensers').checked) {
    deleteDispenserAt(row, column);
  }
}

function deleteTileAt(row, column) {
  // delete everything above the tile as well!
  tilesLayerContents[row][column] = 'empty';
  deleteCandyOrBlockerAt(row, column);
  deleteEncasingAt(row, column);
  deletePortalsAt(row, column);
  deleteIngredientExitAt(row, column);
  deleteDispenserAt(row, column);
}

function deleteCandyOrBlockerAt(row, column) {
  // if we have a cake bomb:
  if (candiesBlockersLayerContents[row][column] === 'cake_bomb_top_left') {
    candiesBlockersLayerContents[row][column] = 'empty';
    candiesBlockersLayerContents[row][column + 1] = 'empty';
    candiesBlockersLayerContents[row + 1][column] = 'empty';
    candiesBlockersLayerContents[row + 1][column + 1] = 'empty';
  }
  if (candiesBlockersLayerContents[row][column] === 'cake_bomb_top_right') {
    candiesBlockersLayerContents[row][column - 1] = 'empty';
    candiesBlockersLayerContents[row][column] = 'empty';
    candiesBlockersLayerContents[row + 1][column - 1] = 'empty';
    candiesBlockersLayerContents[row + 1][column] = 'empty';
  }
  if (candiesBlockersLayerContents[row][column] === 'cake_bomb_bottom_left') {
    candiesBlockersLayerContents[row - 1][column] = 'empty';
    candiesBlockersLayerContents[row - 1][column + 1] = 'empty';
    candiesBlockersLayerContents[row][column] = 'empty';
    candiesBlockersLayerContents[row][column + 1] = 'empty';
  }
  if (candiesBlockersLayerContents[row][column] === 'cake_bomb_bottom_right') {
    candiesBlockersLayerContents[row - 1][column - 1] = 'empty';
    candiesBlockersLayerContents[row - 1][column] = 'empty';
    candiesBlockersLayerContents[row][column - 1] = 'empty';
    candiesBlockersLayerContents[row][column] = 'empty';
  }

  // delete only the candy or blocker
  candiesBlockersLayerContents[row][column] = 'empty';

  // however, if a sugar coat is present, delete it as well
  if (encasingsLayerContents[row][column].includes('sugar_coat_')) {
    deleteEncasingAt(row, column);
  }
}

function deleteEncasingAt(row, column) {
  // delete only the encasing
  encasingsLayerContents[row][column] = 'empty';
}

function deletePortalsAt(row, column) {
  if (portalsLayerContents[row][column][0] === 'portal_entrance') {
    console.log(`portal entrance at ${row}, ${column} - deleting...`)
    deletePortalByEntrance(row, column);
  }
  if (portalsLayerContents[row][column][1] === 'portal_exit') {
    console.log(`portal exit at ${row}, ${column} - deleting...`)
    deletePortalByExit(row, column);
  }
}

function deletePortalByEntrance(row, column) {
  for (let i = 0; i < portalPaths.length; i++) {
    const [currentRow, currentColumn, _] = portalPaths[i][0];

    if (currentRow === row && currentColumn === column) {
      const [correspondingExitRow, correspondingExitColumn, _] = portalPaths[i][1];

      portalsLayerContents[row][column][0] = 'empty';
      portalsLayerContents[correspondingExitRow][correspondingExitColumn][1] = 'empty';

      portalPaths.splice(i, 1);
    }
  }
}

function deletePortalByExit(row, column) {
  for (let i = 0; i < portalPaths.length; i++) {
    const [currentRow, currentColumn, _] = portalPaths[i][1];

    if (currentRow === row && currentColumn === column) {
      const [correspondingEntranceRow, correspondingEntranceColumn, _] = portalPaths[i][0];

      portalsLayerContents[row][column][1] = 'empty';
      portalsLayerContents[correspondingEntranceRow][correspondingEntranceColumn][0] = 'empty';

      portalPaths.splice(i, 1);
    }
  }
}

function deleteIncompletePortalsAndRestartPortalDrawing() {
  for (let i = 0; i < portalPaths.length; i++) {
    if (portalPaths[i].length === 0) {
      portalPaths.splice(i, 1);
    } else if (portalPaths[i].length === 1) {
      const [entranceRow, entranceColumn, _] = portalPaths[i][0];
      portalsLayerContents[entranceRow][entranceColumn][0] = 'empty';

      portalPaths.splice(i, 1);
    }
  }

  let portalsHelpText = document.getElementById('portals-help-text');

  if (currentLayer === 'portals') {
    portalsHelpText.innerText = '^ Click the board where you want the entrance to be.'
  } else {
    portalsHelpText.innerText = '';
  }

  placedPortalEntranceOnly = false;
  renderNewBoardFromLayers();
}

function deleteIngredientExitAt(row, column) {
  // delete only the ingredient exit
  ingredientExitsLayerContents[row][column] = 'empty';
}

function deleteDispenserAt(row, column) {
  // delete only the dispenser and its spawn elements
  dispensersLayerContents[row][column] = 'empty';
  dispensersElementsLayerContents[row][column] = [];
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

function exportLevel() {
  let levelArray = [];

  for (let i = 0; i < currentBoardRows; i++) {
    let rowArray = [];

    for (let j = 0; j < currentBoardColumns; j++) {
      rowArray[j] = '';

      // Tiles layer
      const tilesCodes = {
        'empty': '000',
        'regular_tile': '001',
        'jelly_1': '003',
        'jelly_2': '004',
        'blue_tile': '064',
        'black_tile': '065'
      };

      rowArray[j] += tilesCodes[tilesLayerContents[i][j]];

      // Rapids Paths layer

      // Candies and Blockers layer
      const candiesBlockersCodes = {
        'candy_random': '002', 'candy_blue': '002057', 'candy_green': '002058', 'candy_orange': '002059', 'candy_purple': '002060', 'candy_red': '002055', 'candy_yellow': '002056',
        'striped_horizontal_random': '045', 'striped_horizontal_blue': '045057', 'striped_horizontal_green': '045058', 'striped_horizontal_orange': '045059', 'striped_horizontal_purple': '045060', 'striped_horizontal_red': '045055', 'striped_horizontal_yellow': '045056',
        'striped_vertical_random': '046', 'striped_vertical_blue': '046057', 'striped_vertical_green': '046058', 'striped_vertical_orange': '046059', 'striped_vertical_purple': '046060', 'striped_vertical_red': '046055', 'striped_vertical_yellow': '046056',
        'wrapped_random': '047', 'wrapped_blue': '047057', 'wrapped_green': '047058', 'wrapped_orange': '047059', 'wrapped_purple': '047060', 'wrapped_red': '047055', 'wrapped_yellow': '047056',
        'bomb_random': '018', 'bomb_blue': '018057', 'bomb_green': '018058', 'bomb_orange': '018059', 'bomb_purple': '018060', 'bomb_red': '018055', 'bomb_yellow': '018056',
        'key_random': '051', 'key_blue': '051057', 'key_green': '051058', 'key_orange': '051059', 'key_purple': '051060', 'key_red': '051055', 'key_yellow': '051056',
        'lucky_candy_random': '052', 'lucky_candy_blue': '052057', 'lucky_candy_green': '052058', 'lucky_candy_orange': '052059', 'lucky_candy_purple': '052060', 'lucky_candy_red': '052055', 'lucky_candy_yellow': '052056',
        'jelly_fish_random': '049', 'jelly_fish_blue': '049057', 'jelly_fish_green': '049058', 'jelly_fish_orange': '049059', 'jelly_fish_purple': '049060', 'jelly_fish_red': '049055', 'jelly_fish_yellow': '049056',
        'jelly_fish_striped_random': '091', 'jelly_fish_striped_blue': '091057', 'jelly_fish_striped_green': '091058', 'jelly_fish_striped_orange': '091059', 'jelly_fish_striped_purple': '091060', 'jelly_fish_striped_red': '091055', 'jelly_fish_striped_yellow': '091056',
        'jelly_fish_wrapped_random': '092', 'jelly_fish_wrapped_blue': '092057', 'jelly_fish_wrapped_green': '092058', 'jelly_fish_wrapped_orange': '092059', 'jelly_fish_wrapped_purple': '092060', 'jelly_fish_wrapped_red': '092055', 'jelly_fish_wrapped_yellow': '092056',
        'jelly_fish_color_bomb_random': '093', 'jelly_fish_color_bomb_blue': '093057', 'jelly_fish_color_bomb_green': '093058', 'jelly_fish_color_bomb_orange': '093059', 'jelly_fish_color_bomb_purple': '093060', 'jelly_fish_color_bomb_red': '093055', 'jelly_fish_color_bomb_yellow': '093056',
        'color_bomb': '044',
        'coconut_wheel': '043',
        'ufo': '061',
        'hazelnut': '126',
        'cherry': '125',
        'frosting_1': '019', 'frosting_2': '020', 'frosting_3': '021', 'frosting_4': '022', 'frosting_5': '023',
        'bubblegum_pop_1': '159', 'bubblegum_pop_2': '160', 'bubblegum_pop_3': '161', 'bubblegum_pop_4': '162', 'bubblegum_pop_5': '163',
        'toffee_swirl_1': '079', 'toffee_swirl_2': '080', 'toffee_swirl_3': '081', 'toffee_swirl_4': '082', 'toffee_swirl_5': '083',
        'rainbow_twist_1': '129', 'rainbow_twist_2': '130', 'rainbow_twist_3': '131', 'rainbow_twist_4': '132', 'rainbow_twist_5': '133',
        'dark_chocolate_1': '094', 'dark_chocolate_2': '095', 'dark_chocolate_3': '096', 'dark_chocolate_4': '097', 'dark_chocolate_5': '098',
        'dark_chocolate_spawner_1': '211', 'dark_chocolate_spawner_2': '212', 'dark_chocolate_spawner_3': '213',
        'chocolate': '009',
        'chocolate_spawner': '024',
        'licorice_swirl': '017',
        'licorice_shell_1': '157', 'licorice_shell_2': '158', 'licorice_whell_3': '054',
        'jelly_jar_1': '220', 'jelly_jar_2': '221',
        'bobber': '066',
        'magic_mixer': '062',
        'gumball_machine': '230',
        'cake_bomb_top_left': '035', 'cake_bomb_top_right': '035', 'cake_bomb_bottom_left': '035', 'cake_bomb_bottom_right': '035',
        'bonbon_blitz_striped_horizontal_1': '186', 'bonbon_blitz_striped_horizontal_2': '187', 'bonbon_blitz_striped_horizontal_3': '188', 'bonbon_blitz_striped_horizontal_4': '189',
        'bonbon_blitz_striped_vertical_1': '190', 'bonbon_blitz_striped_vertical_2': '191', 'bonbon_blitz_striped_vertical_3': '192', 'bonbon_blitz_striped_vertical_4': '193',
        'bonbon_blitz_wrapped_1': '198', 'bonbon_blitz_wrapped_2': '199', 'bonbon_blitz_wrapped_3': '200', 'bonbon_blitz_wrapped_4': '201',
        'bonbon_blitz_jelly_fish_1': '194', 'bonbon_blitz_jelly_fish_2': '195', 'bonbon_blitz_jelly_fish_3': '196', 'bonbon_blitz_jelly_fish_4': '197',
        'bonbon_blitz_color_bomb_1': '182', 'bonbon_blitz_color_bomb_2': '183', 'bonbon_blitz_color_bomb_3': '184', 'bonbon_blitz_color_bomb_4': '185',
      };

      if (candiesBlockersLayerContents[i][j] !== 'empty') {
        rowArray[j] += candiesBlockersCodes[candiesBlockersLayerContents[i][j]];
      }

      // Encasings layer
      const encasingsCodes = {
        'licorice_lock': '008',
        'marmalade': '025',
        'sugar_chest_1': '038', 'sugar_chest_2': '039', 'sugar_chest_3': '040', 'sugar_chest_4': '041', 'sugar_chest_5': '042',
        'sugar_coat_1': '134', 'sugar_coat_2': '135', 'sugar_coat_3': '136'
      };

      if (encasingsLayerContents[i][j] !== 'empty') {
        rowArray[j] += encasingsCodes[encasingsLayerContents[i][j]];
      }

      // Walls layer

      // Crystals layer

      // Portals layer

      // Ingredient Exits layer
      const ingredientExitsCodes = {
        'ingredient_exit': '010'
      };

      if (ingredientExitsLayerContents[i][j] !== 'empty') {
        rowArray[j] += ingredientExitsCodes[ingredientExitsLayerContents[i][j]];
      }

      // Dispensers layer
      const dispensersCodes = {
        'dispenser': '005'
      };

      if (dispensersLayerContents[i][j] !== 'empty') {
        rowArray[j] += dispensersCodes[dispensersLayerContents[i][j]];
      }

      const dispensersElementsCodes = {
        'dispenser_candy_spawn': '026',
        'dispenser_striped_horizontal': '107',
        'dispenser_striped_vertical': '108',
        'dispenser_striped_either': '071',
        'dispenser_wrapped': '072',
        'dispenser_jelly_fish': '128',
        'dispenser_color_bomb': '127',
        'dispenser_lucky_candy': '068',
        'dispenser_time_candy': '069',
        'dispenser_key': '030',
        'dispenser_ingredient': '027',
        'dispenser_licorice_swirl': '028',
        'dispenser_bomb': '029',
        'dispenser_toffee_swirl': '090',
        'dispenser_sugar_coat': '137',
        'dispenser_blue': '214',
        'dispenser_green': '215',
        'dispenser_orange': '216',
        'dispenser_purple': '217',
        'dispenser_red': '218',
        'dispenser_yellow': '219'
      };

      if (dispensersElementsLayerContents[i][j] !== []) {
        for (let k = 0; k < dispensersElementsLayerContents[i][j].length; k++) {
          rowArray[j] += dispensersElementsCodes[dispensersElementsLayerContents[i][j][k]];
        }
      }

      // if a regular tile has anything, remove the regular tile code
      if (rowArray[j].includes(tilesCodes['regular_tile']) && rowArray[j].length > 3) {
        const start = rowArray[j].indexOf(tilesCodes['regular_tile']);
        rowArray[j] = rowArray[j].slice(0, start) + rowArray[j].slice(start + tilesCodes['regular_tile'].length);
      }
    }

    levelArray.push(rowArray);
  }

  let level = {};
  level['tileMap'] = levelArray;
  level['numberOfColours'] = preferredColors.length;
  level['preferredColors'] = preferredColors;
  level['colorWeightAdjustments'] = [0];
  level['disablePreLevelBoosters'] = !document.getElementById('allow-starting-boosters').checked;

  const star1 = Number(document.getElementById('1-star-score').value) || 1000;
  const star2 = Number(document.getElementById('2-star-score').value) || 2000;
  const star3 = Number(document.getElementById('3-star-score').value) || 3000;

  level['scoreTargets'] = [star1, star2, star3];

  level['protocolVersion'] = '0.3';
  level['randomSeed'] = 0;
  level['portals'] = [];
  level['gates'] = [];
  level['orlocks'] = [];
  level['skulls'] = [];

  if (gameMode === 'Classic' || gameMode === 'Jelly Time') {
    level['timeLimit'] = Number(document.getElementById('amount-of-time').value) || 30;
  } else {
    level['moveLimit'] = Number(document.getElementById('number-of-moves').value) || 20;
  }

  if (gameMode === 'Order' || gameMode === 'Jelly Order' || gameMode === 'Order Drop Down' || gameMode === 'Rainbow Rapids Order') {
    let orders = [];
    const orderDropdowns = document.querySelectorAll('.order-requirement-dropdown');

    for (let i = 0; i < orderDropdowns.length; i++) {
      let itemId = Number(orderDropdowns[i].value);
      let itemName = orderDropdowns[i].options[orderDropdowns[i].selectedIndex].text;

      if (itemName === 'none') {
        continue;
      } else {
        const amount = Number(document.getElementById(`order-amount-${i + 1}`).value) || 0;
        orders.push({"item": itemId, "quantity": amount});
      }
    }

    level['_itemsToOrder'] = orders;
  }

  if (gameMode === 'Drop down' || gameMode === 'Jelly Drop down' || gameMode === 'Order Drop Down' || gameMode === 'Rainbow Rapids Drop Down') {
    const hazelnutAmount = Number(document.getElementById('hazelnut-amount').value);
    const cherryAmount = Number(document.getElementById('cherry-amount').value);

    level['ingredients'] = [hazelnutAmount, cherryAmount];
  }

  level['gameModeName'] = gameMode;

  level['episodeId'] = 0;

  level['evilSpawnerAmount'] = 1;
  level['evilSpawnerElements'] = [0];
  level['evilSpawnerCount'] = 0;

  const stripedHorizontalMin = document.getElementById('striped-horizontal-spawn-minimum').value;
  if (stripedHorizontalMin !== '') {
    level['stripedRowCandyMax'] = Number(stripedHorizontalMin);
  }
  const stripedHorizontalInterval = document.getElementById('striped-horizontal-spawn-interval').value;
  if (stripedHorizontalInterval !== '') {
    level['stripedRowCandySpawn'] = Number(stripedHorizontalInterval);
  }

  const stripedVerticalMin = document.getElementById('striped-vertical-spawn-minimum').value;
  if (stripedVerticalMin !== '') {
    level['stripedColumnCandyMax'] = Number(stripedVerticalMin);
  }
  const stripedVerticalInterval = document.getElementById('striped-vertical-spawn-interval').value;
  if (stripedVerticalInterval !== '') {
    level['stripedColumnCandySpawn'] = Number(stripedVerticalInterval);
  }

  const stripedEitherMin = document.getElementById('striped-either-spawn-minimum').value;
  if (stripedEitherMin !== '') {
    level['stripedCandyMax'] = Number(stripedEitherMin);
  }
  const stripedEitherInterval = document.getElementById('striped-either-spawn-interval').value;
  if (stripedEitherInterval !== '') {
    level['stripedCandySpawn'] = Number(stripedEitherInterval);
  }

  const wrappedMin = document.getElementById('wrapped-spawn-minimum').value;
  if (wrappedMin !== '') {
    level['wrappedCandyMax'] = Number(wrappedMin);
  }
  const wrappedInterval = document.getElementById('wrapped-spawn-interval').value;
  if (wrappedInterval !== '') {
    level['wrappedCandySpawn'] = Number(wrappedInterval);
  }

  const jellyFishMin = document.getElementById('jelly-fish-spawn-minimum').value;
  if (jellyFishMin !== '') {
    level['fishMax'] = Number(jellyFishMin);
  }
  const jellyFishInterval = document.getElementById('jelly-fish-spawn-interval').value;
  if (jellyFishInterval !== '') {
    level['fishSpawn'] = Number(jellyFishInterval);
  }

  const colorBombMin = document.getElementById('color-bomb-spawn-minimum').value;
  if (colorBombMin !== '') {
    level['colorBombMax'] = Number(colorBombMin);
  }
  const colorBombInterval = document.getElementById('color-bomb-spawn-interval').value;
  if (colorBombInterval !== '') {
    level['colorBombSpawn'] = Number(colorBombInterval);
  }

  const luckyCandyMin = document.getElementById('lucky-candy-spawn-minimum').value;
  if (luckyCandyMin !== '') {
    level['luckyCandyMax'] = Number(luckyCandyMin);
  }
  const luckyCandyInterval = document.getElementById('lucky-candy-spawn-interval').value;
  if (luckyCandyInterval !== '') {
    level['luckyCandySpawn'] = Number(luckyCandyInterval);
  }

  const timeCandyMin = document.getElementById('time-candy-spawn-minimum').value;
  if (timeCandyMin !== '') {
    level['timeCandyMax'] = Number(timeCandyMin);
  }
  const timeCandyInterval = document.getElementById('time-candy-spawn-interval').value;
  if (timeCandyInterval !== '') {
    level['timeCandySpawn'] = Number(timeCandyInterval);
  }

  const keyMin = document.getElementById('key-spawn-minimum').value;
  if (keyMin !== '') {
    level['mulockCandyMax'] = Number(keyMin);
  }
  const keyInterval = document.getElementById('key-spawn-interval').value;
  if (keyInterval !== '') {
    level['mulockCandySpawn'] = Number(keyInterval);
  }

  const hasIngredientsGameMode = (gameMode === 'Drop down' || gameMode === 'Jelly Drop down' || gameMode === 'Order Drop Down' || gameMode === 'Rainbow Rapids Drop Down');

  const ingredientMin = document.getElementById('ingredient-spawn-minimum').value;
  if (hasIngredientsGameMode) {
    level['numIngredientsOnScreen'] = Number(ingredientMin) || 0;
  }
  const ingredientInterval = document.getElementById('ingredient-spawn-interval').value;
  if (hasIngredientsGameMode) {
    level['ingredientSpawnDensity'] = Number(ingredientInterval) || 0;
  }
  const ingredientMax = document.getElementById('ingredient-spawn-maximum').value;
  if (hasIngredientsGameMode) {
    level['maxNumIngredientsOnScreen'] = Number(ingredientMax) || 0;
  }

  const licoriceSwirlMin = document.getElementById('licorice-swirl-spawn-minimum').value;
  if (licoriceSwirlMin !== '') {
    level['licoriceMax'] = Number(licoriceSwirlMin);
  }
  const licoriceSwirlInterval = document.getElementById('licorice-swirl-spawn-interval').value;
  if (licoriceSwirlInterval !== '') {
    level['licoriceSpawn'] = Number(licoriceSwirlInterval);
  }

  const bombMin = document.getElementById('bomb-spawn-minimum').value;
  if (bombMin !== '') {
    level['pepperCandyMax'] = Number(bombMin);
  }
  const bombInterval = document.getElementById('bomb-spawn-interval').value;
  if (bombInterval !== '') {
    level['pepperCandySpawn'] = Number(bombInterval);
  }
  const bombDuration = document.getElementById('bomb-spawn-duration').value;
  if (bombDuration !== '') {
    level['pepperCandyExplosionTurns'] = Number(bombDuration);
  }

  const toffeeSwirlMin = document.getElementById('toffee-swirl-spawn-minimum').value;
  if (toffeeSwirlMin !== '') {
    level['fallingIcingMax'] = Number(toffeeSwirlMin);
  }
  const toffeeSwirlInterval = document.getElementById('toffee-swirl-spawn-interval').value;
  if (toffeeSwirlInterval !== '') {
    level['fallingIcingSpawn'] = Number(toffeeSwirlInterval);
  }
  const toffeeSwirlLayers = document.getElementById('toffee-swirl-spawn-layers').value;
  if (toffeeSwirlLayers !== '') {
    level['fallingIcingLevel'] = Number(toffeeSwirlLayers);
  }

  const sugarCoatMin = document.getElementById('sugar-coat-spawn-minimum').value;
  if (sugarCoatMin !== '') {
    level['shieldMax'] = Number(sugarCoatMin);
  }
  const sugarCoatInterval = document.getElementById('sugar-coat-spawn-interval').value;
  if (sugarCoatInterval !== '') {
    level['shieldSpawn'] = Number(sugarCoatInterval);
  }
  const sugarCoatLayers = document.getElementById('sugar-coat-spawn-layers').value;
  if (sugarCoatLayers !== '') {
    level['shieldLevel'] = Number(sugarCoatLayers);
  }

  return level;
}

function displayExportLevelPopup() {
  let level = exportLevel();
  document.getElementById('export-field').value = JSON.stringify(level);
  document.getElementById('export-menu').style.display = 'block';
}
