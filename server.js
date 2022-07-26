import inquirer from "inquirer";
import db from "./config/connection.js";
import table from "console.table";
// import questions from "./assist/questions.js";

// questions();

function menu() {
  return inquirer
    .prompt({
      type: "list",
      message:
        "Welcome to the Employee Tracker database! What would you like to do?",
      name: "menu",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then(function (userChoice) {
      if (userChoice.menu == "View all departments") {
        viewDepartments();
      }
      if (userChoice.menu == "View all roles") {
        viewRoles();
      }
      if (userChoice.menu == "View all employees") {
        viewEmployees();
      }
      if (userChoice.menu == "Add a department") {
        addDepo();
      }
      if (userChoice.menu == "Add a role") {
        addRole();
      }
    });
}
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
}

function addDepo() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the new department?",
      name: "newDep",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log("Please enter a valid department name.");
        }
        return true;
      },
    })
    .then(function (userInput) {
      db.query(
        "INSERT INTO department(name) values (?)",
        [userInput.newDep],
        function (err, results) {
          console.log("Department has been created!");
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "title",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("Please enter a valid role.");
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What is the expected salary for the role?",
        name: "salary",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("Please enter a valid salary.");
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What department does the new role fall into?",
        name: "departmnt_id",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("Please enter a valid department.");
          }
          return true;
        },
      },
    ])
    .then(function (userInput) {
      db.query(
        "INSERT INTO role(title, salary, department_id) values (?, ?, ?)",
        [userInput.title, userInput.salary, userInput.department_id],
        function (err, results) {
          console.log("Role has been created!");
          console.log(results);
        }
      );
    });
}

menu();
