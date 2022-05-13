window.onload = function () {
  show(0);
};

let questions = [
  {
    id: 1,
    question:
      "Are you suffering from feelings of sadness, hopelessness or emptiness?",

    options: [
      "Never",
      "Occasionally",
      "Often (once a week or more)",
      "EveryDay",
    ],
  },
  {
    id: 2,
    question:
      "Are you having trouble getting to sleep and staying asleep? Or are you finding it hard to get up in the morning?",

    options: [
      "Never", 
      "Occasionally", 
      "Often (2-3 times a week )",
      "Always"],
  },
  {
    id: 3,
    question: "Do you feel guilty or tearful for no reason?",

    options: [
      "Never",
      "Occasionally(1-2 times per month)",
      "Often (1-2 times per week)",
      "EveryDay",
    ],
  },
  {
    id: 4,
    question:
      "How often have you been bothered that you have little interest or pleasure in doing things?",

    options: [
      "Never",
      "Occasionally",
      "Often (1-2 times per week)",
      "EveryDay",
    ],
  },
  {
    id: 5,
    question:
      "How often have you been bothered that you have poor appetite, weight loss, or overeating over the last two weeks?",

    options: [
      "Never",
      "Occasionally",
      "Often (once a week or more)",
      "EveryDay",
    ],
  },
  {
    id: 6,
    question:
      "Trouble concentrating on things, such as reading the newspaper, books, articles or watching television",

    options: [
      "Never",
      "Occasionally",
      "Often (once a week or more)",
      "EveryDay",
    ],
  },
];
var i;
let points = 0;
function show(i) {
  document.getElementById("questions").innerHTML = `
  <h2 class="pl-5">Q${i + 1}.${questions[i].question}</h2>
  <ul>
    <li class="option">${questions[i].options[0]}</li>
    <li class="option">${questions[i].options[1]}</li>
    <li class="option">${questions[i].options[2]}</li>
    <li class="option">${questions[i].options[3]}</li>
    </ul>`;

  toggleActive();
}
let count = 1;
function nextQues() {
  if (!document.querySelector(".active")) {
    alert("Please select an option to proceed");
  }
  let result = document.querySelector(".active").innerHTML;

  if (result == questions[count - 1].options[0]) {
    points += 0;
    console.log(points);
  }

  if (result == questions[count - 1].options[1]) {
    points += 1;
    console.log(points);
  }
  if (result == questions[count - 1].options[2]) {
    points += 2;
    console.log(points);
  }
  if (result == questions[count - 1].options[3]) {
    points += 3;
    console.log(points);
  }
  sessionStorage.setItem("respoints", points);

  if (count == questions.length) {
    location.href = "end.html";
  }

  show(count);

  count++;
}
function toggleActive() {
  let option = document.querySelectorAll("li.option");
  for (let j = 0; j < option.length; j++) {
    option[j].onclick = function () {
      for (let k = 0; k < option.length; k++) {
        option[k].style.pointerEvents = "none"; //when user clicks on any of the option rest of all are disabled so that he/she cannot choose any other option
        option[k].style.backgroundColor = "#ccc"; //these are added to the view so that user can see that what is happen when he choose any option
        option[k].style.color = "#000"; //these are added to the view so that user can see that what is happen when he choose any option

        // console.log(`Option you have selected : ${option[j].innerText}`);
        if (option[k].classList.contains("active")) {
          option[k].classList.remove("active");
        }
      }
      option[j].classList.add("active");
    };
  }
}
