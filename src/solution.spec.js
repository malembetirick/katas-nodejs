const execSync = require('child_process').execSync;

describe('Read huge json file', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should set command arguments', async () => {
        const result = execSync("node --max_old_space_size=50 solution.js");
        expect(result.toString('utf-8').trim()).toBe("");
    });

    test('should print name with big bath size', async () => {
        const result = execSync("node --max_old_space_size=50 solution.js --id 82064 --batchSize 50000000000000000000000000000000000000000000000");
        expect(result.toString('utf-8').trim()).toBe("Alec Mills");
    });

    test('should print name with little batch size', async () => {
        const result = execSync("node --max_old_space_size=50 solution.js --id 6003 --batchSize 500");
        expect(result.toString('utf-8').trim()).toBe("Emmy Sanford MD");
    });
    
    test('should execute process for batch size of size 0  -> internal batch size setup to 1000', async () => {
        const result = execSync("node --max_old_space_size=50 solution.js --id 6003 --batchSize 0");
        expect(result.toString('utf-8').trim()).toBe("Emmy Sanford MD");
    });
    
    test('should execute process for batch size which is not number', async () => {
        const result = execSync("node --max_old_space_size=50 solution.js --id 6003 --batchSize aeetet");
        expect(result.toString('utf-8').trim()).toBe("Emmy Sanford MD");
    });

    test('should execute process for unspecified batch size -> internal batch size setup to 1000', async () => {
        const result = execSync("node --max_old_space_size=50 solution.js --id 6003");
        expect(result.toString('utf-8').trim()).toBe("Emmy Sanford MD");
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
});