// Starting off by requiring the necessary packages

const employee = require('./lib/Employee');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
console.log('Welcome to the Team Profile Generator!');

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// created empty array to store employees
const employees = [];
// created questions to ask user about employees
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's name?",
            name: 'name',
        },
        {
            type: 'input',
            message: "What is the employee's ID number?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the employee's email address?",
            name: 'email',
        },
        {
            type: 'list',
            message: "What is the employee's role? (Use arrow keys and then press enter to select)",
            name: 'role',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
        {
            // This will only run if the user selects 'Manager' as the employee's role
            type: 'input',
            message: "What is the employee's office number?",
            name: 'officeNumber',
            when: (answers) => answers.role === 'Manager',
        },
        {
            // This will only run if the user selects 'Engineer' as the employee's role
            type: 'input',
            message: "What is the employee's GitHub username?",
            name: 'github',
            when: (answers) => answers.role === 'Engineer',
        },
        {
            // This will only run if the user selects 'Intern' as the employee's role
            type: 'input',
            message: "What school does the intern attend?",
            name: 'school',
            when: (answers) => answers.role === 'Intern',
        },
        {
            // If the user selects 'Yes' to add another employee, the questions will run again
            type: 'confirm',
            message: 'Would you like to add another employee?',
            name: 'addEmployee',
        },
    ])
    .then((answers) => {
        let employee;
        // This creates a new Manager, Engineer, or Intern object based on the user's answers and selects the questions to ask the user.
        if (answers.role === 'Manager') {
            employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        } else if (answers.role === 'Engineer') {
            employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
        } else if (answers.role === 'Intern') {
            employee = new Intern(answers.name, answers.id, answers.email, answers.school);
        }
        // This adds the employee to the employees array
        employees.push(employee);
        if (answers.addEmployee) {
            return questions();
        } else {
            return employees;
        }
    })
}

function writeFileAsync(path, data) {
    return new Promise((resolve, reject) => {
        // check if output folder exists and create it if it doesn't
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        // write file once the output folder exists
        fs.writeFile(path, data,function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// call questions function to start the program
questions()
    .then((employees) => {
        return render(employees);
    })
    .then((html) => {
        return writeFileAsync(outputPath, html);
    })
    .then(() => {
        console.log('Successfully wrote to output/team.html');
    })
    .catch((err) => console.error(err));


// Directions from Kevin Ferguson:
//--------------------------------------------------------------------------------------------
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!  

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.




// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
