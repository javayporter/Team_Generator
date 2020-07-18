const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

const employees = [];

function promptStart() {
    generateHtml();
    enterEmployees();
}

function enterEmployees() {
    inquirer.prompt([{
        type: "list",
        name: "role",
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
        name: "id",
        message: "Enter Employee ID: "
    }])
    .then(function({name, role, id, email}) {
        let roleInput = "";
        if (role === "Engineer") {
            roleInput = "GitHub Username";
        } else if (role === "Intern") {
            roleInput = "School Name";
        } else {
            roleInput = "Office Phone Number";
        }
        inquirer.prompt([{
            message: `Enter Employee ${roleInput}`,
            name: "roleInput"
        },
        {
            type: "list",
            message: "Add additional employees?",
            choices: ["yes","no"],
            name: "addMoreEmps"
        }])
        .then(function({roleInput, addMoreEmps}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInput);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInput);
            } else {
                newMember = new Manager(name, id, email, roleInput);
            }
            employees.push(newMember);
            addHtml(newMember)
            .then(function() {
                if (addMoreEmps === "yes") {
                    enterEmployees();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}


function generateHtml() {
    const html = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>THE TEAM!</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
       
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">THE TEAM!</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Session Started.");
}

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const github = member.getGithub();
            data = `
            <div class="card employee-card">
                <div class="card-header">
                    <h2 class="card-title">${ name }</h2>
                    <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${ role }</h3>
                </div>
                 <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${ id }</li>
                        <li class="list-group-item">Email: <a href="mailto:${ email }">${ email }</a></li>
                        <li class="list-group-item">GitHub Username: <a href="https://github.com/${ github }" target="_blank" rel="noopener noreferrer">${ github }</a></li>
                     </ul>
                </div>
            </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `
            <div class="card employee-card">
                <div class="card-header">
                    <h2 class="card-title">${ name }</h2>
                    <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${ role }</h3>
                 </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${ id }</li>
                        <li class="list-group-item">Email: <a href="mailto:${ email }">${ email }</a></li>
                        <li class="list-group-item">School: ${ school }</li>
                    </ul>
                </div>
            </div>`;
        } else {
            const officeNumber = member.getOfficeNumber();
            data = `
            <div class="card employee-card">
                <div class="card-header">
                    <h2 class="card-title">${ name }</h2>
                    <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${ role }</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${ id }</li>
                    <li class="list-group-item">Email: <a href="mailto:${ email }">${ email }</a></li>
                    <li class="list-group-item">Office Number: ${ officeNumber }</li>
                </ul>
            </div>
            </div>`
        }
        console.log("Action Complete.");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });    
    
}

function finishHtml() {
    const html = `
        </div>
     </div>
    
</body>
</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Session Ended. Thank you!");
}

promptStart();