const Manager = require('../lib/Manager');

test('creates a manager object inherited from Employee', () => {
    const manager = new Manager('Alex', 1, 'alex@domain.com', '867-5309');

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));

    console.log(`Manager Name: ${manager.name}`);
    console.log(`Manager ID: ${manager.id}`);
    console.log(`Manager E-mail: ${manager.email}`);
});

test('creates an office number', () => {
    const manager = new Manager('Alex', 2, 'alex@domain.com', '867-5309');

    expect(manager.officeNumber).toEqual(expect.any(String));
    console.log(`Office Number: ${manager.officeNumber}`);
});

test('creates a role of manager', () => {
    const manager = new Manager('Alex', 2, 'alex@domain.com', '867-5309');

    expect(manager.getRole()).toBe('Manager');
});