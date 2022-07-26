INSERT INTO department (name)
VALUES  ("Sales/Marketing"),
        ("Finance/Accounting"),
        ("Customer Service/HR"), 
        ("Research and Development"),
        ("Production/Distribution");

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
          ("Tim", "Timson", 1, 1),
          ("Fred", "Fredrickson", 2, NULL),
          ("Alex", "Alexander", 2, 2),
          ("Sara", "Sarahdon", 3, NULL),
          ("Betty", "Boop", 3, 3),
          ("Casey", "Sextits", 4, NULL),
          ("Preston", "Weenerton", 4, 4),
          ("Barristan", "Hargrove", 5, NULL),
          ("Sylon", "Forgefed", 5, 5);