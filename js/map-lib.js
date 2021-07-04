
const countiesList = {
	V1: {name: 'Манро' ,         neighbors: ['V2' ,'V3']},
	V2: {name: 'Юж. Марагона',   neighbors: ['V1' ,'V3' ,'V8','V9']},
	V3: {name: 'Легезак',        neighbors: ['V1' ,'V2' ,'V4','V7','V8']},
	V4: {name: 'Лумель',         neighbors: ['V3' ,'V5' ,'V6','V7']},
	V5: {name: 'Фукиано',        neighbors: ['V4' ,'V6']},
	V6: {name: 'Фиеско',         neighbors: ['V4' ,'V5' ,'V7','R8','G2']},
	V7: {name: 'Варзов',         neighbors: ['V3' ,'V4' ,'V6','V8','G1','G2','G4']},
	V8: {name: 'Ст. Придда',     neighbors: ['V2' ,'V3' ,'V7','V9','V11']},
	V9: {name: 'Гельбе',         neighbors: ['V2' ,'V8' ,'V10','V11'],},
	V10:{name: 'Ноймаринен',     neighbors: ['V9' ,'V11','V12']},
	V11:{name: 'Васспард',       neighbors: ['V8' ,'V9' ,'V10','V12','G4','G5']},
	V12:{name: 'Агмари',         neighbors: ['V10','V11','G5']},
	G1: {name: 'Борн',           neighbors: ['G2' ,'G3' ,'G4','V7']},
	G2: {name: 'Савиньяк',       neighbors: ['G1' ,'G3' ,'V6','V7','R9']},
	G3: {name: 'Ст. Эпинэ',      neighbors: ['G1' ,'G2' ,'G4','G7','G8']},
	G4: {name: 'Гонт',           neighbors: ['G1' ,'G3' ,'G5','G6','G7','V7','V11']},
	G5: {name: 'Фарнэби',        neighbors: ['G4' ,'G6' ,'G11','V11','V12']},
	G6: {name: 'Оллария',        neighbors: ['G4' ,'G5' ,'G7','G9','G11']},
	G7: {name: 'Барсина',        neighbors: ['G3' ,'G4' ,'G6','G8','G9']},
	G8: {name: 'Ариго',          neighbors: ['G3' ,'G7' ,'G9','R2','R3','R9',"O8"]},
	G9: {name: 'Пуэн',           neighbors: ['G6' ,'G7' ,'G8','G10','G11','O6']},
	G10:{name: 'Кракл',          neighbors: ['G9' ,'G11','O1','B4','B5']},
	G11:{name: 'Тристрам',       neighbors: ['G5' ,'G6' ,'G9','G10','B1','B4']},
	R1: {name: 'Маллэ',          neighbors: ['R2' ,'R4' ,'O8']},
	R2: {name: 'Гальтара',       neighbors: ['R1' ,'R4' ,'R3','G8','O8']},
	R3: {name: 'Кадела',         neighbors: ['R2' ,'R4' ,'R6','R7','R9','G8']},
	R4: {name: 'Кадельяк',       neighbors: ['R1' ,'R2' ,'R3','R5']},
	R5: {name: 'Эр-Сабвэ',       neighbors: ['R4' ,'R6']},
	R6: {name: 'Эр-При',         neighbors: ['R3' ,'R5', 'R7']},
	R7: {name: 'Рафиан',         neighbors: ['R3' ,'R6', 'R8', 'R9']},
	R8: {name: 'Валмон',         neighbors: ['R7' ,'V6']},
	R9: {name: 'Дорак',          neighbors: ['R3' ,'R7', 'G2', 'G8']},
	O1: {name: 'Агиррэ',         neighbors: ['O2' ,'O6', 'G10']},
	O2: {name: 'Цикотера',       neighbors: ['O1' ,'O3', 'O5', 'B5']},
	O3: {name: 'Вар.-север',     neighbors: ['O2' ,'O4', 'B10', 'B12']},
	O4: {name: 'Вар.-центр',     neighbors: ['O3' ,'O5', 'O10']},
	O5: {name: 'Ежанка',         neighbors: ['O2' ,'O4', 'O6', 'O7', 'O10']},
	O6: {name: 'Салиган',        neighbors: ['O1' ,'O5', 'O7', 'O8', 'G9']},
	O7: {name: 'Тронко',         neighbors: ['O5' ,'O6', 'O8', 'O9', 'O10']},
	O8: {name: 'Регаллона',      neighbors: ['O6' ,'O7', 'O9', 'R1', 'R2', 'G8']},
	O9: {name: 'Гунамасса',      neighbors: ['O7' ,'O8','O10']},
	O10:{name: 'Вар.-юг',        neighbors: ['O4' ,'O5', 'O7', 'O9']},
	B1: {name: 'Ларак',          neighbors: ['B2' ,'B3', 'B4', 'G11']},
	B2: {name: 'Мала',           neighbors: ['B1' ,'B3','B7']},
	B3: {name: 'Надор',          neighbors: ['B1' ,'B2','B4','B5','B6','B7']},
	B4: {name: 'Танп',           neighbors: ['B1' ,'B3', 'B5', 'G10', 'G11']},
	B5: {name: 'Давенпорт',      neighbors: ['B3' ,'B4', 'B6', 'B9', 'B10', 'G10', 'O2']},
	B6: {name: 'Надоры',         neighbors: ['B3' ,'B5', 'B7', 'B8', 'B9']},
	B7: {name: 'Горик',          neighbors: ['B2' ,'B3', 'B6', 'B8']},
	B8: {name: 'Карлион',        neighbors: ['B6' ,'B7', 'B9']},
	B9: {name: 'Каданэр',        neighbors: ['B5' ,'B6', 'B8', 'B10', 'B11']},
	B10:{name: 'Рокслей',        neighbors: ['B5' ,'B9', 'B11', 'B12', 'O3']},
	B11:{name: 'Ренкваха',       neighbors: ['B9' ,'B10', 'B12']},
	B12:{name: 'Юж. Надор',      neighbors: ['B10','B11', 'O3']}
};



						   
const castledCounties = {
	V8 : 40, 
	G6 : 40, 
	G8 : 40, 
	R7 : 40, 
	O7 : 40, 
	B3 : 100, 
	B10: 40
};
						   


const countiesInitialArmy = {
	V1:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V2:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V3:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V4:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V5:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V6:  {side: sides.red,     army: {artillery: 0, cavalry: 8, infantry: 4}},
	V7:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V8:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V9:  {side: sides.red,     army: {artillery: 4, cavalry: 2, infantry: 6}},
	V10: {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V11: {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	V12: {side: sides.red,     army: {artillery: 4, cavalry: 0, infantry: 8}},
	G1:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G2:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G3:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G4:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G5:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G6:  {side: sides.red,     army: {artillery: 4, cavalry: 4, infantry: 4}},
	G7:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G8:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G9:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G10: {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	G11: {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	R1:  {side: sides.blue,    army: {artillery: 4, cavalry: 0, infantry: 2}},
	R2:  {side: sides.blue,    army: {artillery: 3, cavalry: 6, infantry: 3}},
	R3:  {side: sides.blue,    army: {artillery: 0, cavalry: 4, infantry: 8}},
	R4:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	R5:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	R6:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	R7:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	R8:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	R9:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	O1:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	O2:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	O3:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	O4:  {side: sides.blue,    army: {artillery: 0, cavalry: 0, infantry: 6}},
	O5:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	O6:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	O7:  {side: sides.red,     army: {artillery: 0, cavalry: 4, infantry: 0}},
	O8:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	O9:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	O10: {side: sides.red,     army: {artillery: 4, cavalry: 0, infantry: 8}},
	B1:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	B2:  {side: sides.red,     army: {artillery: 0, cavalry: 0, infantry: 3}},
	B3:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	B4:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	B5:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	B6:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	B7:  {side: sides.red,     army: {artillery: 0, cavalry: 2, infantry: 0}},
	B8:  {side: sides.red,     army: {artillery: 2, cavalry: 0, infantry: 2}},
	B9:  {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	B10: {side: sides.blue,    army: {artillery: 0, cavalry: 2, infantry: 0}},
	B11: {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}},
	B12: {side: sides.neutral, army: {artillery: 0, cavalry: 0, infantry: 0}}
};

let commandersList = ['Бэзил Хейл'];
// creating the main map object

const gameState = {
	theMap: {},
	selectedCounty: '',
	commandList: [],
	movingPlayer: sides.red
};


for (const countyId in countiesList) {
	gameState.theMap[countyId] = new County(
		countyId, countiesList[countyId].name, 
		countiesList[countyId].neighbors, 
		castledCounties.hasOwnProperty(countyId)
	);
}

let selectedUnitType = '';

// adding initial army units
//const armyObj = {};
const totalUnits = {red: 0, blue: 0};
for (const countyId in countiesInitialArmy) {
	if(countiesInitialArmy[countyId].side !== sides.neutral) {
		for (const armyBranch in countiesInitialArmy[countyId].army) {
			for(let i=0; i<countiesInitialArmy[countyId].army[armyBranch]; i++){
				//let unitIdStr = `Unit${totalUnits.red + totalUnits.blue}`;
				let unitIdStr = `${countiesInitialArmy[countyId].side}-${armyBranch}-${totalUnits[countiesInitialArmy[countyId].side]}`;
				gameState.theMap[countyId].army[armyBranch].push(
					new ArmyUnit(countiesInitialArmy[countyId].side, armyBranch, unitIdStr)
				);
				//console.log(theMap[countyId].name, armyBranch, theMap[countyId].army[armyBranch]);
				let theBranch = gameState.theMap[countyId].army[armyBranch];
				//console.log(theMap[countyId].name, armyBranch, theBranch, theBranch.length);
				//armyObj[unitIdStr] = gameState.theMap[countyId].army[armyBranch][gameState.theMap[countyId].army[armyBranch].length-1];
				totalUnits[countiesInitialArmy[countyId].side]++;
			}
		}
	}	
}

console.log(`added ${totalUnits.red} red units and ${totalUnits.blue} blue units - ${totalUnits.red + totalUnits.blue} units total.`);


//some counties for console testing purps
const arigo = gameState.theMap.G8;


const getUnit = (unitId) => {
	for(const county in gameState.theMap){
		const army = gameState.theMap[county].army;
		for(const armyBranch in army) {
			const branch = army[armyBranch];
			for(let i=0; i<branch.length; i++) {
				if(branch[i].id === unitId) {
					return branch[i];
				}
			}
		}
	}
};

const getUnitType = (unitId) => {
	return unitId.split('-')[1];
};

const getUnitSide = (unitId) => {
	return unitId.split('-')[0];
};


















