const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('Chris', 1, 'chris@domain.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));

    console.log(`Employee Name: ${employee.name}`);
    console.log(`Employee ID: ${employee.id}`);
    console.log(`Employee E-mail: ${employee.email}`);
});