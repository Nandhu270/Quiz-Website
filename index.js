var questions = [
    {question : "Who was the first human to walk on the Moon?", answer:["Neil Armstrong","Rakesh Sharma","Edwin Aldrin","Kalpana Chawla"],crt:"Neil Armstrong"},
    {question : "Which planet is known as the Red Planet", answer:["Earth","Jupiter","Mars","Saturn"],crt:"Mars"},
    {question: "What is the largest planet in our solar system?",answer:["Earth","Jupiter","Mars","Saturn"],crt:"Jupiter"},
    {question: " What is the longest river in the world?" ,answer:["Nile","Ganga","Krishna","Yamuna"], crt:"Nile"},
    {question: " Which country is known as the Land of the Rising Sun?",answer:["Japan","India","England","France"],crt:"Japan"}
]

var crt_ans = 0
var count = 0
var userans = []

function loadquestion(){
    let question_no = document.getElementById('question_no');
    let quest = document.getElementById('question');
    question_no.textContent = `Question ${count+1} of ${questions.length}`
    quest.textContent = questions[count].question
    option.innerHTML=''
    questions[count].answer.forEach(ansarr => {
        var box = document.createElement("div")
        box.textContent=ansarr
        box.classList.add("opt");
        box.addEventListener("click", () => selectedanswer(ansarr,box));
        option.appendChild(box)
    });
    document.getElementById('next-btn').disabled = count === questions.length-1;
    document.getElementById('previous-btn').disabled = count === 0;
    document.getElementById('submit-btn').style.display =  count === questions.length-1 ? 'block' : 'none'
   
}

function selectedanswer(ans,box){
    if (ans === questions[count].crt) {
        userans[count] = 1
    }else{
        userans[count] = 0
    }
    let opt = document.querySelectorAll('.opt')
    opt.forEach(option => {
        option.classList.remove("selected");
      });

      box.classList.add("selected")
      

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

let submitquiz = () => {
    document.querySelector('#cont').innerHTML = ""
    let mark = document.getElementById('mark');
    let status = document.getElementById('status')

    let tot_mark = totmark()

    mark.textContent = tot_mark

    if(tot_mark <= 2)
        status.textContent = "keep Practising"
    else if(tot_mark == 3)
        status.textContent = "Good"
    else if(tot_mark == 4)
        status.textContent = "Very Good"
    else
        status.textContent = "Excellent"

}

totmark = ()=>{
    let c = 0
    for(let i of userans){
        if(i == 1) c++
    }
    return c
}

loadquestion()