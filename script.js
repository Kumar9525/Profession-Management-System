let name = document.getElementById("nameBox");
let prof = document.getElementById("proBox");
let age = document.getElementById("ageBox");
let add = document.getElementById("addUser");
let container = document.getElementById("container");
let msg = document.getElementById("msg-ref");

function addSubmit() {
  let display = [];
  let id = "id" + Math.random().toString(16).slice(2);

  if (name.value === "" || prof.value === "" || age.value === "") {
    msg.innerHTML = `<span class="error-message">Error: Please make sure all the fields are filled before adding an employee.</span>`;
    return;
  } else {
    msg.innerHTML = `<span class="success-message">Success: Employee Added</span>`;
  }

  let localData = JSON.parse(localStorage.getItem("data"));
  display.push({
    _id: id,
    name: name.value,
    profession: prof.value,
    age: age.value,
  });

  if (localData) {
    localStorage.setItem("data", JSON.stringify([...localData, ...display]));
  } else {
    localStorage.setItem("data", JSON.stringify(display));
  }

  createElement();
  // Reset the input fields
  document.getElementById("nameBox").value = "";
  document.getElementById("proBox").value = "";
  document.getElementById("ageBox").value = "";
}

function handleDelete(id) {
  let resultData = JSON.parse(localStorage.getItem("data"));
  let res = resultData.filter((val) => val._id !== id);
  localStorage.setItem("data", JSON.stringify(res));
  createElement();
}

function createElement() {
  let resultData = JSON.parse(localStorage.getItem("data"));

  if (resultData.length > 0) {
    container.innerHTML = resultData
      .map((val) => {
        return `
                <div class="list_box">
                    <div class="paraContainer">
                        <p>${val.name}</p>
                        <p>${val.profession}</p>
                        <p>${val.age}</p>
                    </div>
                    <button onclick="handleDelete('${val._id}')">Delete</button>
                </div>
            `;
      })
      .join("");
  } else {
    container.innerHTML = `<div class="data_not_found">Data not found</div>`;
  }
}

add.addEventListener("click", addSubmit);
