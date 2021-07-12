const cTable = require('console.table');
const { listenerCount } = require('events');
const inquirer = require("inquirer");
const connection = require('./db/connection');

// get the client
const mysql = require('mysql2');

let addDepartment = (name) => {
    connection.query('INSERT INTO department SET name = ?',
    [name],
    function (error, results) {
        if (error) throw error;
    });
};

let addRole = (title, salary, department_id) => {
    connection.query('INSERT INTO role SET title = ?, salary = ?, department_id = ?',
    [title, salary, department_id],
    function (error, results) {
        if (error) throw error;
    });
};

let addEmployee = (first_name, last_name, role_id, manager_id) => {
    connection.query('INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?',
    [first_name, last_name, role_id, manager_id],
    function (error, results) {
        if (error) throw error;
    });
};

let updateEmployee = (role_id, id) => {
    connection.query(`UPDATE employee SET role_id=? WHERE id=?`,
    [role_id, id],
    function (error, results) {
        if (error) throw error;
    });
};

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role'
            ]
        }
    ])
    .then((answers) => {
        if (answers.options === 'view all departments') {
            connection.query(
                'SELECT * FROM `department`',
                function(err, results) {
                    console.table(results); // results contains rows returned by server
                }
            );
        }
        if (answers.options === 'view all roles') {
            connection.query(
                'SELECT role.title, role.id, department.name AS department_name, role.salary FROM role LEFT JOIN department ON role.department_id=department.id',
                function(err, results) {
                    console.table(results); // results contains rows returned by server
                }
            );
        }
        if (answers.options === 'view all employees') {
            connection.query(
                'SELECT employee.id, employee.first_name, employee.last_name, role.title AS employee_title, role.salary AS salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id=role.id;',
                function(err, results) {
                    console.table(results); // results contains rows returned by server
                }
            );
        }
        if (answers.options === 'add a department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newDepartment',
                    message: 'Enter the name of the department that you would like to add:'
                }
            ]).then(answers => {
                addDepartment(answers.newDepartment);
                console.log(`Department ${answers.newDepartment} added!`); 
                promptUser();
            })
        }
        if (answers.options === 'add a role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter the name of the role that you would like to add:'
                },
                {
                    type: 'number',
                    name: 'roleSalary',
                    message: 'Enter the salary of the role that you would like to add:' 
                },
                {
                    type: 'number',
                    name: 'roleDepartment',
                    message: 'Enter the department ID of the role that you would like to add:' 
                }
            ]).then(answers => {
                addRole(answers.roleName, answers.roleSalary, answers.roleDepartment);
                console.log(`Your new role ${answers.roleName} was successfully created!`);
                promptUser();
            })
        }
        if (answers.options === 'add an employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeFirstName',
                    message: 'Enter the first name of the employee that you would like to add:'
                },
                {
                    type: 'input',
                    name: 'employeeLastName',
                    message: 'Enter the last name of the employee that you would like to add:'
                },
                {
                    type: 'input',
                    name: 'employeeRole',
                    message: 'Enter the role ID for the employee that you would like to add:'
                },
                {
                    type: 'input',
                    name: 'employeeManager',
                    message: "Enter the ID of the employee's manager:" 
                }
            ]).then(answers => {
                addEmployee(answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
                console.log(`Your employee, ${answers.employeeFirstName}, has been successfully added!`);
                promptUser();
            })
        }
        if (answers.options === 'update an employee role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeUpdate',
                    message: 'Please enter the ID for the employee whose role you would like to update:'
                },
                {
                    type: 'input',
                    name: 'roleUpdate',
                    message: 'Please enter the role ID that you would like to update your selected employee to:'
                }
            ]).then(answers => {
                updateEmployee(answers.roleUpdate, answers.employeeUpdate);
                promptUser();
            })
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        } else {
        // Something else went wrong
        }
    });
}

promptUser();
