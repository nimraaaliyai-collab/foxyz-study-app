const messages = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

function getStudyAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("artificial intelligence") || q === "ai") {
    return "Artificial Intelligence (AI) is a technology that helps computers perform tasks that usually need human intelligence.\n\nExample: Chatbots, face recognition, and voice assistants.\n\nRemember: AI = machines performing intelligent tasks.";
  }

  if (q.includes("python")) {
    return "Python is a high-level, easy-to-read programming language.\n\nExample:\nprint('Hello, World!')\n\nThis displays Hello, World! on the screen.\n\nViva tip: Python is popular because of its simple syntax and many libraries.";
  }

  if (q.includes("html")) {
    return "HTML stands for HyperText Markup Language. It structures content on web pages.\n\nExample:\n<h1>Hello</h1>\n<p>Welcome to my page.</p>\n\nRemember: HTML provides the structure of a webpage.";
  }

  if (q.includes("study plan") || q.includes("timetable")) {
    return "Here is a simple study plan:\n\n1. 25 minutes — Study one topic.\n2. 5 minutes — Take a break.\n3. 25 minutes — Practise questions.\n4. 5 minutes — Take a break.\n5. 15 minutes — Revise what you learned.\n\nAdjust the timings to suit your day.";
  }

  if (q.includes("viva") || q.includes("question")) {
    return "Here are five beginner computer science viva questions:\n\n1. What is a computer?\n2. What is a programming language?\n3. What is a variable?\n4. What is an algorithm?\n5. What is debugging?\n\nTry answering each in two or three sentences.";
  }

  if (q.includes("hello") || q.includes("hi")) {
    return "Hey! 💜 I'm happy to help you study. Ask me about Python, AI, HTML, computer science, or exam preparation.";
  }

  return "Good question! 🌷 This version uses sample responses, so it cannot answer every question intelligently yet.\n\nTry asking about Python, HTML, artificial intelligence, viva questions, or a study plan. In Step 5, we'll connect a real AI model.";
}

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = "message " + sender;
  bubble.textContent = text;
  messages.appendChild(bubble);
  bubble.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function askQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage(cleanQuestion, "user");
  const answer = getStudyAnswer(cleanQuestion);
  addMessage(answer, "assistant");
}

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;

  askQuestion(question);
  userInput.value = "";
  userInput.focus();
});

document.querySelectorAll("[data-prompt]").forEach(function (button) {
  button.addEventListener("click", function () {
    askQuestion(button.dataset.prompt);
  });
});

const views = {
  chat: document.getElementById("chatView"),
  planner: document.getElementById("plannerView"),
  quiz: document.getElementById("quizView"),
  interview: document.getElementById("interviewView"),
  practice: document.getElementById("practiceView"),
  mockTest: document.getElementById("mockTestView"),
  timeline: document.getElementById("timelineView"),
  timer: document.getElementById("timerView")
};

const titles = {
  chat: "AI Study Helper ✨",
  planner: "My Study Planner 📚",
  quiz: "Viva Practice 📝",
  interview: "Interview Questions 💼",
  practice: "Mock Practice 🎤",
  mockTest: "Mock Tests ✅",
  timeline: "Preparation Timeline 🗓️",
  timer: "Focus Timer ⏱️"
};

document.querySelectorAll(".nav-item").forEach(function (button) {
  button.addEventListener("click", function () {
    const selected = button.dataset.view;

    Object.entries(views).forEach(function ([name, view]) {
      view.classList.toggle("hidden", name !== selected);
    });

    document.querySelectorAll(".nav-item").forEach(function (item) {
      item.classList.toggle("active", item === button);
    });

    document.getElementById("pageTitle").textContent = titles[selected];
  });
});

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const task = taskInput.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", "Mark task complete");

  const label = document.createElement("span");
  label.textContent = task;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "delete-task";
  remove.textContent = "Delete";
  remove.setAttribute("aria-label", "Delete task");

  checkbox.addEventListener("change", function () {
    li.classList.toggle("done", checkbox.checked);
  });

  remove.addEventListener("click", function () {
    li.remove();
  });

  li.append(checkbox, label, remove);
  taskList.appendChild(li);
  taskInput.value = "";
});

const quiz = [
  {
    question: "1. Which function displays output in Python?",
    options: ["input()", "print()", "output()", "show()"],
    answer: 1,
    explanation: "print() displays information on the screen."
  },
  {
    question: "2. Which symbol starts a Python comment?",
    options: ["//", "<!--", "#", "**"],
    answer: 2,
    explanation: "The # symbol starts a single-line Python comment."
  },
  {
    question: "3. Which data type stores True or False?",
    options: ["String", "Boolean", "List", "Integer"],
    answer: 1,
    explanation: "The bool type represents True or False."
  }
];

let currentQuestion = 0;
let answered = false;

const quizCount = document.getElementById("quizCount");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");

function showQuestion() {
  answered = false;
  const item = quiz[currentQuestion];

  quizCount.textContent = `Question ${currentQuestion + 1} of ${quiz.length}`;
  quizQuestion.textContent = item.question;
  quizOptions.replaceChildren();
  quizFeedback.textContent = "";
  nextQuestion.classList.add("hidden");
  nextQuestion.textContent = currentQuestion === quiz.length - 1 ? "Try again ↻" : "Next question →";

  item.options.forEach(function (option, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;

    button.addEventListener("click", function () {
      if (answered) return;
      answered = true;

      const correct = index === item.answer;
      quizFeedback.textContent = (correct ? "Correct! 🎉 " : "Not quite. 💜 ") + item.explanation;

      quizOptions.querySelectorAll("button").forEach(function (b) {
        b.disabled = true;
      });

      nextQuestion.classList.remove("hidden");
    });

    quizOptions.appendChild(button);
  });
}

nextQuestion.addEventListener("click", function () {
  if (currentQuestion === quiz.length - 1) {
    currentQuestion = 0;
  } else {
    currentQuestion++;
  }

  showQuestion();
});

const interviewQuestionData = [
  {
    category: "Behavioral",
    question: "Tell me about yourself.",
    guidance: "Keep it focused: briefly share your background, a relevant strength or project, and why this opportunity interests you."
  },
  {
    category: "Behavioral",
    question: "Describe a challenge you faced and how you handled it.",
    guidance: "Use the STAR structure: Situation, Task, Action, Result. Focus most on what you did and what you learned."
  },
  {
    category: "Behavioral",
    question: "What is one strength you would bring to this role?",
    guidance: "Name a role-relevant strength, then back it up with a short, specific example."
  },
  {
    category: "Technical",
    question: "What is the difference between a list and a tuple in Python?",
    guidance: "Explain mutability: lists can be changed after creation, while tuples are immutable. Include a small use case for each."
  },
  {
    category: "Technical",
    question: "How would you explain an API to a beginner?",
    guidance: "Describe an API as a defined way for software systems to communicate, then give a familiar example such as an app requesting weather data."
  },
  {
    category: "Technical",
    question: "What steps do you take when debugging a program?",
    guidance: "Mention reproducing the issue, reading the error or logs, isolating the cause, testing a focused fix, and checking for regressions."
  }
];

const interviewQuestions = document.getElementById("interviewQuestions");
interviewQuestionData.forEach(function (item) {
  const card = document.createElement("article");
  card.className = "interview-card";

  const category = document.createElement("span");
  category.className = "interview-tag";
  category.textContent = item.category;

  const question = document.createElement("h3");
  question.textContent = item.question;

  const guidance = document.createElement("p");
  guidance.textContent = item.guidance;
  guidance.classList.add("hidden");

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.textContent = "Show answer guidance";
  toggle.addEventListener("click", function () {
    const showing = guidance.classList.toggle("hidden") === false;
    toggle.textContent = showing ? "Hide guidance" : "Show answer guidance";
  });

  card.append(category, question, guidance, toggle);
  interviewQuestions.appendChild(card);
});

const practiceQuestions = [
  {
    question: "Tell me about yourself and what you are currently learning.",
    tip: "Aim for a concise introduction: your current focus, one relevant example, and what you hope to do next."
  },
  {
    question: "Describe a project you are proud of. What was your contribution?",
    tip: "Explain the goal, your specific contribution, one challenge, and the result. Be clear about your own role."
  },
  {
    question: "Tell me about a time you had to learn something quickly.",
    tip: "Choose a real example and describe how you planned your learning, practised, and checked your progress."
  },
  {
    question: "How do you approach a problem when you do not know the answer?",
    tip: "Show a calm process: clarify the problem, break it into smaller parts, research or test ideas, and ask for help when appropriate."
  },
  {
    question: "Why are you interested in this role or opportunity?",
    tip: "Connect something specific about the role to your interests and skills. Avoid relying on a generic answer."
  }
];

const practiceAnswers = Array(practiceQuestions.length).fill("");
let practiceIndex = 0;
const practiceCount = document.getElementById("practiceCount");
const practiceQuestion = document.getElementById("practiceQuestion");
const practiceAnswer = document.getElementById("practiceAnswer");
const practiceHint = document.getElementById("practiceHint");
const practiceFeedback = document.getElementById("practiceFeedback");
const nextPractice = document.getElementById("nextPractice");

function showPracticeQuestion() {
  const item = practiceQuestions[practiceIndex];
  practiceCount.textContent = `Question ${practiceIndex + 1} of ${practiceQuestions.length}`;
  practiceQuestion.textContent = item.question;
  practiceAnswer.value = practiceAnswers[practiceIndex];
  practiceFeedback.textContent = "";
  practiceHint.textContent = "Show coaching tip";
  nextPractice.textContent = practiceIndex === practiceQuestions.length - 1 ? "Start again ↻" : "Next question →";
}

practiceAnswer.addEventListener("input", function () {
  practiceAnswers[practiceIndex] = practiceAnswer.value;
});

practiceHint.addEventListener("click", function () {
  practiceFeedback.textContent = practiceQuestions[practiceIndex].tip;
  practiceHint.textContent = "Coaching tip shown";
});

nextPractice.addEventListener("click", function () {
  practiceAnswers[practiceIndex] = practiceAnswer.value;
  practiceIndex = (practiceIndex + 1) % practiceQuestions.length;
  showPracticeQuestion();
});

showPracticeQuestion();

const mockTestQuestions = [
  {
    question: "Which Python keyword is used to define a function?",
    options: ["func", "def", "function", "define"],
    answer: 1,
    explanation: "The def keyword begins a function definition in Python."
  },
  {
    question: "What does HTML mainly describe?",
    options: ["A webpage's structure", "A database query", "A network connection", "An operating system"],
    answer: 0,
    explanation: "HTML uses elements to structure content on a webpage."
  },
  {
    question: "Which data structure follows first in, first out (FIFO)?",
    options: ["Stack", "Queue", "Tree", "Set"],
    answer: 1,
    explanation: "A queue processes items in the order they were added: first in, first out."
  },
  {
    question: "Which SQL command retrieves rows from a table?",
    options: ["SELECT", "UPDATE", "INSERT", "DROP"],
    answer: 0,
    explanation: "SELECT retrieves data from one or more database tables."
  },
  {
    question: "What is the main purpose of version control?",
    options: ["Compress images", "Track and manage changes to files", "Run web pages", "Encrypt passwords"],
    answer: 1,
    explanation: "Version control records changes so work can be reviewed, compared, and restored."
  }
];

let testIndex = 0;
let testScore = 0;
let testAnswered = false;
const testCount = document.getElementById("testCount");
const testQuestion = document.getElementById("testQuestion");
const testOptions = document.getElementById("testOptions");
const testFeedback = document.getElementById("testFeedback");
const nextTestQuestion = document.getElementById("nextTestQuestion");
const testResults = document.getElementById("testResults");

function showTestQuestion() {
  const item = mockTestQuestions[testIndex];
  testAnswered = false;
  testCount.textContent = `Question ${testIndex + 1} of ${mockTestQuestions.length}`;
  testQuestion.textContent = item.question;
  testOptions.replaceChildren();
  testFeedback.textContent = "";
  testResults.classList.add("hidden");
  nextTestQuestion.classList.add("hidden");
  nextTestQuestion.textContent = testIndex === mockTestQuestions.length - 1 ? "See results →" : "Next question →";

  item.options.forEach(function (option, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", function () {
      if (testAnswered) return;
      testAnswered = true;
      const correct = index === item.answer;
      if (correct) testScore++;
      testFeedback.textContent = (correct ? "Correct! 🎉 " : "Not quite. 💜 ") + item.explanation;
      testOptions.querySelectorAll("button").forEach(function (choice) {
        choice.disabled = true;
      });
      nextTestQuestion.classList.remove("hidden");
    });
    testOptions.appendChild(button);
  });
}

function showTestResults() {
  testCount.textContent = "Test complete";
  testQuestion.textContent = "";
  testOptions.replaceChildren();
  testFeedback.textContent = "";
  nextTestQuestion.classList.add("hidden");
  testResults.replaceChildren();
  testResults.classList.remove("hidden");

  const score = document.createElement("h3");
  score.textContent = `Your score: ${testScore} out of ${mockTestQuestions.length}`;
  const summary = document.createElement("p");
  const percentage = Math.round((testScore / mockTestQuestions.length) * 100);
  summary.textContent = percentage >= 80 ? `${percentage}% — great work! Review any missed answers and try again.` : `${percentage}% — use the explanations to revise, then give it another try.`;
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "primary";
  retry.textContent = "Try again ↻";
  retry.addEventListener("click", startMockTest);
  testResults.append(score, summary, retry);
}

function startMockTest() {
  testIndex = 0;
  testScore = 0;
  showTestQuestion();
}

nextTestQuestion.addEventListener("click", function () {
  if (!testAnswered) return;
  if (testIndex === mockTestQuestions.length - 1) {
    showTestResults();
  } else {
    testIndex++;
    showTestQuestion();
  }
});

showTestQuestion();

const timelineStorageKey = "foxyz-preparation-timeline";
const storedTimeline = localStorage.getItem(timelineStorageKey);
let timelineItems = storedTimeline ? JSON.parse(storedTimeline) : [];
if (!Array.isArray(timelineItems)) {
  throw new Error("Saved timeline data is invalid. Clear the foxyZ timeline data to continue.");
}

function saveTimeline() {
  localStorage.setItem(timelineStorageKey, JSON.stringify(timelineItems));
}

function renderTimeline() {
  const timelineList = document.getElementById("timelineList");
  timelineList.replaceChildren();

  timelineItems.sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });

  if (!timelineItems.length) {
    const empty = document.createElement("li");
    empty.className = "timeline-empty";
    empty.textContent = "Your timeline is empty. Add your first preparation milestone above.";
    timelineList.appendChild(empty);
    return;
  }

  timelineItems.forEach(function (item) {
    const row = document.createElement("li");
    row.classList.toggle("completed", item.completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.setAttribute("aria-label", `Mark ${item.title} complete`);
    checkbox.addEventListener("change", function () {
      item.completed = checkbox.checked;
      saveTimeline();
      renderTimeline();
    });

    const title = document.createElement("span");
    title.className = "timeline-title";
    title.textContent = item.title;

    const date = document.createElement("time");
    date.className = "timeline-date";
    date.dateTime = item.date;
    date.textContent = new Date(`${item.date}T12:00:00`).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    const type = document.createElement("span");
    type.className = "timeline-type";
    type.textContent = item.type;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-task";
    remove.textContent = "Delete";
    remove.setAttribute("aria-label", `Delete ${item.title}`);
    remove.addEventListener("click", function () {
      timelineItems = timelineItems.filter(function (entry) {
        return entry.id !== item.id;
      });
      saveTimeline();
      renderTimeline();
    });

    row.append(checkbox, title, date, type, remove);
    timelineList.appendChild(row);
  });
}

document.getElementById("timelineForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const title = document.getElementById("timelineTitle").value.trim();
  const date = document.getElementById("timelineDate").value;
  const type = document.getElementById("timelineType").value;
  if (!title || !date) return;

  timelineItems.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: title,
    date: date,
    type: type,
    completed: false
  });
  saveTimeline();
  renderTimeline();
  this.reset();
});

renderTimeline();

const timerDuration = document.getElementById("timerDuration");
const timerDisplay = document.getElementById("timerDisplay");
const timerStatus = document.getElementById("timerStatus");
const timerStart = document.getElementById("timerStart");
const timerReset = document.getElementById("timerReset");
let timerRemainingSeconds = Number(timerDuration.value) * 60;
let timerDeadline = null;
let timerInterval = null;
let timerRunning = false;

function renderTimer() {
  const minutes = Math.floor(timerRemainingSeconds / 60);
  const seconds = timerRemainingSeconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.title = timerRunning ? `${timerDisplay.textContent} · Focus Timer` : "foxyZ";
}

function stopTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerRunning = false;
  timerDeadline = null;
  timerDuration.disabled = false;
  timerStart.textContent = timerRemainingSeconds === 0 ? "Start again" : "Start focus";
  renderTimer();
}

function updateTimer() {
  timerRemainingSeconds = Math.max(0, Math.ceil((timerDeadline - Date.now()) / 1000));
  renderTimer();

  if (timerRemainingSeconds === 0) {
    stopTimer();
    timerStatus.textContent = "Session complete! Take a well-earned break 🎉";
  }
}

timerDuration.addEventListener("change", function () {
  if (timerRunning) return;
  timerRemainingSeconds = Number(timerDuration.value) * 60;
  timerStatus.textContent = "Ready when you are 🌷";
  renderTimer();
});

timerStart.addEventListener("click", function () {
  if (timerRunning) {
    timerRemainingSeconds = Math.max(0, Math.ceil((timerDeadline - Date.now()) / 1000));
    stopTimer();
    timerStatus.textContent = "Paused. Resume whenever you’re ready.";
    return;
  }

  if (timerRemainingSeconds === 0) {
    timerRemainingSeconds = Number(timerDuration.value) * 60;
  }
  timerRunning = true;
  timerDeadline = Date.now() + timerRemainingSeconds * 1000;
  timerDuration.disabled = true;
  timerStart.textContent = "Pause";
  timerStatus.textContent = "Focus session in progress ✨";
  renderTimer();
  timerInterval = setInterval(updateTimer, 250);
});

timerReset.addEventListener("click", function () {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerRunning = false;
  timerDeadline = null;
  timerDuration.disabled = false;
  timerRemainingSeconds = Number(timerDuration.value) * 60;
  timerStart.textContent = "Start focus";
  timerStatus.textContent = "Ready when you are 🌷";
  renderTimer();
});

showQuestion();
renderTimer();
