const inquire = require(`inquirer`)
const cTable = require(`console.table`)
const employeeQuestions = require(`./questions`)
const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: '',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

// Query database
function init() {
  inquire.prompt(employeeQuestions)
    .then((data) => {
      switch (data.optionslist) {
        case `View all departments`: {
          db.query(`SELECT * FROM department`, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            console.table(result);
            init();
          });
        }
          break;
        case `View all roles`: {
          db.query(`SELECT title, e.id, department_name, salary FROM employee_role e
          JOIN department d ON e.department_id = d.id;`, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            console.table(result);
            init();
          });
        }
          break;
        case `View all employees`: {
          db.query(`SELECT e.id, e.first_name, e.last_name, title, department_name, salary, m.first_name AS Manager
          FROM employee_info e
          LEFT JOIN employee_info m ON e.manager_id = m.id 
          JOIN employee_role r on e.role_id = r.id
          JOIN department d ON r.department_id = d.id;`, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            console.table(result);
            init();
          });
        }
          break;
        case `Add a department`: {
          const sql = `INSERT INTO department (department_name)
VALUES(?)`;
          const param = data.deptName
          db.query(sql, param, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            if (result) {
              db.query(`SELECT * FROM department`, (err, result) => {
                console.table(result);
                init();
              })
            }
          });
        }
          break;
        case `Add a role`: {
          const sql = `INSERT INTO employee_role (title,salary,department_id)
          VALUES(?,?,?)`
          const param = [data.roleName, data.salRole, data.roleDept];
          db.query(sql, param, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            if (result) {
              db.query(`SELECT * FROM employee_role`, (err, result) => {
                console.table(result);
                init();
              })
            };
          })
        }
          break;
        case `Add an employee`: {
          const sql = `INSERT INTO employee_info (first_name,last_name,role_id,manager_id)
          VALUES(?,?,?,?)`
          const param = [data.empFirstName, data.empLastName, data.empRole, data.empManager]
          db.query(sql, param, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            if (result) {
              db.query(`SELECT * FROM employee_info`, (err, result) => {
                console.table(result);
                init();
              })
            };
          })
        }
          break;
        case `Update employee role`: {
          db.query(`SELECT * FROM employee_info`, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            const newList = result.map(({ id, first_name }) => ({
              value: id,
              name: first_name
            }))
            inquire.prompt([{
              type: 'list',
              message: `Please select the employee to update`,
              choices: newList,
              name: 'UempUpdate',
            },])
              .then((data) => {
                let updateemp = data.UempUpdate
                db.query(`SELECT * from employee_role`, (err, result) => {
                  if (err) {
                    console.log(err);
                    init();
                  }
                  const newrole = result.map(({ id, title }) => ({
                    value: id,
                    name: title
                  }))
                  inquire.prompt([{
                    type: 'list',
                    message: `Please select the new role`,
                    choices: newrole,
                    name: 'roleUpdate',
                  },])
                    .then((data) => {
                      console.log(data);
                      let roleUpdate = data.roleUpdate
                      let sql = `UPDATE employee_info SET role_id = ?
                WHERE id = ?`
                      let params = [roleUpdate, updateemp];
                      db.query(sql, params, (err, result) => {
                        if (err) {
                          console.log(err);
                          init();
                        }
                        if (result) {
                          db.query(`SELECT * FROM employee_info`, (err, result) => {
                            console.table(result);
                            init();
                          })
                        };
                      })
                    })
                });
              })
          })
        }
          break;
        case `Update employee manager`: {
          let licenseBadge = `![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)`
          let licenseLink = `https://opensource.org/licenses/EPL-1.0`
          let licenseMd = '## License'
          generateMarkdown(data, licenseBadge, licenseMd, licenseLink)
        }
          break;
        case `View employees by manager`: {
          const sql = `SELECT concat(m.last_name, ', ', m.first_name) AS Manager, 
          concat(e.last_name, ', ', e.first_name) AS 'Direct Report' 
          FROM employee_info e INNER JOIN employee_info m ON m.id = e.manager_id 
          ORDER BY Manager`
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            if (result) {
              console.table(result);
              init();
            };
          })
        }
          break;
        case `View employees by department`: {
          const sql = `SELECT concat(e.last_name, ', ', e.first_name) AS Employee, 
          department_name AS Department 
          FROM employee_info e  JOIN employee_role r ON e.role_id = r.id 
          JOIN department d ON r.department_id = d.id
          ORDER BY Department;`
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            if (result) {
              console.table(result);
              init();
            };
          })
        }
          break;
        case `Delete Department`: {
          const sql = `SELECT concat(e.last_name, ', ', e.first_name) AS Employee, 
          department_name AS Department 
          FROM employee_info e  JOIN employee_role r ON e.role_id = r.id 
          JOIN department d ON r.department_id = d.id
          ORDER BY Department;`
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            if (result) {
              console.table(result);
              init();
            };
          })
        }
          break;
        case `Delete Role`: {
          const sql = `SELECT concat(e.last_name, ', ', e.first_name) AS Employee, 
          department_name AS Department 
          FROM employee_info e  JOIN employee_role r ON e.role_id = r.id 
          JOIN department d ON r.department_id = d.id
          ORDER BY Department;`
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            if (result) {
              console.table(result);
              init();
            };
          })
        }
          break;
        //Code I just couldnt quite get 
        case `Delete Employee`: {
          db.query(`SELECT * FROM employee_info;`, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            const dEmp = result.map(({ id, first_name }) => ({
              value: id,
              name: first_name
            }))
            inquire.prompt([{
              type: 'list',
              message: `Please select the employee to delete`,
              choices: dEmp,
              name: 'UempUpdate',
            },])
              .then((data) => {
                let updateemp = data.UempUpdate
                const sql1 = `DELETE from employee_info WHERE id = ?`;
                const param1 = [updateemp]
                db.query(sql1, param1, (err, result) => {
                  if (err) {
                    console.log(err);
                    init();
                  }
                  if (result) {
                    db.query(`SELECT * FROM employee_info`, (err, result) => {
                      console.table(result);
                      init();
                    })
                  };
                })
              })

            console.table(result);
            init();

          })
        }
          break;
        case `See total budget by department`: {
          const sql = `SELECT department_name AS Department, SUM(salary) AS Utilized_Budget
          FROM department JOIN employee_role ON department.id = employee_role.department_id
          JOIN employee_info on employee_role.id = employee_info.role_id
          GROUP BY Department;`
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
              init();
            }
            if (result) {
              console.table(result);
              init();
            };
          })
        }
          break;
        case `See total budget on select department`: {
          let licenseBadge = ``
          let licenseLink = ``
          let licenseMd = ''
          generateMarkdown(data, licenseBadge, licenseMd, licenseLink)
        }
      }
    }
    )
}
init();


