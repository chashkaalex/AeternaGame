
const updateCommandList = () => {
	console.log('running ucl');
	
	
	//implementing the 'only one action type per commence' rule
	const actions = [...selCountyTable.rows].map(row => cellElemSelectedOption(row.cells[3], 'text'));
	if(gameState.commandList.length) {
		actions.push(gameState.commandList[0].action);
	}
	if(actions.includes('Move') && (actions.includes('Atk') || actions.includes('Spt'))) {
		window.alert("You cannot add both 'Move' and 'Attack/Support' directives to the Command list.");
		return;
	}
	
	[...selCountyTable.rows].forEach((row)=> {
		const selAction = cellElemSelectedOption(row.cells[3], 'text');
		if(selAction !== actionTypes.none) {
			let actionIsLegal = true;
			const unitId = row.cells[0].id;
            const selDestination = cellElemSelectedOption(row.cells[4], 'value');
			if(selAction === 'Move') {
				actionIsLegal = moveIsLegal(gameState.theMap, gameState.selectedCounty.id, selDestination);
			} else {
				actionIsLegal = attackIsLegal(unitId, selAction, selDestination);
			}

			if(actionIsLegal) {
				gameState.commandList.push({
					source: gameState.selectedCounty.id, 
					unit: unitId, 
					action: selAction,
					destination: selDestination
				});				
			}
		}
	})
	console.log("updated command list: ", gameState.commandList);
	renderSelectedCounty();
	renderCommandList();
}

const cellElemSelectedOption = (elem, option) => {
    if(elem.firstChild.id) {
        const selection = elem.firstChild.options[elem.firstChild.selectedIndex];
        return option === 'text' ? selection.text : selection.value;
    }
    console.log(elem.innerText);
    return elem.innerText;
};

const commenceListCommands = () => {
    console.log('running clc');
	// sending current state to the stack
	// gameMovesStack.push(JSON.parse(JSON.stringify(gameState)));
	pushStateToGameMoveStack(gameState);
	updateLocalBackUp();
    //console.log(gameState.commandList);
	//debugger;
    if(gameState.commandList[0].action === actionTypes.move) {
        while(gameState.commandList.length) {
            commenceUnitMove(gameState.commandList.pop());
        }
    } else if(gameState.commandList[0].action === actionTypes.attack) {
		commenceAttack();
	}
	refreshEventsAndClasses();
    renderCommandList();
    renderMap();
};

const distanceBtwnCounties = (src, dest) => {
	const theMap = gameState.theMap;
    let neighbors = [src.id];
    let tmpList = [];
    for(let i=1; i<11; i++) {   //11 is the maximum distance btwn 2 counties on the map
        neighbors.forEach((neighbor) => {
			tmpList = tmpList.concat(theMap[neighbor].neighbors)
        });
        if(tmpList.includes(dest.id)) {
            return i;
        }
        neighbors = tmpList;
		tmpList = [];
    }
};

const clearCommandList = () => {		//this function is used only through the 'clear list' button
	gameState.commandList = [];
	renderCommandList();
	renderSelectedCounty();
}