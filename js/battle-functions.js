
const commenceUnitMove = (directive) => {
	const theMap = gameState.theMap;
    const sourceCounty = theMap[directive.source];
    const unitBranch = getUnitType(directive.unit)
    const destinationCounty = theMap[directive.destination];
    destinationCounty.army[unitBranch].push(
        sourceCounty.army[unitBranch].splice(
            sourceCounty.army[unitBranch].findIndex(unit => unit.id === directive.unit), 1
        )[0]
    );
	if(directive.action && directive.action === actionTypes.move) {
		destinationCounty
			.army[unitBranch][destinationCounty.army[unitBranch].length-1]
				.moves -= distanceBtwnCounties(sourceCounty, destinationCounty);		
	}
};

const commenceAttack = () => {
	const theMap = gameState.theMap;
	const defendedCounty = theMap[gameState.commandList[0].destination];
	console.log('commencing the attack!');
	console.log(`	Attacking ${defendedCounty.name}(${defendedCounty.id}) 
	from ${gameState.selectedCounty.name}(${gameState.selectedCounty.id})`);
	console.log('initital defending army: ', defendedCounty.army);
	
	const attackDamage = totalAttackDamage();
	console.log('attack damage is ', attackDamage);
	
	console.log('defending army after attackDamage: ', defendedCounty.army);
	
	const defenceDamage = totalDefenceDamage();
	console.log('defence damage is ', defenceDamage);
	
	console.log('defending army after defenceDamage: ', defendedCounty.army);
	
	const winner  = attackDamage > defenceDamage ? 'attacker' : 'defender';
	console.log(`${winner} won!`);
	
	inflictDamage(attackDamage, defenceDamage);

	//debugger;
	console.log('defending army after inflicting the damage: ', defendedCounty.army);
	
	buryTheDead();
	
	console.log('defending army after burying the dead: ', defendedCounty.army);
	
	if(winner === 'attacker') {
		const panic = attackDamage > defenceDamage * 2;
		fleeDefenders(panic);
	}
	emptyCommandList(winner);
	renderAll();
};

const totalAttackDamage = () => {
	const theMap = gameState.theMap;
	const defendedCounty = theMap[gameState.commandList[0].destination];
	let totalDamage = 0;
	gameState.commandList.forEach((directive) => {
		totalDamage += unitAttackDamage(directive.unit, directive.action);
	})
	return defendedCounty.hasCastle ? totalDamage*castleAttackDamagePenalty : totalDamage;
};

const unitAttackDamage = (unitId, action) => {
	const theUnit = getUnit(unitId);
	const unitType = theUnit.unitType;
	const unitBaseHealth = armyConfig[unitType].health;
	let damage = theUnit.damage;
	console.log(`unit ${unitId} has damage of ${damage}`);
	
	//implementing damage health dependency rule (if so chosen, the default is not to use)
	if (damageHealthDependency) {
		if (theUnit.health < 0.25 * unitBaseHealth) {
			return 0;			
		} else if (theUnit.health < 0.75 * unitBaseHealth) {
			damage /= 2;
		}
	}
	return action === actionTypes.attack ? damage : damage*supportUnitDamagePenalty;
};

const totalDefenceDamage = () => {
	const theMap = gameState.theMap;
	const defendedCounty = theMap[gameState.commandList[0].destination];
	let totalDamage = 0;
	// if there is only aritllery present - the damage is zero, 
	// if there is no infantry - the damage comes only from cavalry
	//debugger;

	if (!defendedCounty.hasCastle && defendedCounty.hasOnlyArtillery()) {
			return 0;
	} else if (!defendedCounty.hasCastle && defendedCounty.army.infantry.length === 0) {
		defendedCounty.army.cavalry.forEach((unit) => {
			totalDamage += unitAttackDamage(unit.id, actionTypes.attack);
		})
	} else {
		for (const armyBranch in defendedCounty.army) {
			defendedCounty.army[armyBranch].forEach((unit)=> {
				totalDamage += unitAttackDamage(unit.id, actionTypes.attack);
			})
		}
	}
	return defendedCounty.hasCastle ? totalDamage + castledCounties[defendedCounty.id] : totalDamage;
};

const inflictDamage = (attackDamage, defenceDamage) => {
	const theMap = gameState.theMap;
	const defendedCounty = theMap[gameState.commandList[0].destination];
	
	//inflicting damage to attackers
	let damageToInflict = Math.floor(defenceDamage/gameState.commandList.length) + 1;
	console.log('damage to the attacker unit: ', damageToInflict);
	gameState.commandList.forEach((directive) => {
		getUnit(directive.unit).health -= damageToInflict;
		//console.log(getUnit(directive.unit));
	})
	
	// inflicting damage to defenders
	// if there is nothing but artillery - everyone dies 
	if (!defendedCounty.hasCastle && defendedCounty.hasOnlyArtillery()) {
		for (const armyBranch in defendedCounty.army) {
			defendedCounty.army[armyBranch].forEach((unit)=> {
				unit.health = 0;
			})
		}
	} else {
		damageToInflict = Math.floor(attackDamage/defendedCounty.totalUnits()) + 1;
		for (const armyBranch in defendedCounty.army) {
			defendedCounty.army[armyBranch].forEach((unit)=> {
				unit.health -= damageToInflict;
			})
		}		
	}	
};

const buryTheDead = () => {
	const theMap = gameState.theMap;
	const defendedCounty = theMap[gameState.commandList[0].destination];
	const defendingArmy = defendedCounty.army;

	//bury dead attackers
	gameState.commandList.forEach((directive) => {
	console.log('attackers health: ', getUnit(directive.unit).health);
		if(getUnit(directive.unit).health < 1) {
			theMap[directive.source].removeUnit(directive.unit);
		};
	})	
	
	//bury the defenders
	for (const armyBranch in defendedCounty.army){		
		defendedCounty.army[armyBranch] = 
			defendedCounty.army[armyBranch]
				.filter(unit => unit.health > 0)
	}
};

const fleeDefenders = (panic) => {
	const theMap = gameState.theMap;
	const defendedCounty = theMap[gameState.commandList[0].destination];
	const ownCounties = [];
	const neutralCounties = [];
	let countiesToFlee;
	defendedCounty.neighbors.forEach((neighbor) => {
		if(theMap[neighbor].side() === defendedCounty.side()&& theMap[neighbor].totalUnits() < 12) {
			ownCounties.push(theMap[neighbor]);
		}
		if(theMap[neighbor].side() === sides.neutral) {
			neutralCounties.push(theMap[neighbor]);
		}
	})
	console.log('Own counties: ', ownCounties);
	console.log('Sorted own counties', ownCounties.sort((a,b) => b.totalUnits() - a.totalUnits()));
	countiesToFlee = ownCounties.sort((a,b) => b.totalUnits() - a.totalUnits()).concat(neutralCounties);
	console.log('Order of the counties to flee to: ', countiesToFlee);
	let fleeingUnits = defendedCounty.army.cavalry;
	if(panic) {
		fleeingUnits = fleeingUnits.concat(defendedCounty.army.infantry).concat(defendedCounty.army.artillery);
	} else {
		fleeingUnits = fleeingUnits.concat(defendedCounty.army.artillery).concat(defendedCounty.army.infantry);
	}
	console.log('Order of the units to flee: ', fleeingUnits);
	let fleeIdx = 0;
	//moving the fleeing units while there is space
	while(fleeIdx < countiesToFlee.length && fleeingUnits.length) {
		if(countiesToFlee[fleeIdx].totalUnits() === 12) {
			fleeIdx++;
		}
		commenceUnitMove({
				source: defendedCounty.id, 
				unit: fleeingUnits.shift().id, 
				destination: countiesToFlee[fleeIdx].id
		});
	}
	//removing the units that were unable to flee
	if(fleeingUnits.length) {
		fleeingUnits.forEach((unit) => {
			defendedCounty.removeUnit(unit.id);
		})
	}
};

const emptyCommandList = (winner) => {
	while(gameState.commandList.length) {
		let directive = gameState.commandList.pop();
		getUnit(directive.unit).moves = 0;
		
		// if attacker won, moving the active attack units in
		if(winner === 'attacker' && directive.action === actionTypes.attack) {
			commenceUnitMove(directive);			
		}
	}	
};