INSERT INTO department (name)
VALUES  (Sales/Marketing),
        (Finance/Accounting),
        (Customer Service/Human Resources), 
        (Research and Development),
        (Production/Distribution);

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
        ("Destributor", 60000.00, 5),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bob", "Bobson", 1, NULL),
VALUES  ("Tim", "Timson", 1, 1),
VALUES  ("Fred", "Fredrickson", 1, NULL),
VALUES  ("Alex", "Alexander", 1, 1),
VALUES  ("Sara", "Sarahdon", 1, NULL),
VALUES  ("Betty", "Boop", 1, 1),
VALUES  ("Casey", "Sextits", 1, NULL),
VALUES  ("Preston", "Weenerton", 1, 1),
VALUES  ("Barristan", "Hargrove", 1, NULL),
VALUES  ("Sylon", "Forgefed", 1, 1),