const employeeQuestions =[
    {
        type: 'list',
        message: `What would you like to do?`,
        choices: [`View all departments`, `View all roles`,`View all employees`,`Add a department`,`Add a role`,`Add an employee`,`Update employee role`],
        name: 'optionslist',
    },  {
        type: 'input',
        message: 'What is the department name',
        name: 'engGitUn',
        when: (employee) => employee.optionslist === 'Add a department'
    },
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'intSchool',
        when: (employee) => employee.optionslist === 'Add a role'
    },{
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'intSchool',
        when: (employee) => employee.optionslist === 'Add a role'
    },{
        type: 'input',
        message: 'What is the department of the role?',
        name: 'intSchool',
        when: (employee) => employee.optionslist === 'Add a role'
    },{
        type: 'input',
        message: `What is the employee's first name?`,
        name: 'intSchool',
        when: (employee) => employee.optionslist === 'Add an employee'
    },{
        type: 'input',
        message: `What is the employee's last name`,
        name: 'intSchool',
        when: (employee) => employee.optionslist === 'Add an employee'
    },{
        type: 'input',
        message: `What is the employee's role`,
        name: 'intSchool',
        when: (employee) => employee.optionslist === 'Add an employee'
    },{
        type: 'input',
        message: `Please add the employee's manager if applicable`,
        name: 'intSchool',
        when: (employee) => employee.optionslist === 'Add an employee'
    },
]
module.exports = employeeQuestions