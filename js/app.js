// -------- VARIABLES -------- //
let employees = [];
const apiURL = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const directoryBody = document.querySelector(".directory-body");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup-body");
const popupClose = document.querySelector(".popup-close");
const searchField = document.getElementById("search");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
// -------- FETCH 12 EMPLOYEES -------- //

let fetchData = fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    const results = data.results;
    displayEmployees(results);
    console.log(results)
  })
  .catch(err => console.log("Help, I've fallen and can't get up", err));

function displayEmployees(employeeData) {
  employees = employeeData;
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
          <h2 class="name">${name.first} ${name.last}</h2>
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
  let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
  let date = new Date(dob.date);
  const popupHTML =  `
    <img class="employee-pic" src="${picture.large}">
    <div class="employee-text">
      <h2 class="name">${name.first} ${name.last}</h2>
        <a class="email" href="mailto:${email}" target="_blank">${email}</a>
      <p class="city">${city}</p>
      <hr>
      <p>${phone}</p>
      <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
      </p>
    </div>
  `;
  overlay.classList.remove("hidden");
  popupContainer.innerHTML = popupHTML;
}

// -------- CALL POPUP -------- //
directoryBody.addEventListener("click", (e) => {
    if(e.target !== directoryBody) {
      const employee = e.target.closest(".employee");
      const index = employee.getAttribute("data-index");
      displayPopup(index);

// -------- NAVIGATE BETWEEN POPUPS -------- //
    let employeeNumber = parseInt(index);

    previous.addEventListener('click', e => {
        if (employeeNumber > 0) {
          employeeNumber -= 1;
          displayPopup(employeeNumber);
        } else if (employeeNumber === 0) {
          employeeNumber = 11;
          displayPopup(employeeNumber);
        }
      });
    next.addEventListener('click', e => {
        if (employeeNumber < 11) {
          employeeNumber += 1;
          displayPopup(employeeNumber);
        } else if (employeeNumber === 11) {
          employeeNumber = 0;
          displayPopup(employeeNumber);
        }
      });
}});

// -------- CLOSE POPUP -------- //
popupClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

// -------- SEARCH FOR EMPLOYEES -------- //

function employeeSearch() {
  let searchValue = searchField.value.toLowerCase();
  let employee = document.querySelectorAll('.employee');
  let employeeInfo = document.querySelectorAll('.employee-text');
  for (let i = 0; i < employee.length; i++) {
    let title = employeeInfo[i].getElementsByTagName("h2")[0];
    let name = title.textContent;
    if (name.toLowerCase().indexOf(searchValue) > -1) {
      employee[i].style.display = "";
    } else {
      employee[i].style.display = "none";
    }
  }
};
searchField.addEventListener("keyup", (e) => employeeSearch());
