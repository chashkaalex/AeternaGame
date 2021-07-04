
class County {
	constructor(id, name, neighbors, hasCastle) {
		this.id = id;
		this.name = name;
		this.neighbors = neighbors;
		this.hasCastle = hasCastle;
	}
	army = {artillery: [], cavalry: [], infantry: []};
	
	totalUnits() {
		return this.army.artillery.length + this.army.cavalry.length + this.army.infantry.length;
	}
	
	hasOnlyArtillery() {
		return this.army.cavalry.length + this.army.infantry.length === 0;
	}
	side() {
		for(const armyBranch in this.army) {
			if(this.army[armyBranch].length) {
				return this.army[armyBranch][0].side;
			}
		}
		return sides.neutral;
	}
	
	enemy() {
		if(this.side() === sides.red) {
			return sides.blue;
		} else if (this.side() === sides.blue) {
			return sides.red;
		} else {
			return sides.neutral;
		}
	}
	
	removeUnit(unitId) {
		console.log(`Removing ${unitId} unit`);
		console.log(`Before the operation there are ${this.totalUnits()} units in this county:`);
		console.log(`Artillery - ${this.army.artillery.length}`);
		console.log(`Cavalry   - ${this.army.cavalry.length}`);
		console.log(`Infantry  - ${this.army.infantry.length}`);
		for(const armyBranch in this.army) {
			let foundIdx = this.army[armyBranch].findIndex(unit => unit.id === unitId);
			if (foundIdx > -1) {
				this.army[armyBranch].splice(foundIdx, 1);
				break;
			}
		}
		console.log(`After the operation there are ${this.totalUnits()} units in this county:`);
		console.log(`Artillery - ${this.army.artillery.length}`);
		console.log(`Cavalry   - ${this.army.cavalry.length}`);
		console.log(`Infantry  - ${this.army.infantry.length}`);		
	}
}

class ArmyUnit {
	constructor(side, unitType, id) {
		this.side = side;
		this.unitType = unitType;
		this.id = id;
		this.moves  = armyConfig[unitType].moves;
		this.damage = armyConfig[unitType].damage;
		this.health = armyConfig[unitType].health;		
	}
}

