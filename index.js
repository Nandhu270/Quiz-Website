var questions = [
  {
    question:
      "Which HTML attribute is used to specify that an input field must be filled out?",
    answer: ["Required", "Mandatory", "Validate", "Placeholder"],
    crt: "Required",
  },
  {
    question: "What is the correct HTML element to embed a video file?",
    answer: ["<movie>", "<media>", "<video>", "<embed>"],
    crt: "<video>",
  },
  {
    question: "How can you specify multiple stylesheets for a webpage?",
    answer: [
      "Using multiple <style> elements in the <head> section",
      "By listing multiple <link> elements in the <head> section",
      "By using a semicolon-separated list in the href attribute of a <link> tag",
      "None of the above",
    ],
    crt: "By listing multiple <link> elements in the <head> section",
  },
  {
    question: "Which HTML element is used to define a client-side script?",
    answer: ["<script>", "<client>", "<code>", "<javascript>"],
    crt: "<script>",
  },
  {
    question:
      "What does the target=" +
      "_blank" +
      " attribute do in an anchor (<a>) tag?",
    answer: [
      "Opens the linked document in a new tab or window",
      "Highlights the link",
      "Embeds the linked page into the current page",
      "Opens the linked document in a pop-up",
    ],
    crt: "Opens the linked document in a new tab or window",
  },
  {
    question:
      "Which HTML5 tag is used to specify a container for navigation links?",
    answer: ["<navigation>", "<nav>", "<menu>", "<navbar>"],
    crt: "<nav>",
  },
  {
    question: "What is the purpose of the <meta charset=" + "UTF-8" + "> tag?",
    answer: [
      " To specify the language of the webpage",
      "To define the encoding used for the document",
      "To include external resources",
      "To optimize the page for search engines",
    ],
    crt: "To define the encoding used for the document",
  },
  {
    question:
      "Which attribute is used to specify that an input field should be read-only?",
    answer: ["readonly", "disabled", "locked", "writeonly"],
    crt: "readonly",
  },
  {
    question:
      "In an HTML form, what is the purpose of the action attribute in the <form> tag?",
    answer: [
      " To specify the type of input allowed",
      "To define where the form data should be sent after submission",
      "To handle JavaScript validation for the form",
      "To define the encoding type of the form",
    ],
    crt: "To define where the form data should be sent after submission",
  },
  {
    question: "How do you make an image clickable to link to another webpage?",
    answer: [
      "By wrapping the <img> tag inside an <a> tag",
      "By using the href attribute inside the <img> tag",
      " By adding the onclick attribute in the <img> tag",
      " By using the <image-link> tag",
    ],
    crt: "By wrapping the <img> tag inside an <a> tag",
  },
];

var crt_ans = 0;
var count = 0;
var userans = [];

function loadquestion() {
  let question_no = document.getElementById("question_no");
  let quest = document.getElementById("question");
  question_no.textContent = `Question ${count + 1} of ${questions.length}`;
  quest.textContent = questions[count].question;
  option.innerHTML = "";
  questions[count].answer.forEach((ansarr) => {
    var box = document.createElement("div");
    box.textContent = ansarr;
    box.classList.add("opt");
    box.addEventListener("click", () => selectedanswer(ansarr, box));
    option.appendChild(box);
  });
  document.getElementById("next-btn").disabled = count === questions.length - 1;
  document.getElementById("previous-btn").disabled = count === 0;
  document.getElementById("submit-btn").style.display =
    count === questions.length - 1 ? "block" : "none";
}

function selectedanswer(ans, box) {
  if (ans === questions[count].crt) {
    userans[count] = 1;
  } else {
    userans[count] = 0;
  }
  let opt = document.querySelectorAll(".opt");
  opt.forEach((option) => {
    option.classList.remove("selected");
  });

  box.classList.add("selected");
}

let next = () => {
  if (count < questions.length - 1) count++;
  loadquestion();
};

let previous = () => {
  if (count > 0) count--;
  loadquestion();
};

let submitquiz = () => {
  document.getElementById("cont").remove();
  let mark = document.getElementById("mark");
  let status = document.getElementById("status");

  let tot_mark = totmark();
  document.getElementById("head").textContent = "Result";
  mark.textContent = `You scored: ${tot_mark} out of ${questions.length}`;

  if (tot_mark / questions.length > 0.8) status.textContent = "Excellent!...";
  else if (tot_mark / questions.length > 0.5)
    status.textContent = "Good Job!...";
  else status.textContent = "Keep practicing!...";

  const chartContainer = document.createElement("div");
  chartContainer.innerHTML = `<canvas id="quizResultsChart" width="400" height="200"></canvas>`;
  document.querySelector(".ans-container").appendChild(chartContainer);

  const ctx = document.getElementById("quizResultsChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Correct Answers", "Incorrect Answers"],
      datasets: [
        {
          label: "Quiz Results",
          data: [tot_mark, questions.length - tot_mark],
          backgroundColor: ["rgba(90, 255, 255, 0.46)", "rgb(255, 90, 90)"],
          borderColor: ["skyblue", "red"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });
};

totmark = () => {
  return userans.filter((ans) => ans === 1).length;
};

function startQuiz() {
  document.getElementById("start-container").remove();
  document.getElementById("cont").style.display = "flex";
  loadquestion();
}
