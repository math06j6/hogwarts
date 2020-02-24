"use strict";

// const dataUrl = "https://petlatkea.dk/2020/hogwarts/students.json";

window.addEventListener("DOMContentLoaded", inquisitort);

const allStudents = [];

function inquisitort() {
  console.log("ready");
  document.querySelector("select#theme").addEventListener("change", selectTheme);
  skjulDetalje();
  loadJSON();
}

function selectTheme() {
  document.querySelector("body").setAttribute("data-house", this.value);
}

const Student = {
  first: "",
  middle: "",
  last: "",
  gender: "",
  house: "",
  inquisitor: false
};

async function loadJSON() {
  const response = await fetch("https://petlatkea.dk/2020/hogwarts/students.json");
  // const response = await fetch("https://petlatkea.dk/2020/hogwarts/families.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    const student = Object.create(Student);

    let fullName = jsonObject.fullname;
    fullName = fullName.toLowerCase();
    fullName = fullName.trim();

    student.first = jsonObject.fullname.substring(0, jsonObject.fullname.indexOf(" "));
    student.middle = jsonObject.fullname.substring(jsonObject.fullname.indexOf(" ") + 5, jsonObject.fullname.lastIndexOf(" "));
    student.last = jsonObject.fullname.substring(jsonObject.fullname.lastIndexOf(" "));
    student.gender = jsonObject.gender;
    student.house = jsonObject.house;

    // Prepare the house data
    student.house = student.house.trim();
    student.house = student.house.toLowerCase();
    let capitalizeHouse = student.house.substring(0, 1);
    capitalizeHouse = capitalizeHouse.toUpperCase();
    student.house = capitalizeHouse + student.house.substring(1);

    allStudents.push(student);
    console.log(student);
  });

  console.log("allStudents", allStudents);
  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#information tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const clone = document.querySelector("template#student").content.cloneNode(true);

  // TODO: Show inquisitor ⭐ or ☆
  let animalinquisitor = clone.querySelector("[data-field=inquisitor]");
  if (student.inquisitor) {
    animalinquisitor.textContent = "⭐";
  } else {
    animalinquisitor.textContent = "☆";
  }

  // set clone data
  clone.querySelector("[data-field=first]").textContent = student.first;
  clone.querySelector("[data-field=middle]").textContent = student.middle;
  clone.querySelector("[data-field=last]").textContent = student.last;
  clone.querySelector("[data-field=gender]").textContent = student.gender;
  clone.querySelector("[data-field=house]").textContent = student.house;

  clone.querySelector(".logo").src = "files/" + student.house + ".png";
  clone.querySelector(".logo").alt = student.house + " logo";

  // clone.querySelector(".row").addEventListener("click", () => {
  //   visDetalje(student);
  // });
  document.querySelector(".logo").src = "files/" + student.house + ".png";
  document.querySelector(".logo").alt = student.house + " logo";

  clone.querySelector("[data-field=inquisitor]").addEventListener("click", function() {
    setinquisitor(student);
    displayList(allStudents);
  });

  // append clone to list
  document.querySelector("#information tbody").appendChild(clone);
}

function setinquisitor(student) {
  if (student.inquisitor) {
    student.inquisitor = false;
  } else {
    student.inquisitor = true;
  }
}

function visDetalje(student) {
  console.log(visDetalje);

  const popup = document.querySelector(".popup-content");

  document.querySelector("#detalje").style.display = "flex";

  // Hvis man klikker et vilkårligt sted på knappen .close-btn, så lukker man fuldskærmsvisning \\
  document.querySelector("#detalje .close-btn").addEventListener("click", skjulDetalje);

  // Hvis man klikker et vilkårligt sted på mit pop-up card, så lukker man fuldskærmsvisning \\
  document.querySelector("#detalje").addEventListener("click", skjulDetalje);
}

function skjulDetalje() {
  document.querySelector("#detalje").style.display = "none";
}

// Patil sisters
// filter(student => studentLastName ===..................)
