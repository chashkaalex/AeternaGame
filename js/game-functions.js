
const startTheGame = () => {
	// render army units on the map
	renderMap();
    refreshEventsAndClasses();	
    // update buttons names and functions
	startGameButton.innerHTML = 'End Move';
	startGameButton.onclick = endMove;
	configButton.innerHTML = 'Load Saved Game';
	configButton.onclick = loadSavedGame;
};

const endMove = () => {
	if (confirm("End the move?")) {
		if (gameState.movingPlayer === sides.red) {
			gameState.movingPlayer = sides.blue;
		} else {
			gameState.movingPlayer = sides.red;
		}
		for(const county in gameState.theMap){
			const army = gameState.theMap[county].army;
			for(const armyBranch in army) {
				const branch = army[armyBranch];
				branch.forEach((unit) => {
					unit.moves = armyConfig[unit.unitType].moves;
				})
			}
		}		
		gameState.selectedCounty = '';
		refreshEventsAndClasses();
		renderAll();
	}
};

const hoverOverCounty = (event) => {
	const theMap = gameState.theMap; 
	const countyId = event.srcElement.id.split("-")[0];
	let hoverString = `${theMap[countyId].name} (${theMap[countyId].id}) - army: `;
	for(const armyBranch in theMap[countyId].army) {
		if(theMap[countyId].army[armyBranch].length) {
			hoverString += `${armyBranch}(${theMap[countyId].army[armyBranch].length}) `;
		}
	}
	//console.log(hoverString);
	hoverLogElem.innerHTML = hoverString;
};

//establishing the event for all county elements
countyElems.forEach((countyElem) => {
	//console.log('Creating hover event for ', countyElem.id);
	countyElem.addEventListener("mouseover", hoverOverCounty);
});






const selectCounty = (event) => {
	const countyId = event.srcElement.id.split("-")[0];
	const theMap = gameState.theMap;
	//updating the model:
	console.log(countyId,'county selected!');
	gameState.selectedCounty = theMap[countyId];
	
	//removing possible target county events
	countyElems.forEach((countyElem) => {
		countyElem.removeEventListener("click", selectDestination);
		countyElem.classList.remove("possibleDestination");
	})
	
	//adding possible missing 'select county' events  back
	refreshEventsAndClasses();
	
	//removing and adding events to the county unit elements
	armyUnitElems.forEach((unitElem) => {
		unitElem.removeEventListener("click", selectUnit);
	})
	countyUnitElems = getCountyUnitElems(countyId);
	//console.log(countyUnitElems);
	countyUnitElems.forEach((countyUnitElem) => {
		countyUnitElem.addEventListener("click", selectUnit)
	})
	
	//rendering the selected county table:
	renderSelectedCounty();
};

const selectUnit = (event) => {
	const unitElemId = event.srcElement.id;
	console.log(unitElemId,'unit clicked!');
	selectedUnitType = unitElemId.split('-')[1];
	//console.log('unit type: ', selectedUnitType);
	[...selCountyTable.rows].forEach((row)=> {
		const thisUnitId = row.cells[0].id;
		const movesValue = row.cells[4].innerHTML;
		const actionSelection = row.cells[3].firstChild;
		let changedAction = false
		//console.log('unit id: ', thisUnitId, 'unit type: ', getUnitType(thisUnitId));
		
		//changing units actions
		if(selectedUnitType === getUnitType(thisUnitId) && movesValue!=='No moves') {
			//console.log(row.cells[3].firstChild.innerHTML);
			//console.log(row.cells[3].firstChild.selectedIndex);
			actionSelection.selectedIndex++;
			if(actionSelection.selectedIndex === -1) {
				actionSelection.selectedIndex++;
			}
			if(!changedAction) {
				changedAction = true;
			}
		}
		//adding event listener to the 
		if(changedAction) {
			gameState.selectedCounty.neighbors.forEach((neighbor) => {
				const neighborCountyElem = getCountyElem(neighbor);
				neighborCountyElem.removeEventListener("click", selectCounty);
				neighborCountyElem.addEventListener("click", selectDestination);
				neighborCountyElem.classList.add("possibleDestination")
			})
		}
		//console.log(gameState.selectedCounty.neighbors);
	})
};

const selectDestination = (event) => {
	const destCountyElemId = event.srcElement.id;
	//console.log('Destination county element clicked: ', destCountyElemId);
	const destCountyId = destCountyElemId.split('-')[0];
	console.log('Destination county id is: ', destCountyId);

	[...selCountyTable.rows].forEach((row)=> {
		const thisUnitId = row.cells[0].id;
		const movesValue = row.cells[4].innerHTML;
		const destinationSelection = row.cells[4].firstChild;
		const actionSelection = row.cells[3].firstChild;
		//console.log('unit id: ', thisUnitId, 'unit type: ', getUnitType(thisUnitId));
		//changing units actions
		if(selectedUnitType === getUnitType(thisUnitId) && movesValue!=='No moves') {
			//console.log([...row.cells[4].firstChild.options].map(theOption => theOption.text));
			destinationSelection.selectedIndex = 
				[...row.cells[4].firstChild.options]
					.findIndex(theOption => theOption.text === gameState.theMap[destCountyId].name);
				
		}
	})
	//removing possible target county events
	countyElems.forEach((countyElem) => {
		countyElem.removeEventListener("click", selectDestination);
		countyElem.classList.remove("possibleDestination")
	})
	
	//adding possible missing 'select county' events  back
	refreshEventsAndClasses();
};

