const Engineer = require('../lib/Engineer');

test('creates an engineer object inherited from Employee', () => {
    const engineer = new Engineer('Alex', 1, 'alex@domain.com', 'tvoisyabr');

    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.email).toEqual(expect.any(String));

    console.log(`Engineer Name: ${engineer.name}`);
    console.log(`Engineer ID: ${engineer.id}`);
    console.log(`Engineer E-mail: ${engineer.email}`);
});

test('gets github info', () => {
    const engineer = new Engineer('Alex', 1, 'alex@domain.com', 'tvoisyabr');

    expect(engineer.github).toEqual(expect.any(String));
});

test('creates a role of engineer', () => {
    const engineer = new Engineer('Alex', 1, 'alex@domain.com', 'tvoisyabr');

    expect(engineer.getRole()).toBe('Engineer');
});