
const sides = {red: 'red', blue: 'blue', neutral: 'neutral'};
Object.freeze(sides);

const unitTypes = {artillery: 'artillery', cavalry: 'cavalry', infantry: 'infantry'};
Object.freeze(unitTypes);

const actionTypes = {none: 'None', move: 'Move', attack: 'Atk', support: 'Spt'};
Object.freeze(actionTypes);

const armyConfig = {
	artillery: {
		moves: 1,
		damage: 20,
		health: 100
	},
	cavalry: {
		moves: 2,
		damage: 10,
		health: 100			
	},
	infantry: {
		moves: 1,
		damage: 10,
		health: 100			
	}
};

let damageHealthDependency = false;

let maxUnitsInCounty = 12;

let supportUnitDamagePenalty = 0.5;

let castleAttackDamagePenalty = 0.7;

const hideConfigModal = () => {
	configModalElem.style.display = "none";
};

//configModalCloseELem.onclick = hideConfigModal;


const changeConfig = () => {
	configModalElem.style.display = "block";
	const theMap = gameState.theMap;
	
	// clear and repopulate army properties table
	
    armyConfigTable.innerHTML = "";
	for (const armyBranch in armyConfig) {
		let newRow = armyConfigTable.insertRow(-1);
		let newCell = newRow.insertCell(-1);
		newCell.innerHTML = unitImgHtmlStr(armyBranch);	
		newCell.setAttribute("id", armyBranch);
		for(const prop in armyConfig[armyBranch]) {
			let newCell = newRow.insertCell(-1);
			newCell.innerHTML = unitPropInputHtmlStr(armyBranch, prop);
			//console.log("adding id property", prop);
			newCell.setAttribute("id", prop);
		}

    }
	
	
	// clear and repopulate initail army distribution table
	// const initialArmyTable = document.getElementById("initialArmyTable");
	// initialArmyTable.innerHTML = "";
	// for (const county in theMap) {
		// let newRow = initialArmyTable.insertRow(-1);
		// let newCell = newRow.insertCell(-1);
		// newCell.innerHTML = `${county} - ${theMap[county].name}`;
		// for (const armyBranch in theMap[county].army) {
			// let newCell = newRow.insertCell(-1);
			// newCell.innerHTML = theMap[county].army[armyBranch].length;			
		// }
	// }
	
	
	
};

const unitPropInputHtmlStr = (armyBranch, prop) => {
	return `<input type="text" id="${armyBranch}-${prop}" value="${armyConfig[armyBranch][prop]}">`;
};

const updateConfig = () => {
	[...armyConfigTableElem.rows].forEach((row)=> {
		console.log('army branch: ', row.cells[0].id, armyConfig[row.cells[0].id]);
		let armyBranch = row.cells[0].id;
		[...row.cells].forEach((cell) => {
			if(armyConfig[armyBranch][cell.id]) {
				console.log('	table cell id: ', cell.id);
				console.log('	branch property: ', armyConfig[armyBranch][cell.id]);
				console.log('	table cell value',cell.firstChild.value);
				armyConfig[armyBranch][cell.id] = cell.firstChild.value;					
			}
		})
	})
	
	damageHealthDependency = damageHealthToggleElem.checked;
	hideConfigModal();
};













