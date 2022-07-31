import inquirer from "inquirer";
import db from "./config/connection.js";

function dbQuery(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
}

db.connect((err) => {
  if (err) throw err;
  menu();
});

async function menu() {
  await inquirer
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
        "Exit the program",
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
      if (userChoice.menu == "Update an employee role") {
        upEmployee();
      }
      if (userChoice.menu == "Exit the program") {
        console.log("Program exited");
        process.exit();
      }
    });
}

function viewDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    console.log("------------------------");
    menu();
  });
}

function viewRoles() {
  db.query(
    "SELECT role.ID AS 'ID', role.title AS 'Title', department.name AS 'Department', role.salary AS 'Salary' FROM role JOIN department ON role.department_id = department.id;",
    (err, results) => {
      if (err) throw err;
      console.table(results);
      console.log("------------------------");
      menu();
    }
  );
}

function viewEmployees() {
  db.query(
    "SELECT a.id AS 'ID', a.first_name AS 'First Name', a.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(b.first_name, ' ', b.last_name) AS 'Manager' FROM employee a JOIN role ON a.role_id = role.id JOIN department ON role.department_id = department.id LEFT OUTER JOIN employee b ON a.manager_id = b.id;",
    (err, results) => {
      if (err) throw err;
      console.table(results);
      console.log("------------------------");
      menu();
    }
  );
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
        "INSERT INTO department (name) values (?)",
        [userInput.newDep],
        function (err, results) {
          if (err) throw err;
          console.log("Department has been created!");
          console.log("------------------------");
          viewDepartments();
        }
      );
    });
}

async function addRole() {
  let departmentList = await dbQuery({
    sql: "SELECT name FROM department",
    rowsAsArray: true,
  });
  departmentList = departmentList.flat();
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
          if ((salary = !Number)) {
            return console.log("Please enter a valid salary.");
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Into what department does the new role fit?",
        name: "department_id",
        choices: departmentList,
      },
    ])
    .then(async function (userInput) {
      let newRoleDepID = await dbQuery(
        `SELECT id FROM department WHERE name = '${userInput.department_id}';`
      );
      newRoleDepID = newRoleDepID[0].id;
      db.query(
        "INSERT INTO role(title, salary, department_id) values (?, ?, ?)",
        [userInput.title, userInput.salary, newRoleDepID],
        function (err, results) {
          if (err) throw err;
          console.log("Role has been created!");
          viewRoles();
          console.log("------------------------");
        }
      );
    });
}

async function addEmployee() {
  let roleList = await dbQuery({
    sql: "SELECT title FROM role",
    rowsAsArray: true,
  });
  roleList = roleList.flat();
  let managerList = await dbQuery({
    sql: "SELECT CONCAT(first_name, ' ', last_name) FROM employee WHERE manager_id is NULL",
    rowsAsArray: true,
  });
  managerList = managerList.flat();
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
        message: "What will be the new employee's role?",
        name: "department_id",
        choices: roleList,
      },
      {
        type: "list",
        message: "Who will be the employee's new manager?",
        name: "manager_id",
        choices: managerList,
      },
    ])
    .then(async function (userInput) {
      let newEmpRoleID = await dbQuery(
        `SELECT id FROM role WHERE title = "${userInput.department_id}";`
      );
      newEmpRoleID = newEmpRoleID[0].id;
      const manNameArr = userInput.manager_id.split(" ");
      let newEmpManID = await dbQuery(
        `SELECT id FROM employee WHERE first_name = '${manNameArr[0]}' AND last_name = '${manNameArr[1]}';`
      );
      newEmpManID = newEmpManID[0].id;
      db.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)",
        [userInput.first_name, userInput.last_name, newEmpRoleID, newEmpManID],
        function (err, results) {
          if (err) throw err;
          console.log("Employee has been added!");
          viewEmployees();
          console.log("------------------------");
        }
      );
    });
}

async function upEmployee() {
  let empToUp = await dbQuery({
    sql: "SELECT CONCAT(first_name, ' ', last_name) FROM employee",
    rowsAsArray: true,
  });
  empToUp = empToUp.flat();
  let newRole = await dbQuery({
    sql: "SELECT title FROM role",
    rowsAsArray: true,
  });
  newRole = newRole.flat();
  await inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee do you wish to update?",
        name: "empChoice",
        choices: empToUp,
      },
      {
        type: "list",
        message: "What will the employee's new role be?",
        name: "newEmpRole",
        choices: newRole,
      },
    ])
    .then(async function (userInput) {
      let upEmpRoleID = await dbQuery(
        `SELECT id FROM role WHERE title = '${userInput.newEmpRole}';`
      );
      upEmpRoleID = upEmpRoleID[0].id;
      const empNameToArray = userInput.empChoice.split(" ");
      let upEmpID = await dbQuery(
        `SELECT id FROM employee WHERE first_name = '${empNameToArray[0]}' AND last_name = '${empNameToArray[1]}'`
      );
      upEmpID = upEmpID[0].id;
      db.query(
        `UPDATE employee SET role_id = '${upEmpRoleID}' WHERE id = '${upEmpID}';`,
        function (err, results) {
          if (err) throw err;
          console.log("Role has been updated!");
          viewEmployees();
          console.log("------------------------");
        }
      );
    });
}
