// -------- VARIABLES -------- //
let employees = [];
const apiURL = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const directoryBody = document.querySelector(".directory-body");
const overlay = document.querySelector(".overlay");
const popupContainer = document.querySelector(".popup-body");
const popupClose = document.querySelector(".popup-close");

// -------- FETCH -------- //



let fetchData = fetch(apiURL)
  .then(res => res.json())
  .then(res => res.resuls)
  .then(displayEmployees)
  .catch(err => console.log(err));


function displayEmployees(employeeData) {
  let employee = employeeData;
  let employeeHTML = ``;
  employees.forEach((employee, index) => {
    let name = employee.name;
  let email = employee.email;
  let city = employee.location.city;
  let picture = employee.picture;

    employeeHTML += `
    <div class="employee" data-index="${index}">
      <img class="employee-pic" src="${picture.large}">
        <div class="employee-text">
          <h3 class="name">${name.first} ${name.last}</h3>
          <a class="email" href="mailto:${email}" target="_blank">${email}</a>
          <p class="city">${city}</p>
        </div>
    </div>
    `
  });
  directoryBody.innerHTML = employeeHTML;
};
