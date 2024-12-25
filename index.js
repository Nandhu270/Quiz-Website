var questions = [
    {question : "Who was the first human to walk on the Moon?", answer:["Neil Armstrong","Rakesh Sharma","Edwin Aldrin","Kalpana Chawla"],crt:"Neil Armstrong"},
    {question : "Which planet is known as the Red Planet", answer:["Earth","Jupiter","Mars","Saturn"],crt:"Mars"},
    {question: "What is the largest planet in our solar system?",answer:["Earth","Jupiter","Mars","Saturn"],crt:"Jupiter"},
    {question: " What is the longest river in the world?" ,answer:["Nile","Ganga","Krishna","Yamuna"], crt:"Nile"},
    {question: " Which country is known as the Land of the Rising Sun?",answer:["Japan","India","England","France"],crt:"Japan"}
]

var crt_ans = 0
var count = 0

function loadquestion(){
    let question_no = document.getElementById('question_no');
    let quest = document.getElementById('question');
    question_no.textContent = `Question ${count+1} of ${questions.length}`
    quest.textContent = questions[count].question
    option.innerHTML=''
    questions[count].answer.forEach(arr => {
        var box = document.createElement("div")
        box.textContent=arr
        box.classList.add("opt");
        box.onclick = () => selectedanswer(arr);
        option.appendChild(box)
    });
    document.getElementById('previous-btn').disabled = count === 0;
    document.getElementById('next-btn').disabled = count === questions.length - 1;
   
}

function selectedanswer(ans){
    if (ans === questions[count].crt) {
        alert("Correct!");
      } else {
        alert("Not correct!");
      }
}

let next = ()=>{
    if(count<questions.length-1)
        count++;
    loadquestion();
}

let previous = () => {
    if(count > 0)
    count--;
    loadquestion();
}

loadquestion()