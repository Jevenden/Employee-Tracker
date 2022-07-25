import inquirer from "inquirer";

const questions = async () => {
  const answers = await inquirer.prompt([
    {
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
    },
    {
      type: "input",
      message: "What is the name of the new department?",
      name: "newDep",
      when: ({ menu }) => menu == "Add a department",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log("Please enter a valid department name.");
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is the name of the role?",
      name: "newRole",
      when: ({ menu }) => menu == "Add a role",
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
      name: "newRoleSal",
      when: ({ menu }) => menu == "Add a role",
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
      name: "newRoleDep",
      when: ({ menu }) => menu == "Add a role",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log("Please enter a valid department.");
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is the new employee's first name?",
      name: "newEmpFirst",
      when: ({ menu }) => menu == "Add an employee",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log("Please enter a valid name.");
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is the new employee's last name?",
      name: "newEmpLast",
      when: ({ menu }) => menu == "Add an employee",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log("Please enter a valid name.");
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What will the new employee's role be?",
      name: "newEmpRole",
      when: ({ menu }) => menu == "Add an employee",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log("Please enter a valid role.");
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Who will be the new employee's manager?",
      name: "newEmpMan",
      when: ({ menu }) => menu == "Add an employee",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log("Please enter a valid manager.");
        }
        return true;
      },
    },
  ]);
};

export default questions;
