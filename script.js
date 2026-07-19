// bunch of consts up here

const layers = [
  "tiles",
  "rapids",
  "conveyors",
  "candies/blockers",
  "encasings",
  "orderLocks",
  "walls",
  "crystals",
  "portals/exits",
  "dispensers",
  "selectionImage"
];

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
