const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyper Tool Multi Language", "Hyperlinks and Text Markup Language"],
    answer: "Hyper Text Markup Language"
  }
];

let currentQuestion = 0;
let score = 0; // ✅ Track score

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  nextBtn.disabled = true;
  optionsEl.innerHTML = "";
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach(option => {
    const btn = document.createElement("div");
    btn.textContent = option;
    btn.classList.add("option");
    btn.addEventListener("click", () => selectAnswer(btn, q.answer));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, correctAnswer) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => {
    opt.style.pointerEvents = "none"; // disable further clicks
    if (opt.textContent === correctAnswer) {
      opt.classList.add("correct");
    } 
    if (opt === selectedBtn && opt.textContent !== correctAnswer) {
      opt.classList.add("wrong");
    }
  });

  // ✅ increase score if correct
  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.querySelector(".quiz-container").innerHTML =
      `<h2>🎉 Quiz Completed!</h2>
       <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>`;
  }
});

loadQuestion();
