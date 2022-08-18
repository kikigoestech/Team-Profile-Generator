// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateCards = require('./src/generatePage.js');

// get team profiles
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');

// push employee info into array
const teamArray = [];

// prompts user to add manager info
const addManager = () => {
    console.log(`
    ==================
Add a Team Manager
==================
	`);
	return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the team manager?',
            validate: managerName => {
                if (managerName) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the team manager's ID number.",
            validate: managerId => {
                if (managerId) {
                    return true;
                } else {
                    console.log('Please enter a valid ID number!');
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the e-mail address of the team manager.',
            validate: managerEmail => {
                if (managerEmail) {
                    return true;
                } else {
                    console.log('Please enter an e-mail address!');
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the team manager's office number.",
            validate: managerOfficeNumber => {
                if (managerOfficeNumber) {
                    return true;
                } else {
                    console.log('Please enter a valid number!');
                }
            }
        }
    ])
    .then(managerData => {
        // take manager info & push them into teamArray
        const manager = new Manager (managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        teamArray.push(manager);
    })
};
// display questions for engineer info
const addEmployee = () => {
    console.log(`
=================
Add a Team Member
=================
	`);
	return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Would you like to add a team member?',
            choices: ['Engineer', 'Intern', 'Finish Building Team']
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?',
            when: (choice) => choice.role !== 'Finish Building Team',
            validate: employeeName => {
                if (employeeName) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID number.",
            when: (choice) => choice.role !== 'Finish Building Team',
            validate: employeeId => {
                if (employeeId) {
                    return true;
                } else {
                    console.log('Please enter a valid ID number!');
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the e-mail address of the employee.',
            when: (choice) => choice.role !== 'Finish Building Team',
            validate: employeeEmail => {
                if (employeeEmail) {
                    return true;
                } else {
                    console.log('Please enter an e-mail address!');
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the engineer's GitHub username.",
            when: (choice) => choice.role === 'Engineer',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter a GitHub username!');
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the intern's school.",
            when: (choice) => choice.role === 'Intern',
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log('Please enter a school!');
                }
            }
        },
        {
            type: 'confirm',
            name: 'addEmployee',
            message: 'Would you like to add another team member?',
            when: (choice) => choice.role !== 'Finish Building Team',
            default: true
        }
    ])
    .then(employeeData => {
        // take engineer info & push them into teamArray
        if (employeeData.role === 'Engineer') {
            const engineer = new Engineer (employeeData.name, employeeData.id, employeeData.email, employeeData.github);
            teamArray.push(engineer);
        } else if (employeeData.role === 'Intern') {
            // take intern info & push them into teamArray
            const intern = new Intern (employeeData.name, employeeData.id, employeeData.email, employeeData.school);
            teamArray.push(intern);
        }
        // 'add another team member?' menu
        if (employeeData.addEmployee) {
            return addEmployee(teamArray);
        } else {
            return teamArray;
        }
    })
};

// create index.html file
const createFile = (fileName, teamArray) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileName, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Success! A new team profile has been created! Check index.html in the `dist` folder.'
            });
        });
    });
};

// initialize app
addManager()
    .then(employeeData => {
        return addEmployee(employeeData)
    })
    .then(data => {
        console.log(data);
        return generateCards(data);
    })
    .then(newFile => {
        return createFile(newFile);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse.message);
    })
    .catch(err => {
        console.log(err);
    });
