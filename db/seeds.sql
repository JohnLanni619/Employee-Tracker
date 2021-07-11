INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Personal Training'),
    ('Aquatics'),
    ('Pilates'),
    ('Customer Service'),
    ('Nursing'),
    ('Maintenance');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Personal Trainer', '50000', '2'),
    ('Membership Counselor', '40000', '1'),
    ('Receptionist', '30000', '5'),
    ('Nurse', '60000', '6'),
    ('Pilates Instructor', '50000', '4'),
    ('Maintenance Technician', '50000', '7'),
    ('General Manager', '90000', '1'),
    ('Personal Training Manager', '100000', '2'),
    ('Aquatics Manager', '70000', '3'),
    ('Pilates Manager', '60000', '4'),
    ('Member Services Manager', '600000', '5');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Greg', 'Goldfarb', '7', '0'),
    ('Craig', 'Russel', '8', '1'),
    ('Lindley', 'Daboy', '9', '1'),
    ('Travis', 'Mattingly', '10', '1'),
    ('Lance', 'Crow', '11', '1'),
    ('Jim', 'Flynn', '1', '2'),
    ('Kevin', 'Zatz', '2', '1'),
    ('Dylan', 'Berger', '3', '5'),
    ('Guy', 'Song', '4', '1'),
    ('Kyle', 'Delrey', '5', '4'),
    ('Jack', 'Zedley', '6', '1');





