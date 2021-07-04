
console.log('running tests');

const runTests = () => {
	console.log('Testing moveIsLegal function:')
	test('reject if county is full', () => {
		const result = moveIsLegal(gameState.theMap, 'G5', 'G6');		//G6 is initially full
		const expected = false;
		expect(result).toBe(expected);
	})	
	test('reject if destination is enemy', () => {
		const result = moveIsLegal(gameState.theMap, 'O10', 'O4');		//O4 and O10 initially contain enemies by design
		const expected = false;
		expect(result).toBe(expected);
	})	
	test('accept if destination is not enemy and not full', () => {
		const result = moveIsLegal(gameState.theMap, 'G6', 'G7');		//G7 is initially empty by design
		const expected = true;
		expect(result).toBe(expected);
	})
	
};



function test(title, callback) {
    try {
        callback();
        console.log(`✅ ${title}`);        
    } catch (error) {
        console.error(`❌ ${title}`);
        console.log(error);
    }
}


function expect(actual) {
    return {
        toBe(expected) {
            if(actual !== expected) {
                throw new Error(`${actual} is not equal to ${expected}`);
            }
        },
        toEqual(expected) {

        }
    }
}