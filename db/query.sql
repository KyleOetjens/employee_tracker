SELECT concat(m.last_name, ', ', m.first_name) AS Manager, 
concat(e.last_name, ', ', e.first_name) AS 'Direct Report' 
FROM employee_info e INNER JOIN employee_info m ON m.id = e.manager_id 
ORDER BY Manager;

SELECT concat(e.last_name, ', ', e.first_name) AS Employee, 
department_name AS Department 
FROM employee_info e  JOIN employee_role r ON e.role_id = r.id 
JOIN department d ON r.department_id = d.id
ORDER BY Department;

SELECT department_name AS Department, SUM(salary) AS Utilized_Budget
FROM department JOIN employee_role ON department.id = employee_role.department_id
JOIN employee_info on employee_role.id = employee_info.role_id
GROUP BY Department;

SELECT title, e.id, d.department_name, r.salary FROM employee_role e
JOIN department d ON e.department_id = d.id;

SELECT e.id, e.first_name, e.last_name, title, department_name, salary, m.first_name AS Manager
FROM employee_info e
LEFT JOIN employee_info m ON e.manager_id = m.id 
JOIN employee_role r on e.role_id = r.id
JOIN department d ON r.department_id = d.id;
