const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Defining Questions to ask users

const startApp = [
    {
        type: "list",
        name: "verifyRole",
        message: "What's your role?",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        name: "name",
        message: "Enter Name: "
    },
    {
        type: "input",
        name: "email",
        messge: "Enter Email: "
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter Office Number: "
    }
]

const employeeInfo = [
    {
        type: "input",
        name: "name",
        message: "Enter employee name: "
    },
    {
        type: "input",
        name: "email",
        message: "Enter their email:"
    },
    {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: ["Engineer", "Intern"]
    },
    {
        when: input => {
            return input.role == "Engineer"
        },
        type: "input",
        name: "github",
        message: "Engineer, enter your github username:"
    },
    {
        when: input => {
            return input.role == "Intern"
        },
        type: "input",
        name: "school",
        message: "Intern, enter your school name:"
    },
    {
        type: "list",
        name: "addAnother",
        message: "Add another team member?",
        choices: ["Yes", "No"]
    }
]

// Prompts User to enter Employee Info

function enterEmployees () {
    inquirer.prompt(employeeInfo);
}

// Prompts User to verify role and confirm action

function promptStart () {
    inquirer.prompt(startApp);
    // enterEmployees();
}

// promptStart();



// function verifyRole () {
//     if(startAppQuestions.verifyRole == "Manager") {
//         enterEmployees();
//     }
//      else {
//         return inquirer.prompt("Must be a Manager to proceed");
//     }
// }

// promptStart();
enterEmployees();
