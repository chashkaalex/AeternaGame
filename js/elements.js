
//config elems
const mainContainerElem = document.getElementById("mainContainer");
const configModalElem = document.getElementById("configModal");
const backupModalElem = document.getElementById("backupModal");
const gameLogModalElem = document.getElementById("gameLogModal");
const fullLogContainerElem = document.getElementById("fullLogContainer");
const configModalCloseELem = document.getElementById("closeConfigModal");
const backupModalCloseELem = document.getElementById("closeBackupModal");
const backupContainerELem = document.getElementById("backupContainer");
const armyConfigTableElem = document.getElementById("armyConfigTable");
const damageHealthToggleElem = document.getElementById("damageHealthToggle");

//game menu elems
const selCountyTable = document.getElementById('selCountyUnitsTable');
const selCountyLabel = document.getElementById('selCountyName');
const commandListTable = document.getElementById("commandListUnitsTable");

// map elems
const svgElem = document.getElementById("svg");
const mainMapElem = document.getElementById("mainMap");
const countyElems = [...document.getElementsByClassName("county")];
const getCountyElem = (countyId) => document.getElementById(countyId+"-county");
const armyUnitElems = [...document.getElementsByClassName("armyUnit")];

const getCountyUnitElems = (countyId) => {
	return [...document.getElementsByClassName(countyId + ' ' + 'armyUnit')];
};


// logs and buttons
const hoverLogElem = document.getElementById("hoverLog");
const startGameButton = document.getElementById("startGameButton");
const configButton = document.getElementById("configButton");