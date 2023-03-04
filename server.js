const express = require('express');
const inquire = require(`inquirer`)
const cTable = require (`console.table`)
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
function init(){
inquire.prompt(employeeQuestions)
.then((data) => {
  console.log(data);
  if (data.optionslist === `View all departments`) {
    db.query(`SELECT * FROM department`, (err, result) => {
      if (err) {
        console.log(err);
        init();
      }
      console.log(result);
      init();
    });
  }

else if (data.optionslist === `View all roles`) {
  db.query(`SELECT * FROM employee_role`, (err, result) => {
    if (err) {
      console.log(err);
      init();
    }
    console.log(result);
    init();
  });
}
else if (data.optionslist === `View all employees`) {
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
/*
db.query(`SELECT * FROM department`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
db.query(`SELECT * FROM employee_role`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
db.query(`SELECT * FROM employee_info`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query('SELECT * FROM favorite_books', function (err, results) {
  console.log(results);
});
*/
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
init()