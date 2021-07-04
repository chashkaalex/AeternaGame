
const renderSelectedCounty = () => {
    
	// clearing the table 
    selCountyTable.innerHTML = "";
	
	if(gameState.selectedCounty) {
		// Highlight selected county
		countyElems.forEach((elem) => {
			elem.classList.remove('selected');
		})
		const selectedCountyId = gameState.selectedCounty.id;
		const selCountyElem = getCountyElem(selectedCountyId);
		selCountyElem.classList.add("selected");
		
		// repopulating the table
		selCountyLabel.innerHTML = gameState.selectedCounty.name; //updating the label
		const countyArmy = gameState.selectedCounty.army;
		for (const armyBranch in countyArmy) {
			countyArmy[armyBranch].forEach((unit) => {
				if(!gameState.commandList.map(item => item.unit).includes(unit.id)) {
					let newRow = selCountyTable.insertRow(-1);
					let newCell = newRow.insertCell(-1);
					//console.log(unit.unitType)
					newCell.innerHTML = unitImgHtmlStr(unit.unitType);
					newCell.setAttribute("id", unit.id);
					newCell.setAttribute("title", unit.id); 	
					newCell = newRow.insertCell(-1);
					newCell.innerHTML = unit.health;
					newCell = newRow.insertCell(-1);
					newCell.innerHTML = unit.moves;
					newCell = newRow.insertCell(-1);
					newCell.innerHTML = unit.moves ? actionSelectHtmlStr() : actionTypes.none;
					newCell = newRow.insertCell(-1);;
					newCell.innerHTML = unit.moves ? destinationHtmlStr(gameState.selectedCounty.id, unit) : 'No moves';
				}
			})
		}  		
	}
};

const unitImgHtmlStr = (unitType) => {
	return '<img src="./img/units/' + unitType + '.svg" width="15" height="15">';
}

const actionSelectHtmlStr = () => {
	let theStr = '<select id="actionSelection">';
	for(const action in actionTypes) {
		theStr += `<option value="${action}">${actionTypes[action]}</option>`
	}
	return theStr + '</select>';
}

const destinationHtmlStr = (countyId, unit) => {
	const theMap = gameState.theMap;
	const possibleDestinations = theMap[countyId].neighbors;
	let result = '<select id="destinationSelection">';
	possibleDestinations.forEach((dest) => {
		result+= '<option value="'+ dest +'">'+ theMap[dest].name + '</option>'
	});
	 result += '</select>';
	return result;
};

const renderCommandList = () => {
    // clearing the table
	const theMap = gameState.theMap;
    commandListTable.innerHTML = "";
    // repopulating the table
    gameState.commandList.forEach((commandObj) => {
            let newRow = commandListTable.insertRow(-1);
            let newCell = newRow.insertCell(-1);
            newCell.innerHTML = theMap[commandObj.source].name;              //source county
            newCell = newRow.insertCell(-1);
            newCell.innerHTML = unitImgHtmlStr(getUnitType(commandObj.unit));  //army branch
            newCell.setAttribute("id", commandObj.unit);
            newCell.setAttribute("title", commandObj.unit); 	
            newCell = newRow.insertCell(-1);                    //action
            newCell.innerHTML = commandObj.action;
            newCell = newRow.insertCell(-1);
            newCell.innerHTML = theMap[commandObj.destination].name;         //destination
    })   
};

const renderMap = () => {
    //clear the map
	const theMap = gameState.theMap;
	countyElems.forEach((elem)=> {
        elem.classList.remove('red');
        elem.classList.remove('blue');
        elem.setAttribute("fill-opacity", "0.1");		
	});
	armyUnitElems.forEach((elem) => {
		elem.style.visibility = "hidden";
	});
    console.log('The map was cleared!');
    
    //repopulate the map
	mainContainerElem.style.borderColor = gameState.movingPlayer;
	for (const county in theMap) {
		let side;
		for (const armyBranch in theMap[county].army) {
			if (theMap[county].army[armyBranch].length) {
				if(side === undefined) {
					//console.log(theMap[county]);
					side = theMap[county].side();
				}
				document.getElementById(county+'-'+armyBranch).style.visibility = "visible";				
			}
		}
		if(side) {
			document.getElementById(county+'-county').classList.add(side);
			document.getElementById(county+'-county').setAttribute("fill-opacity", "0.6");			
		}
	}
};


const refreshEventsAndClasses = () => {
	// remove previous events and classes
	const theMap = gameState.theMap;
	countyElems.forEach((countyElem) => {
		countyElem.removeEventListener("click", selectCounty);
		countyElem.classList.remove("active");
		countyElem.classList.remove("selected");
	})
	
	// Active player county hover event
	countyElems.forEach((countyElem) => {
		const countyId = countyElem.id.split("-")[0];
		if(theMap[countyId].side() === gameState.movingPlayer) {
			countyElem.addEventListener("click", selectCounty);
			countyElem.classList.add("active");
		}
	})
	
	// Highlight selected county
	if(gameState.selectedCounty) {
		const selectedCountyId = gameState.selectedCounty.id;
		//console.log(selectedCountyId);
		const selCountyElem = getCountyElem(selectedCountyId);
		selCountyElem.classList.add("selected");		
	}
};

const renderAll = () => {
	refreshEventsAndClasses();
	renderSelectedCounty();
	renderCommandList();
	renderMap();
};