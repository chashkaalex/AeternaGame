
const moveIsLegal = (theMap, source, destination) => {
	
	//check if there is a space in the destination county 
	const currentDestUnits = theMap[destination].totalUnits();
	const commListDestUnits = gameState.commandList.filter(
		command => command.destination === theMap[destination].id
		).length;
	if(currentDestUnits + commListDestUnits > maxUnitsInCounty - 1) {
		window.alert(`${theMap[destination].name} is full, skipping this directive`);
		return false;
	} 

	//check if the move directive is legal (no enemy units in the destination)				
	if(theMap[source].enemy() === theMap[destination].side()) {
		window.alert(`${theMap[destination].name} is enemy's, you cannot move there, skipping this directive`);
		return false;
	}
	return true;
};

const attackIsLegal = (unitId, selAction, selDestination) => {
	const theMap = gameState.theMap;
	let commListAtkUnits = gameState.commandList.filter(command => command.action === actionTypes.attack);
	let commListSptUnits = gameState.commandList.filter(command => command.action === actionTypes.support);
	if(selAction === actionTypes.attack || selAction === actionTypes.support) {

		//implementing the 'one attack destination' rule
		if(commListAtkUnits.length && selDestination !== commListAtkUnits[0].destination ||
		   commListSptUnits.length && selDestination !== commListSptUnits[0].destination) {
			window.alert(`You cannot attack at multiple counties simultaneously, skipping this directive`);
			return false;
		}

		//checking if there is an enemy to attack
		if(gameState.selectedCounty.enemy() !== theMap[selDestination].side()) {
			window.alert(`There is no enemy to attack at ${theMap[selDestination].name}, skipping this directive`);
			return false;				
		}				
		
		//check if there are no more total artillery than total infantry
		let commListArtUnits = gameState.commandList.filter(command => getUnitType(command.unit) === unitTypes.artillery);
		let commListInfUnits = gameState.commandList.filter(command => getUnitType(command.unit) === unitTypes.infantry);
		if(getUnitType(unitId) === unitTypes.artillery && 
			numCommListUnitsOfType(unitTypes.artillery) === numCommListUnitsOfType(unitTypes.infantry)) {
			window.alert(`You cannot attack ${theMap[selDestination].name} with more artillery than infantry, skipping this directive`);
			return false;
		}
	}
	
	if(selAction === actionTypes.support) {
		//check if there are actively attacking units
		if(!commListAtkUnits.length) {
			window.alert(`You cannot add support units without having attack units first, skipping this directive`);
			return false;				
		}
	}
	
	if(selAction === actionTypes.attack) {
		
		const theMap = gameState.theMap;
		//check there is less then 12 active attack units
		if(commListAtkUnits.length > 11) {
			window.alert(`You cannot attack ${theMap[selDestination].name} with more then 12 units, skipping this directive`);
			return false;
		}
		
		//check if there are no more artillery than infantry
		let commListArtAtkUnits = gameState.commandList.filter(
			command => getUnitType(command.unit) === unitTypes.artillery && command.action === actionTypes.attack
		);
		let commListInfAtkUnits = gameState.commandList.filter(
			command => getUnitType(command.unit) === unitTypes.infantry && command.action === actionTypes.attack
		);
		if(getUnitType(unitId) === unitTypes.artillery && commListArtAtkUnits.length === commListInfAtkUnits.length) {
			window.alert(`You cannot activly attack ${theMap[selDestination].name} with more artillery than infantry, skipping this directive`);
			return false;
		}
	}
	return true;
};


const numCommListUnitsOfType = (unitType) => {
	return gameState.commandList.filter(command => getUnitType(command.unit) === unitType).length;
	 
};