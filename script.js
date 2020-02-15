let filter = "Alle";

window.addEventListener("DOMContentLoaded", start);

function start() {
  getData();
  skjulDetalje();
  document.querySelector("select#theme").addEventListener("change", selectTheme);
}

function selectTheme() {
  document.querySelector("body").setAttribute("data-house", this.value);
}

async function getData() {
  let response = await fetch("students1991.json");
  students = await response.json();

  showStudents();
}

function showStudents() {
  console.log("showStudents");
  let studentTemplate = document.querySelector(".temp");
  let hogwartsStudents = document.querySelector(".auto-grid");

  hogwartsStudents.innerHTML = "";

  students.forEach(house => {
    if (filter == house.house || filter == "Alle") {
      const clone = studentTemplate.cloneNode(true).content;
      clone.querySelector(".house").textContent = house.house;
      clone.querySelector(".name").textContent = house.fullname;
      clone.querySelector(".logo").src = "files/" + house.house + ".png";
      clone.querySelector(".logo").alt = house.house + " logo";

      clone.querySelector(".student-card").addEventListener("click", () => {
        visDetalje();
      });
      document.querySelector(".logo").src = "files/" + house.house + ".png";
      document.querySelector(".logo").alt = house.house + " logo";

      hogwartsStudents.appendChild(clone);
      console.log("cloned");
    }
  });
}

function visDetalje() {
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
