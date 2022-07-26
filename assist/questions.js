import inquirer from "inquirer";

export default questions = {
  viewDepartments() {
    db.query("SELECT * FROM department", function (err, results) {
      console.table(results);
    });
  },
};
