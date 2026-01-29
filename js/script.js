const jsMCQs = [
  {
    id: 1,
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "float"],
    answer: "var",
  },
  {
    id: 2,
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "//", "/* */", "#"],
    answer: "//",
  },
  {
    id: 3,
    question: "Which data type is NOT supported by JavaScript?",
    options: ["Number", "Boolean", "Character", "String"],
    answer: "Character",
  },
  {
    id: 4,
    question: "Which method is used to print data in the console?",
    options: ["print()", "log()", "console.log()", "display()"],
    answer: "console.log()",
  },
  {
    id: 5,
    question: "Which operator is used to compare both value and type?",
    options: ["==", "=", "===", "!="],
    answer: "===",
  },
  {
    id: 6,
    question: "What will `typeof null` return?",
    options: ["null", "object", "undefined", "number"],
    answer: "object",
  },
  {
    id: 7,
    question: "Which function converts JSON data to a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: "JSON.parse()",
  },
  {
    id: 8,
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "do...while", "foreach"],
    answer: "do...while",
  },
  {
    id: 9,
    question: "Which keyword is used to create a function?",
    options: ["function", "method", "def", "func"],
    answer: "function",
  },
  {
    id: 10,
    question: "Which array method adds an element at the end?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },
];

const leftList = document.getElementById("leftList");
const rightList = document.getElementById("rightList");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");

let currentQus = 0;
let userAnswers = new Array(jsMCQs.length);

jsMCQs.forEach((_, i) => {
  const btn = document.createElement("button");
  btn.innerText = i + 1;
  btn.onclick = () => changeQuestion(i);
  leftList.appendChild(btn);

  const span = document.createElement("span");
  span.innerText = i + 1;
  span.onclick = () => changeQuestion(i);
  rightList.appendChild(span);
});

function loadQuestion() {
  const q = jsMCQs[currentQus];

  questionText.innerText = "Q" + (currentQus + 1) + ". " + q.question;

  optionsList.innerHTML = "";

  q.options.forEach((opt, i) => {
    optionsList.innerHTML += `
      <li style="margin: 10px 0;">
        <label>
          <input type="radio" name="option" value="${i}"
          ${userAnswers[currentQus] === i ? "checked" : ""}>
          ${opt}
        </label>
      </li>`;
  });

  prevBtn.disabled = currentQus === 0;
  nextBtn.disabled = currentQus === jsMCQs.length - 1;
}

function saveAnswer() {
  const selected = document.querySelector("input[name='option']:checked");
  if (selected) userAnswers[currentQus] = Number(selected.value);
}

function changeQuestion(i) {
  saveAnswer();
  currentQus = i;
  loadQuestion();
}

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.onclick = () => {
  saveAnswer();
  currentQus++;
  loadQuestion();
};

prevBtn.onclick = () => {
  saveAnswer();
  currentQus--;
  loadQuestion();
};

let time = 10 * 60;
const timerEl = document.getElementById("timer");

var timerInterval = setInterval(runTimer, 1000);

function runTimer() {
  var minutes = parseInt(time / 60);
  var seconds = time - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  timerEl.innerText = minutes + ":" + seconds;

  time = time - 1;

  if (time < 0) {
    clearInterval(timerInterval);
    submitQuiz();
  }
}

const submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = submitQuiz;

function submitQuiz() {
  saveAnswer();
  clearInterval(timerInterval);

  let correct = 0;
  jsMCQs.forEach((q, i) => {
    if (userAnswers[i] === q.answer) correct++;
  });

  prompt(
    `QUIZ RESULT

Total Questions : ${jsMCQs.length}
marks : ${correct} / ${jsMCQs.length}`,
  );

  submitBtn.disabled = true;
}

loadQuestion();
