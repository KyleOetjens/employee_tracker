INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Services"),
       ("Finance"),
       ("Marketing"),
       ("Digital Technology");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Director",100000,1),
       ("Driver",70000,2),
       ("Accountant",85000,3),
       ("Brand Manager",85000,4),
       ("Developer",90000,5);
       
INSERT INTO employee_info (first_name, last_name, role_id)
VALUES ("Jon","Doe",1),
       ("Jane","Doe",2),
       ("Jim","Lee",3),
       ("Jill","Lee",4),
       ("Jack","Black",5);