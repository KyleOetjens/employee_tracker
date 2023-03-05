const express = require('express');
const inquire = require(`inquirer`)
const cTable = require(`console.table`)
const employeeQuestions = require(`./questions`)
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
      console.log(data);
      if (data.optionslist === `View all departments`) {
        db.query(`SELECT * FROM department`, (err, result) => {
          if (err) {
            console.log(err);
            init();
          }
          console.table(result);
          init();
        });
      }

      else if (data.optionslist === `View all roles`) {
        db.query(`SELECT * FROM employee_role`, (err, result) => {
          if (err) {
            console.log(err);
            init();
          }
          console.table(result);
          init();
        });
      }
      else if (data.optionslist === `View all employees`) {
        db.query(`SELECT * FROM employee_info`, (err, result) => {
          if (err) {
            console.log(err);
            init();
          }
          console.table(result);
          init();
        });
      }
      else if (data.optionslist === `Add a department`) {
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
      else if (data.optionslist === `Add a role`) {
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
            })};
      })}
          else if (data.optionslist === `Add an employee`) {
            const sql = `INSERT INTO employee_info (first_name,last_name,role_id,manager_id)
            VALUES(?,?,?,?)`
            const param = [data.empFirstName,data.empLastName,data.empRole,data.empManager]
            db.query(sql,param, (err, result) => {
              if (err) {
                console.log(err);
                init();
              }
              if (result){
                db.query(`SELECT * FROM employee_info`,(err,result)=>{
              console.table(result);
              init();
            })};
           })}
          else if (data.optionslist === `Update employee role`) {
            db.query(`SELECT * FROM employee_info`, (err, result) => {
              if (err) {
                console.log(err);
                init();
              }
              console.log(result);
              init();
            });
          }
        })
      }
      app.use((req, res) => {
        res.status(404).end();
      });

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      
      init();