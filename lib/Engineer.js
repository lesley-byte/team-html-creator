const Employee = require("./Employee");
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// This class extends the Employee class and adds the github property
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getRole() {
        return 'Engineer';
    }
    getGithub() {
        return this.github;
    }
}
module.exports = Engineer;