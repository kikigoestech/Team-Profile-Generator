// push employee info into array
const generateCards = data => {
    cardArray = [];

    // calls functions to respective employee roles
    for (let i = 0; i < data.length; i++) {
        let employee = data[i];
        let role = employee.getRole();

        if (role === 'Manager') {
            const managerInfo = generateManager(employee);
            cardArray.push(managerInfo);
        }
        if (role === 'Engineer') {
            const engineerInfo = generateEngineer(employee);
            cardArray.push(engineerInfo);
        }
        if (role === 'Intern') {
            const internInfo = generateIntern(employee);
            cardArray.push(internInfo);
        }
    }