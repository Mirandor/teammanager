const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Create your team");
    inquirer.prompt ([
      {
        type: "input",
        name: "managerName",
        message: "Please enter your manager's name.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "A name is required.";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Enter a different number.";
            } else {
              return true;
            }

          }
          return "ID number must be greater than 0.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Enter the manager's email.",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager's office phone number?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid phone number.";
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }
  
  function createTeam() {
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Adding new members to the team? Select a role for the new team member.",
        choices: [
          "Engineer",
          "Intern",
          "No new team members needed."
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
    });
  }

  function addEngineer() {
    inquirer.prompt ([
      {
        type: "input",
        name: "engineerName",
        message: "Please enter the engineer's name.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "A name is required.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the engineer's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Enter a different number.";
            } else {
              return true;
            }

          }
          return "ID number must be greater than 0.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Enter the engineer's email.",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineer's GitHub username?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Enter at least one character.";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt ([
      {
        type: "input",
        name: "internName",
        message: "Please enter the intern's name.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "A name is required.";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is the intern's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Enter a different number.";
            } else {
              return true;
            }

          }
          return "ID number must be greater than 0.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "Enter the intern's email.",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is the intern's school?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Enter at least one character.";
        }
      }
    ]).then(answers => {
      const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }

  function buildTeam() {
    
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();