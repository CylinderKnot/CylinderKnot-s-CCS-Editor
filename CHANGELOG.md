# Changelog

## 0.0.9
Part 1 of game mode selection:
- You can now select the game mode of the level. Moves/time and objectives have not been implemented yet.

## 0.0.8
The layer visibility update:
- Layer visibility can now be toggled (this does not change any underlying data).
- To reduce confusion, layers that are not visible cannot be modified in any way.
- Added the version number to the top bar

## 0.0.7
Large update - part 2 of drawing and deleting dispensers
- You can now change the contents of dispensers. This was surprisingly tedious.
- Fixed an oversight that led to dispensers intercepting clicks

## 0.0.6
Small update - you can now draw and delete dispensers!
- Can't edit what's in them yet

## 0.0.5
You can now choose whether you draw or delete elements!
- Two drawing modes have been implemented: Draw and Delete
- Draw is for drawing elements on the board, and Delete is for removing them
- Edit mode is not implemented right now
- The layer selection radio buttons are now functional (they're useful for Edit and Delete modes)
- Added checks to ensure that impossible board layouts cannot be achieved (e.g. candies on top of empty spaces)

## 0.0.4
You can now draw candies and most 1x1 blockers!
- Candies and blockers can now be selected from the Layers panel. Colors and gumball machines are not yet implemented.
- Accidentally fixed some of the spacing in the board area
- Resized the element buttons and their images in the Layers panel to display much more consistently
- On first load, the board is now also fully populated with random-colored candies.

## 0.0.3
You can now draw tiles!
- Selecting an element in a dropdown in the Layers panel will automatically select the elements's layer. (Still haven't implemented anything other than tile drawing)
- You can now see which element you have selected.
- Drawing only affects the current layer.
- The board updates after every modification.
- Manually clicking on the "selected layer" radio buttons still does nothing, however. This will be implemented when I work on another layer.

## 0.0.2
Dropdowns in the Layers panel are now functional. Nothing has been added yet.

## 0.0.1
Built an extremely basic layout of the editor, no functionality

## 0.0.0
Initial commit
