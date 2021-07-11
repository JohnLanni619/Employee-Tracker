const cTable = require('console.table');
const inquirer = require("inquirer");

// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Stark590127!',
  database: 'employee_tracker'
});

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
            console.log('add a department is being recognized!');
        }
        if (answers.options === 'add a role') {
            console.log('add a role path is being recognized!');
        }
        if (answers.options === 'add an employee') {
            console.log('add an employee path is being recognized!');
        }
        if (answers.options === 'update an employee role') {
            console.log('update an employee role is being recognized!');
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
