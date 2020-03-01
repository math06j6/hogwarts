"use strict";

// const dataUrl = "https://petlatkea.dk/2020/hogwarts/students.json";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];
const HTML = {};
let enrolledStudents = [];
let expelledStudents = [];
let jsonBlood = [];

const Student = {
  first: "",
  middle: "",
  last: "",
  gender: "",
  house: "",
  image: "",
  blood: "",
  inquisitor: false,
  expel: false
};

function start() {
  console.log("start");
  HTML.settings = document.querySelector("#settings");

  HTML.settings.classList.add("hidden");
  document.querySelector(".settings_btn").addEventListener("click", changeSettings);
  console.log("changeSettings");

  document.querySelector("select#theme").addEventListener("change", selectTheme);
  skjulDetalje();

  document.querySelector("[data-filter='all']").addEventListener("click", displayAll);
  document.querySelector("[data-filter='gryffindor']").addEventListener("click", filterGryffindor);
  document.querySelector("[data-filter='hufflepuff']").addEventListener("click", filterHufflepuff);
  document.querySelector("[data-filter='ravenclaw']").addEventListener("click", filterRavenclaw);
  document.querySelector("[data-filter='slytherin']").addEventListener("click", filterSlytherin);

  document.querySelector("[data-sort='first']").addEventListener("click", sortFirst);
  document.querySelector(".hack").addEventListener("click", hackHogwarts);

  allStudents = enrolledStudents;
  loadJSON();
}

function sortFirst() {
  const sortName = allStudents.sort(compareName);
  displayList(sortName);

  console.log(sortFirst);
}

function compareName(a, b) {
  if (a.first == b.first) {
    return 1;
  } else if (a.first > b.first) {
    return -1;
  } else {
    return -1;
  }
}

allStudents.sort(compareName);
console.log(compareName);

function displayAll() {
  const filterAll = allStudents.filter(isAll);
  displayList(filterAll);
}

function filterGryffindor() {
  const onlyGryffindor = allStudents.filter(isGryffindor);
  displayList(onlyGryffindor);
}

function filterHufflepuff() {
  const onlyHufflepuff = allStudents.filter(isHufflepuff);
  displayList(onlyHufflepuff);
}

function filterRavenclaw() {
  const onlyRavenclaw = allStudents.filter(isRavenclaw);
  displayList(onlyRavenclaw);
}

function filterSlytherin() {
  const onlySlytherin = allStudents.filter(isSlytherin);
  displayList(onlySlytherin);
}

function isAll(student) {
  return student;
}
function isGryffindor(student) {
  return student.House === "gryffindor";
}

function isHufflepuff(student) {
  return student.house === "hufflepuff";
}

function isRavenclaw(student) {
  return student.house === "ravenclaw";
}

function isSlytherin(student) {
  return student.house === "slytherin";
}

function selectTheme() {
  document.querySelector("body").setAttribute("data-house", this.value);
}

async function loadJSON() {
  const response = await fetch("https://petlatkea.dk/2020/hogwarts/students.json");
  const jsonFamilies = await fetch("https://petlatkea.dk/2020/hogwarts/families.json");

  const jsonData = await response.json();
  const jsonBlood = await jsonFamilies.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData, jsonBlood);
}

function prepareObjects(jsonData, jsonBlood) {
  jsonData.forEach(jsonObject => {
    const student = Object.create(Student);

    // Fullname of student - Trim + Remove whitespace
    let fullName = jsonObject.fullname;
    fullName = fullName.toLowerCase();
    fullName = fullName.trim();

    // First name
    let firstLetter = fullName.substring(0, 1);
    firstLetter = firstLetter.toUpperCase();

    student.first = fullName.substring(1, fullName.indexOf(" "));
    student.first = student.first[0].toUpperCase() + student.first.substring(1).toLowerCase();
    student.first = firstLetter + jsonObject.fullname.substring(1, jsonObject.fullname.indexOf(" "));

    // Middle Name
    student.middle = jsonObject.fullname.substring(jsonObject.fullname.indexOf(" ") + 5, jsonObject.fullname.lastIndexOf(" "));

    // Last Name
    student.last = fullName.substring(fullName.lastIndexOf(" ") + 1, fullName.length + 1);
    let firstletterLastName = student.last.substring(0, 1);
    firstletterLastName = firstletterLastName.toUpperCase();
    student.last = firstletterLastName + fullName.substring(fullName.lastIndexOf(" ") + 2, fullName.length + 1);

    // Prepare Gender
    student.gender = jsonObject.gender;
    student.gender = student.gender[0].toUpperCase() + student.gender.substring(1).toLowerCase();

    // student.gender = jsonObject.gender[0].toUpperCase() + jsonObject.gender.substring(1).toLowerCase();

    // Prepare House data
    student.house = jsonObject.house;
    student.house = student.house.trim();
    student.house = student.house.toLowerCase();
    let capitalizeHouse = student.house.substring(0, 1);
    capitalizeHouse = capitalizeHouse.toUpperCase();
    student.house = capitalizeHouse + student.house.substring(1);

    allStudents.push(student);
    console.log(student);
  });
  setBloodStatus(jsonBlood);
  console.log("allStudents", allStudents);
  displayList();
}

function setBloodStatus(array) {
  allStudents.forEach(student => {
    if (array.half.some(family => family === student.last)) {
      student.blood = "half";
    } else if (array.pure.some(family => family === student.last)) {
      student.blood = "pure";
    } else {
      student.blood = "muggle";
    }
  });
}

function displayList(students) {
  // clear the list
  document.querySelector("#information tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudent);

  // Display interface data
  prepareInterfaceData(students);

  // Search
  let search = document.querySelector(".search");
  let el = document.querySelectorAll(".list-row");

  search.addEventListener("keyup", function() {
    el.forEach(student => {
      console.log(student);
      if (
        student
          .querySelector(".first_name")
          .textContent.toLowerCase()
          .includes(search.value.toLowerCase()) ||
        student
          .querySelector(".last_name")
          .textContent.toLowerCase()
          .includes(search.value.toLowerCase()) ||
        student
          .querySelector(".house")
          .textContent.toLowerCase()
          .includes(search.value.toLowerCase())
      ) {
        student.classList = "list-row";
      } else {
        student.classList = "list-row hidden";
      }
    });
  });
}

function prepareInterfaceData() {
  const gryffindor = allStudents.filter(student => student.house === "Gryffindor" && !student.expel);
  const hufflepuff = allStudents.filter(student => student.house === "Hufflepuff" && !student.expel);
  const ravenclaw = allStudents.filter(student => student.house === "Ravenclaw" && !student.expel);
  const slytherin = allStudents.filter(student => student.house === "Slytherin" && !student.expel);
  const expel = allStudents.filter(student => student.expel);
  const registered = allStudents.filter(student => !student.expel);
  const current = allStudents.filter(student => !student.expel);

  const object = {
    gryffindor: gryffindor.length,
    hufflepuff: hufflepuff.length,
    ravenclaw: ravenclaw.length,
    slytherin: slytherin.length,
    expel: expel.length,
    registered: registered.length,
    current: current.length
  };
  displayInterfaceData(object);
}

function displayInterfaceData(object) {
  document.querySelector("#gryffindor").textContent = `${object.gryffindor}`;
  document.querySelector("#hufflepuff").textContent = `${object.hufflepuff}`;
  document.querySelector("#ravenclaw").textContent = `${object.ravenclaw}`;
  document.querySelector("#slytherin").textContent = `${object.slytherin}`;
  document.querySelector("#registered").textContent = `${object.registered}`;
  document.querySelector("#expel").textContent = `${object.expel}`;
  document.querySelector("#current").textContent = `${object.current}`;
}

function displayStudent(student) {
  // create clone
  const clone = document.querySelector("template#student").content.cloneNode(true);

  // Display  Quidditch players
  let quidditchPlayer = clone.querySelector("[data-field=quidditch]");
  if (student.quidditch) {
    quidditchPlayer.textContent = "🧹";
    quidditchPlayer.style.filter = "filter: initial;";
  } else {
    quidditchPlayer.textContent = "🧹";
    quidditchPlayer.style.filter = "grayscale(100%)";
  }

  // Display inquisitors
  let studentInquisitor = clone.querySelector("[data-field=inquisitor]");
  if (student.inquisitor) {
    studentInquisitor.textContent = "🎖️";
    studentInquisitor.style.filter = "grayscale(65%) hue-rotate(140deg)";
  } else {
    studentInquisitor.textContent = "🎖️";
  }

  // Display prefects
  let studentPrefect = clone.querySelector("[data-field=prefect]");
  if (student.prefect) {
    studentPrefect.textContent = "🛡";
    studentPrefect.style.filter = "grayscale(900%) hue-rotate(255deg)";
  } else {
    studentPrefect.textContent = "🛡";
  }

  // Expel students
  let expelOption = clone.querySelector("[data-field=expel]");
  if (student.expel) {
    expelOption.textContent = "✘";
  } else {
    expelOption.textContent = "✘";
  }

  // set clone data
  clone.querySelector("[data-field=first]").textContent = student.first;
  clone.querySelector("[data-field=middle]").textContent = student.middle;
  clone.querySelector("[data-field=last]").textContent = student.last;
  clone.querySelector("[data-field=gender]").textContent = student.gender;
  clone.querySelector("[data-field=house]").textContent = student.house;

  clone.querySelector(".logo").src = "files/logos/" + student.house + ".png";
  clone.querySelector(".logo").alt = student.house + " logo";
  clone.querySelector(".blood").src = displayBlood(student.blood);
  clone.querySelector(".blood").alt = "Blood";

  clone.querySelector(".first_name").addEventListener("click", () => {
    visDetalje(student);
  });

  clone.querySelector(".middle_name").addEventListener("click", () => {
    visDetalje(student);
  });

  clone.querySelector(".nickname").addEventListener("click", () => {
    visDetalje(student);
  });

  clone.querySelector(".last_name").addEventListener("click", () => {
    visDetalje(student);
  });

  clone.querySelector(".house").addEventListener("click", () => {
    visDetalje(student);
  });

  clone.querySelector("[data-field=quidditch]").addEventListener("click", function() {
    selectQuidditchPlayer(student);
    displayList(allStudents);
  });

  clone.querySelector("[data-field=inquisitor]").addEventListener("click", function() {
    setInquisitor(student);
    displayList(allStudents);
  });

  clone.querySelector("[data-field=prefect]").addEventListener("click", function() {
    setPrefect(student);
    displayList(allStudents);
  });

  //expell student -> click
  clone.querySelector("[data-field=expel]").addEventListener("click", function() {
    expelStudent(student);
    displayList(allStudents);
  });

  // append clone to list
  document.querySelector("#information tbody").appendChild(clone);
}

function displayBlood(str) {
  console.log("displayBlood");
  if (str === "pure") {
    return `/files/pure.svg`;
  } else if (str === "half") {
    return `/files/half.svg`;
  } else {
    return `/files/muggle.svg`;
  }
}

function expelStudent(student) {
  console.log("Expelled: " + student.first);

  student.expelled = true;
  student.prefect = false;

  enrolledStudents = allStudents.filter(student => {
    return student.expelled === false;
  });

  expelledStudents.push(student);

  enrolledStudents = allStudents.filter(student => {
    return student.expelled === false;
  });

  displayList(enrolledStudents);
}

function selectQuidditchPlayer(student) {
  if (student.quidditch) {
    student.quidditch = false;
  } else {
    student.quidditch = true;
  }
}

function setInquisitor(student) {
  if (student.inquisitor) {
    student.inquisitor = false;
  } else {
    student.inquisitor = true;
  }
}

function setPrefect(student) {
  if (student.prefect) {
    student.prefect = false;
  } else {
    student.prefect = true;
  }
}

function visDetalje(student) {
  console.log(visDetalje);

  const popup = document.querySelector(".popup-content");

  document.querySelector("#detalje .first_name").textContent = student.first;
  document.querySelector("#detalje .middle_name").textContent = student.middle;
  document.querySelector("#detalje .last_name").textContent = student.last;
  document.querySelector("#detalje .nickname").textContent = student.nickname;
  document.querySelector("#detalje .gender").textContent = student.gender;

  document.querySelector("[data-field=house]").textContent = student.house;
  document.querySelector("#detalje .logo").src = "files/logos/" + student.house + ".png";
  document.querySelector("#detalje .logo").alt = student.house + " logo";
  document.querySelector("#detalje .house").textContent = student.house;
  document.querySelector("#detalje .blood").src = displayBlood(student.blood);

  if (student.last == "Finch-Fletchley") {
    document.querySelector("#detalje .student-img").src = "files/images/" + "fletchley" + "_" + student.firstName.substring(0, 1).toLowerCase() + ".png";
  } else if (student.firstName == "Padma") {
    document.querySelector("#detalje .student-img").src = "files/images/" + student.last.toLowerCase() + "_" + "padme" + ".png";
  } else if (student.last == "Patil") {
    document.querySelector("#detalje .student-img").src = "files/images/" + student.last.toLowerCase() + "_" + student.firs.toLowerCase() + ".png";
  } else {
    document.querySelector("#detalje .student-img").src = "files/images/" + student.last.toLowerCase() + "_" + student.first.substring(0, 1).toLowerCase() + ".png";
  }
  document.querySelector("#detalje .student-img").alt = student.firstName + " " + student.last;

  document.querySelector(".logo").src = "files/logos/" + student.house + ".png";
  document.querySelector(".logo").alt = student.house + " logo";

  document.querySelector("#detalje").setAttribute("data-house", student.house);

  document.querySelector("#detalje").style.display = "flex";

  // Hvis man klikker et vilkårligt sted på knappen .close-btn, så lukker man fuldskærmsvisning
  document.querySelector("#detalje .close-btn").addEventListener("click", skjulDetalje);

  // Hvis man klikker et vilkårligt sted på mit pop-up card, så lukker man fuldskærmsvisning
  document.querySelector("#detalje").addEventListener("click", skjulDetalje);
}

function skjulDetalje() {
  document.querySelector("#detalje").style.display = "none";
}

function changeSettings() {
  console.log(changeSettings);
  HTML.settings.classList.remove("hidden");

  document.querySelector("#settings .close-btn").addEventListener("click", hideSettings);
}

function hideSettings() {
  console.log(changeSettings);
  HTML.settings.classList.add("hidden");
}

function hackHogwarts(news) {
  document.querySelector(".hack").removeEventListener("click", hackHogwarts);
  const myself = Object.create(Student);
  myself.first = "Mathias";
  myself.middle = "Hacked";
  myself.last = "Hogwarts";
  myself.gender = "boy";
  myself.house = "hufflepuff";
  myself.fullName = "Mathias Hacked Hogwarts";
  myself.image = "";
  myself.gender = "boy";
  // allStudents.unshift(myself);
  allStudents.push(myself);
  displayList(news);
}

// // hacking
// function hackTheSystem {
//   console.log()

//   const myself=  = Object.create(Student);
//   mySelf.name = "Mathias";
//   myself.type =
//   myself.desc = "hackerman"

//   allAnimals.push("myself");
// }

// if ( theSystemHasBeenHacked ) {
//   theSystemHasBeenHacked =true;

//   allAnimals.forEach(animal =>{
//   animal.age = Math.floor(Math.random())*
//   });
// }

// Patil sisters
// filter(student => studentLastName ===..................)
