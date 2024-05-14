// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
//addNew variable is for the while loop below 
let addNew = true;
 const employeesArray = [];
// Collect employee data

const collectEmployees = function() {
  // done: Get user input to create and return an array of employee objects
  while (addNew) {
  let firstName = prompt ("What is the employee's first name?");
  let lastName = prompt ("What is the employee's last name?");
  let salary = Number(prompt ("What is the employee's salary?"));
  //Done: Add is NaN for salary above
  //while loop ensures user cannot proceed until a number is entered  
  //This better functionality than the instructions request.
  //however, it's not the instructions so...

 /* while (isNaN (salary)) {
      salary = Number(prompt ("Please enter a numeric value"));
    }*/
    //Matches instructions and injects value 0
    if (isNaN(salary)) {
      alert ("That is not a numeric value.  A default value of 0 has been entered.");
      salary = Number(0);
    }
  //The push method adds to the end of the array.  Per Readme, needs label and value (label: string) 
  employeesArray.push ( {
    firstName: firstName,
    lastName: lastName, 
    salary: salary
  });

  addNew = confirm ("Would you like to Add another employee?");
    
  if (!addNew) {
      //console.log(addNew)
      //console.log(employeesArray)
      break;
    }
  }
  //Once the array is built, don't forget to return it so functions below
  //can use it
  return employeesArray;
};
  let salarySum = 0;
  let averageSalary = 0;
// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // done: Calculate and display the average salary
  //Need to build a new array by using the array.map function
  //Arrow function is way less cumbersome than a for loop (a for loop does the job though)
  const salaryArray = employeesArray.map(employeesArray => employeesArray.salary);
  //console.log(salaryArray)
  for (let i = 0; i < salaryArray.length; i++) {
   //the sum function!  Yes.  Clean.  salarySum +=
    salarySum += salaryArray[i]
    //console.log(salarySum)
  }
  //Math.round(number * 100) / 100 gives you 2 decimal places
  averageSalary  = Math.round((salarySum / salaryArray.length) * 100) / 100;
  console.log(`Number of Employees: ${employeesArray.length}`)
  console.log(`Average Salary: \$ ${averageSalary}`)
  return averageSalary;
  
};
let randomEmployee = 0;
//random 0 will be the 0 index value for randomEmployee
let randomZero = 0;
// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // done: Select and display a random employee
  //Math.floor(Math.random()) is 1 indexed.  Remember to include last element
  //console.log(employeesArray.length);
  randomEmployee = Math.floor(Math.random() * employeesArray.length + 1);
  randomZero = randomEmployee - 1
  //console.log(randomEmployee);
  //console.log(employeesArray[randomZero]);
  console.log(`${employeesArray[randomZero].firstName} ${employeesArray[randomZero].lastName} You have been selected at Random.`);
};
/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
