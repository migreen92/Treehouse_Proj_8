// -------- VARIABLES -------- //
let employees = [];
const apiURL = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const directoryBody = document.querySelector(".directory-body");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup-body");
const popupClose = document.querySelector(".popup-close");

// -------- FETCH 12 EMPLOYEES -------- //

let fetchData = fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    const results = data.results;
    displayEmployees(results);
    console.log(results)
  })
  .catch(err => console.log("Help, I've falled and can't get up", err));

function displayEmployees(employeeData) {
  let employees = employeeData;
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

// -------- CREATE EMPLOYEE POPUP -------- //

function displayPopup(index) {
  // popup.setAttribute("class", "popup-body");
  // popup.style.display = "block";

  let {
        name, dob, phone, email, location: {
          city, street, state, postcode
        },
      picture
    } = employees[index];
  let date = new Date(dob.date);
  const popupHTML =  `
    <img class="employee-pic" src="${picture.large}">
    <div class="employee-text">
      <h3 class="name">${name} ${name}</h3>
        <a class="email" href="mailto:${email}" target="_blank">${email}</a>
      <p class="city">${city}</p>
      <hr>
      <a>${phone}</a>
      <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
      <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
      </p>
    </div>
  `;
  overlay.classlist.remove("hidden");
  popupContainer.innerHTML = popupHTML;
}

// -------- CALL POPUP -------- //
directoryBody.addEventListener("click", (e) => {
    if(e.target !== directoryBody) {
      const employee = e.target.closest(".employee");
      const index = employee.getAttribute("data-index");
      displayPopup(index);
    }
  }
);
