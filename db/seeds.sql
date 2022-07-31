INSERT INTO department (name)
VALUES  ("Sales and Marketing"),
        ("Finance and Accounting"),
        ("Human Resources"), 
        ("Research and Development"),
        ("Production and Distribution");

INSERT INTO role (title, salary, department_id)
VALUES  ("Head of Marketing", 120000.00, 1), 
        ("Sales Associate", 60000.00, 1),
        ("Head of Finance/Accounting", 120000.00, 2),
        ("Accountant", 60000.00, 2), 
        ("Head of HR", 120000.00, 3), 
        ("HR Associate", 60000.00, 3),
        ("Head of R&D", 120000.00, 4),
        ("Researcher", 60000.00, 4),
        ("Production Manager", 120000.00, 5),
        ("Destributor", 60000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bob", "Bobson", 1, NULL),
          ("Tim", "Timson", 2, 1),
          ("Fred", "Fredrickson", 3, NULL),
          ("Alex", "Alexander", 4, 3),
          ("Sara", "Sarahdon", 5, NULL),
          ("Betty", "Boop", 6, 5),
          ("Casey", "Goodgirl", 7, NULL),
          ("Preston", "Wenster", 8, 7),
          ("Barristan", "Hargrove", 9, NULL),
          ("Sylon", "Forgefed", 10, 9);