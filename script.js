"use strict";

// const dataUrl = "https://petlatkea.dk/2020/hogwarts/students.json";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

function start() {
  console.log("ready");
  skjulDetalje();
  loadJSON();
  document.querySelector("select#theme").addEventListener("change", selectTheme);
}

function selectTheme() {
  document.querySelector("body").setAttribute("data-house", this.value);
}

async function loadJSON() {
  fetch("animals.json")
    .then(response => response.json())
    .then(jsonData => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

const Animal = {
  first: "",
  middle: "",
  last: "",
  gender: "",
  house: "",
};

function loadJSON() {
  fetch("https://petlatkea.dk/2020/hogwarts/students.json")
    .then(response => response.json())
    .then(jsonData => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
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
  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=first]").textContent = animal.first;
  clone.querySelector("[data-field=middle]").textContent = animal.middle;
  clone.querySelector("[data-field=last]").textContent = animal.last;
  clone.querySelector("[data-field=gender]").textContent = animal.gender;
  clone.querySelector("[data-field=house]").textContent = animal.house;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}



function skjulDetalje() {
  document.querySelector("#detalje").style.display = "none";
}