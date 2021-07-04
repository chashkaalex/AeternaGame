
const gameMovesStack = [];


const loadSavedGame = () => {
	console.log('checking if saves exist');
	const backupIdxs = []
	for (let i = 0; i < localStorage.length; i++){
		console.log(localStorage.key(i), localStorage.key(i).indexOf("AeternaGameBackUp"));
		if(localStorage.key(i).indexOf("AeternaGameBackUp") === 0) {
			backupIdxs.push(i);
		}
	}
	if(backupIdxs.length === 0) {
		alert("There are no backups to load");
		return;
	}
	backupModalElem.style.display = "block";
	backupContainerELem.innerHTML = backupListHtmlString(backupIdxs);
};

const hideBackupModal = () => {
	backupModalElem.style.display = "none";
};
backupModalCloseELem.onclick = hideBackupModal;

const backupListHtmlString = (backupIdxs) => {
	let string = '';
	backupIdxs.forEach((backupIdx) => {
		console.log(backupIdx);
		string+=`<input type="radio" id=${backupIdx} name="backup" value=${backupIdx}>`+
				`<label for=${localStorage.key(backupIdx)}>${localStorage.key(backupIdx)}</label><br>`;
	})
	return string;
};

const undoLastMove = () => {
	if(gameMovesStack.length === 0) {
		alert("There are no previous moves.");
		return;
	}
	const lastState = gameMovesStack.pop();
	console.log('last state ', lastState);
	console.log('current state ', gameState);
	for(const stateProp in gameState) {
		gameState[stateProp] = lastState[stateProp];
	}
	console.log('updated O5 state ', gameState.theMap.O5);
	//debugger;
	renderAll();
};

const pushStateToGameMoveStack = (theState) => {
	const backUpMap = {}
	for (const county in theState.theMap) {
		backUpMap[county] = recreateCounty(theState.theMap[county]);
	}
	const gameStateClone = JSON.parse(JSON.stringify(theState));
	gameStateClone.theMap = backUpMap;
	gameStateClone.selectedCounty = backUpMap[gameStateClone.selectedCounty.id];
	gameMovesStack.push(gameStateClone);
};

const recreateCounty = (oldCounty) => {
	const newCounty = new County(
		oldCounty.id, 
		oldCounty.name, 
		oldCounty.neighbors, 
		oldCounty.hasCastle
	);
	for (const armyBranch in oldCounty.army) {
		theBranch = oldCounty.army[armyBranch];
		theBranch.forEach((unit) => {
			newCounty.army[armyBranch]
				.push(new ArmyUnit(unit.side, unit.unitType, unit.id))
			const newUnit = newCounty.army[armyBranch][newCounty.army[armyBranch].length-1];
			newUnit.moves  = unit.moves;
			newUnit.health = unit.health;
		})
	}
	return newCounty;
};

const updateLocalBackUp = () => {
	let keyString = "AeternaGameBackUp-"+new Date().toDateString();
	console.log(keyString.replace(/\s*:\s*/, ":"));
	localStorage.setItem(keyString.replace(/\s*:\s*/, ":"), 
		JSON.stringify({
			gameMovesStack: gameMovesStack,
			armyConfig: armyConfig,
			damageHealthDependency: damageHealthDependency
		})
	);
};


const loadSelectedBackup = () => {
	const selected = [...backupContainerELem.children]
		.filter(elem => elem.tagName === 'INPUT')
		.find(elem => elem.checked);
		if(selected === undefined) {
			alert('Please, select an option.');
			return;
		}
		const key = localStorage.key(selected.id)
		console.log('key - ', key);
		const backUp = JSON.parse(localStorage.getItem(key));
		console.log('object - ', backUp);
		damageHealthDependency = backUp.damageHealthDependency;
		for(const armyBranch in armyConfig) {
			armyConfig[armyBranch] = backUp.armyConfig[armyBranch];
		}
		gameMovesStack.length = 0;
		backUp.gameMovesStack.forEach((state) => {
			pushStateToGameMoveStack(state)
			console.log(gameMovesStack[gameMovesStack.length-1]);
		})
		undoLastMove();
		clearCommandList();
		backupModalElem.style.display = "none";
}