// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');


 const employeesArray = [];
// Collect employee data

const collectEmployees = function() {
  // done: Get user input to create and return an array of employee objects
  //addNew variable is for the while loop below 
  let addNew = true;
  while (addNew) {
  let firstName = prompt ("What is the employee's first name?");
    if (firstName === null) { 
      break;
    };
  let lastName = prompt ("What is the employee's last name?");
  if (lastName === null) { 
    firstName = null;
    break;
  };
  let salary = prompt ("What is the employee's salary?");
  //Done: Add is NaN for salary above
  //while loop ensures user cannot proceed until a number is entered  
  //This better functionality than the instructions request.
  //however, it's not the instructions so...
    //while loop is commented out below
 /* while (isNaN (salary)) {
      salary = Number(prompt ("Please enter a numeric value"));
    }*/
    
    if (salary === null) {
      salary = Number(0);
      //Matches instructions and injects value 0
    } else if (isNaN(salary)) {
      alert ("That is not a numeric value.  A default value of 0 has been entered.");
      //will return an average salary of NaN
      salary = Number(0);
    } else {
      salary = Number(salary);
    
    };

   
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
  
// Display the average salary
const displayAverageSalary = function(employeesArray) {
  
  let salarySum = 0;
  let averageSalary = 0;
  // done: Calculate and display the average salary
  //Need to build a new array by using the array.map function
  //Arrow function is way less cumbersome than a for loop (a for loop does the job though)
  const salaryArray = employeesArray.map(employeesArray => employeesArray.salary);
  //console.log(salaryArray)
  if (employeesArray.length > 0) {
    
  
  for (let i = 0; i < salaryArray.length; i++) {
   //the self add function!  Yes.  Clean.  salarySum +=
    salarySum += salaryArray[i]
    //console.log(salarySum)
  }
  //Math.round(number * 100) / 100 gives you 2 decimal places
  averageSalary  = Math.round((salarySum / salaryArray.length) * 100) / 100;
  console.log(`Number of Employees: ${employeesArray.length}`)
  console.log(`Average Salary: \$ ${averageSalary}`)
  return averageSalary;
  }else {
    console.log(`Number of Employees: 0`)
    console.log(`Average Salary: $0`)
  }
};
let randomEmployee = 0;
//random 0 will be the 0 index value for randomEmployee
let randomZero = 0;
// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // done: Select and display a random employee
  //if there are no employees, skip it.  Can't figure out why break didn't work here
  //but this will get the job done
  if (employeesArray.length > 0) {
  //Math.floor(Math.random()) is 1 indexed.  Remember to include last element
  //console.log(employeesArray.length);
  randomEmployee = Math.floor(Math.random() * employeesArray.length + 1);
  randomZero = randomEmployee - 1
  //console.log(randomEmployee);
  //console.log(employeesArray[randomZero]);
  
  console.log(`${employeesArray[randomZero].firstName} ${employeesArray[randomZero].lastName} You have been selected at Random.`);
  } else {
    console.log(`There are no employees to choose from`)
  }
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
