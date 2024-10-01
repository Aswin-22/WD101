let usrForm = document.getElementById("regForm");

const retriveEntries = () => {
  let entries = localStorage.getItem("User_data");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let usrEntries = retriveEntries();

const displayEntries = () => {
  const entries = retriveEntries();

  const tableEntries = entries
    .map((entry) => {
      const namecell = `<td class="border px-4 py-2">${entry.name}</td>`;
      const emailcell = `<td class="border px-4 py-2">${entry.email}</td>`;
      const pwdcell = `<td class="border px-4 py-2">${entry.pwd}</td>`;
      const dobcell = `<td class="border px-4 py-2">${entry.dob}</td>`;
      const termsCell = `<td class="border px-4 py-2">${
        entry.terms ? "true" : "false"
      }</td>`;

      const row = `<tr>${namecell} ${emailcell} ${pwdcell} ${dobcell} ${termsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full"><tr>
  <th class="px-4 py-2">Name</th>
  <th class="px-4 py-2">Email</th>
  <th class="px-4 py-2">password</th>
  <th class="px-4 py-2">DOB</th>
  <th class = "px-4 py-2">Accepted Terms?</th>
  </tr><tbody>${tableEntries}</tbody></table>`;

  let details = document.getElementById("usr-entries");
  details.innerHTML = table;
};

const saveForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  const terms = document.getElementById("terms").checked;

  const entry = {
    name,
    email,
    pwd,
    dob,
    terms,
  };

  usrEntries.push(entry);
  displayEntries();

  localStorage.setItem("User_data", JSON.stringify(usrEntries));
};

usrForm.addEventListener("submit", saveForm);

const dobInput = document.getElementById("dob");

dobInput.addEventListener("change", function () {
  const selectedDate = new Date(this.value);
  const today = new Date();
  const minDate = new Date();
  const maxDate = new Date();

  minDate.setFullYear(today.getFullYear() - 55);
  maxDate.setFullYear(today.getFullYear() - 18);

  if (selectedDate > maxDate || selectedDate < minDate) {
    this.value = "";
  }
});

const minDateStr = new Date(
  new Date().setFullYear(new Date().getFullYear() - 55)
)
  .toISOString()
  .split("T")[0];
const maxDateStr = new Date(
  new Date().setFullYear(new Date().getFullYear() - 18)
)
  .toISOString()
  .split("T")[0];
dobInput.setAttribute("min", minDateStr);
dobInput.setAttribute("max", maxDateStr);
