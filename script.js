"use strict";

const dataUrl = "https://petlatkea.dk/2020/hogwarts/students.json";

window.addEventListener("DOMContentLoaded", start);
let studentsJSON = [];
let response = [];
let allAnimals = [];

function start() {
  console.log("ready");
  hideStudent();
  loadJSON();
  document.querySelector("select#theme").addEventListener("change", selectTheme);
}

function selectTheme() {
  document.querySelector("body").setAttribute("data-house", this.value);
}



const Animal = {
  first: "",
  middle: "",
  last: "",
  gender: "",
  house: "",
};

async function loadJSON() {
  console.log("getJson");

  //let response = await fetch(dataUrl);
  // students = await response.json();

  const jsonData = await fetch("https://petlatkea.dk/2020/hogwarts/students.json");
  
  response = await jsonData.json();
  prepareObjects(response);
}


function prepareObjects(jsonData) {
  response.forEach(jsonObject => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array

    let animal = Object.create(Animal);

    const personalData = jsonObject.fullname.trim();
    console.log(personalData);

    // animal.firstName = fullName.substring(1, fullName.indexOf(" "));
    
    animal.first = jsonObject.fullname.substring(0, jsonObject.fullname.indexOf(" "));
    animal.middle = jsonObject.fullname.substring(jsonObject.fullname.indexOf(" ") + 5,jsonObject.fullname.lastIndexOf(" "));
    animal.last = jsonObject.fullname.substring(jsonObject.fullname.lastIndexOf(" "));
    animal.gender = jsonObject.gender;
    animal.house = jsonObject.house;
   
    allAnimals.push(animal);
    console.log(animal);

    // TODO: MISSING CODE HERE !!!
  });

  console.log("allAnimals", allAnimals);


  // displayList();
  showStudents();
}

// function displayList() {
//   // clear the list
//   document.querySelector("#list tbody").innerHTML = "";

//   // build a new list
//   allAnimals.forEach(displayStudent);
// }

function showStudents() {
  console.log("showStudents");
  let studentTemplate = document.querySelector(".temp");
  let hogwartsStudents = document.querySelector(".students");

  document.querySelector("#list tbody").innerHTML = "";
  // hogwartsStudents.innerHTML = "";

  allAnimals.forEach(house => {
      // const clone = studentTemplate.cloneNode(true).content;
      const clone = document.querySelector("#animal").content.cloneNode(true);
      clone.querySelector(".house").textContent = house.house;
      clone.querySelector(".first_name").textContent = house.first_name;
      clone.querySelector(".logo").src = "files/" + house.house + ".png";
      clone.querySelector(".logo").alt = house.house + " logo";

      // clone.querySelector(".student-card").addEventListener("click", () => {
      //   displayStudent();
      // });
      document.querySelector(".logo").src = "files/" + house.house + ".png";
      document.querySelector(".logo").alt = house.house + " logo";

      hogwartsStudents.appendChild(clone);
      console.log("cloned");
  });
}

function displayStudent() {
  console.log(displayStudent);

  const popup = document.querySelector(".popup-content");

  document.querySelector("#detalje").style.display = "flex";

  // Hvis man klikker et vilkårligt sted på knappen .close-btn, så lukker man fuldskærmsvisning \\
  document.querySelector("#detalje .close-btn").addEventListener("click", hideStudent);

  // Hvis man klikker et vilkårligt sted på mit pop-up card, så lukker man fuldskærmsvisning \\
  document.querySelector("#detalje").addEventListener("click", hideStudent);
}

// function displayStudent(animal) {
//   console.log(displayStudent);
//   // create clone
//   const clone = document.querySelector("#animal").content.cloneNode(true);

//   // set clone data
//   clone.querySelector("[data-field=first]").textContent = animal.first;
//   clone.querySelector("[data-field=middle]").textContent = animal.middle;
//   clone.querySelector("[data-field=last]").textContent = animal.last;
//   clone.querySelector("[data-field=last]").textContent = animal.nickname;
//   clone.querySelector("[data-field=gender]").textContent = animal.gender;
//   clone.querySelector("[data-field=house]").textContent = animal.house;

//   // append clone to list
//   document.querySelector("#list tbody").appendChild(clone);
// }

function hideStudent() {
  document.querySelector("#detalje").style.display = "none";
}




