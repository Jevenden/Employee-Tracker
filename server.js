import inquirer from "inquirer";
import db from "./config/connection.js";
// import table from "console.table";
// import questions from "./assist/questions.js";

async function menu() {
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
      if (userChoice.menu == "Add an employee") {
        addEmployee();
      }
    });
}
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    console.log("------------------------");
    restart();
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    console.log("------------------------");
    restart();
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    console.log("------------------------");
    restart();
  });
}

async function addDepo() {
  await inquirer
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
          console.log("------------------------");
          viewDepartments();
          restart();
        }
      );
    });
}

async function addRole() {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "title",
        validate: function (title) {
          if (title.length < 1) {
            return console.log("Please enter a valid role.");
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What is the expected salary for the role?",
        name: "salary",
        validate: function (salary) {
          if (salary.length < 1) {
            return console.log("Please enter a valid salary.");
          }
          return true;
        },
      },
      {
        type: "list",
        message:
          "Into what department does the new role fit? 1: Sales/Marketing, 2: Finance/Accounting, 3: Customer Service/HR, 4: Research and Development, 5: Production/Distribution",
        name: "department_id",
        choices: ["1", "2", "3", "4", "5"],
      },
    ])
    .then(function (userInput) {
      db.query(
        "INSERT INTO role(title, salary, department_id) values (?, ?, ?)",
        [userInput.title, userInput.salary, userInput.department_id],
        function (err, results) {
          console.log("Role has been created!");
          console.log("------------------------");
          viewRoles();
          console.log("------------------------");
          restart();
        }
      );
    });
}

async function addEmployee() {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
        validate: function (first_name) {
          if (first_name.length < 1) {
            return console.log("Please enter a valid first name.");
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
        validate: function (last_name) {
          if (last_name.length < 1) {
            return console.log("Please enter a valid last name.");
          }
          return true;
        },
      },
      {
        type: "list",
        message:
          "Into what department does the new employee fit? 1: Sales/Marketing, 2: Finance/Accounting, 3: Customer Service/HR, 4: Research and Development, 5: Production/Distribution",
        name: "department_id",
        choices: ["1", "2", "3", "4", "5"],
      },
      {
        type: "list",
        message:
          "Who will be the employee's new manager? 1: Sales/Marketing, 2: Finance/Accounting, 3: Customer Service/HR, 4: Research and Development, 5: Production/Distribution",
        name: "manager_id",
        choices: ["1", "2", "3", "4", "5"],
      },
    ])
    .then(function (userInput) {
      db.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)",
        [
          userInput.first_name,
          userInput.last_name,
          userInput.department_id,
          userInput.manager_id,
        ],
        function (err, results) {
          console.log("Employee has been added!");
          console.log("------------------------");
          viewEmployees();
          console.log("------------------------");
          restart();
        }
      );
    });
}

async function restart() {
  await inquirer
    .prompt({
      type: "confirm",
      message: "Would you like to do anything else?",
      name: "restart",
    })
    .then((restart) => {
      if (restart.restart) {
        console.log("------------------------");
        menu();
      }
    });
}

menu();
