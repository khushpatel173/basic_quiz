const start_div = document.querySelector(".starting-screen");
const start_btn = document.querySelector("#start-button");
const que_div = document.querySelector(".que-screen");
const que_heading = document.querySelector("#que-heading");
const opt1 = document.querySelector(".opt1");
const opt2 = document.querySelector(".opt2");
const opt3 = document.querySelector(".opt3");
const opt4 = document.querySelector(".opt4");
const queidx = document.querySelector("#question-index");
const scoreidx = document.querySelector("#score-index");
const options = document.querySelectorAll(".option");
const result_div = document.querySelector(".result-screen");
const final_score = document.querySelector("#final-score");
const remarks = document.querySelector("#remarks");
const restart_btn = document.querySelector(".restart-button");
const inner_bar = document.querySelector(".inner-bar");
let queno = 1;
let score = 0;
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];
start_screen();
function start_screen(){
    // remove screen class from starting div

    start_div.classList.remove("screen");
    start_btn.addEventListener("click" , ()=>
{
// add class in the start div and remove from the question div
start_div.classList.add("screen");
que_div.classList.remove("screen");
question(score, queno);
// user input then go to the next question
for(option of options)
{
option.addEventListener("click" , (event)=>{
    // check if correct or incorrect then go to the next question
//    check if option.target no text == the true one in that que or not
let is = false;
for(let i = 0; i < 4; i++)
{
    if(quizQuestions[queno-1].answers[i].text == event.target.innerText && quizQuestions[queno-1].answers[i].correct == true)
    {
        is = true;
        break;
    }
}
if(is)
{
    score = score + 1;
    // change the color of event.target to green 
    event.target.style.backgroundColor = "rgba(161, 255, 158)";
    setTimeout(()=>{
        event.target.style.backgroundColor = "rgba(248, 240, 229)";
        queno = queno + 1;
        question(score, queno);
    },1000)
}
else{
    // put the selected color red and the correct one green
    let f= 0;
    for(f = 0; f < 4; f++)
    {
        if(quizQuestions[queno-1].answers[f].correct == true)
        {
            break;
        }
    }
    let correctopt = document.querySelector(`.opt${f+1}`);
    // change its color to green
    correctopt.style.backgroundColor = "rgba(161, 255, 158)";
    event.target.style.backgroundColor = "rgb(255, 105, 105)";
    setTimeout(()=>{
        event.target.style.backgroundColor = "rgba(248, 240, 229)";
        correctopt.style.backgroundColor = "rgba(248, 240, 229)";
        queno = queno + 1;
        question(score, queno);
    },1000)
}
})
}

})

}
function question(score , queno)
{
  let percent = (queno-1)*20;
  // change the width of the bar to percent
  inner_bar.style.width = `${percent}%`;
    if(queno ==6)
    {
result(score);
    }
    //change the question text to the queno which you are in
    que_heading.innerText = quizQuestions[queno-1].question;
    // change the options
    opt1.innerText = quizQuestions[queno-1].answers[0].text;
    opt2.innerText = quizQuestions[queno-1].answers[1].text;
    opt3.innerText = quizQuestions[queno-1].answers[2].text;
    opt4.innerText = quizQuestions[queno-1].answers[3].text;
    queidx.innerText = `Question ${queno} of 5`;
     scoreidx.innerText = `Score : ${score}`;
}
function result(score)
{
que_div.classList.add("screen");
result_div.classList.remove("screen");
final_score.innerText = `You scored ${score} out of 5`;

if (score == 5) {
    remarks.innerText = "Perfect! You're a genius!";
  } else if (score >= 4) {
    remarks.innerText = "Great job! You know your stuff!";
  } else if (score >= 3) {
    remarks.innerText = "Good effort! Keep learning!";
  } else if (score >=2 ) {
    remarks.innerText = "Not bad! Try again to improve!";
  } else {
    remarks.innerText = "Keep studying! You'll get better!";
  }
  restart_btn.addEventListener("click" , ()=>{
    score = 0;
    queno = 1;
    // remove and add the class
    result_div.classList.add("screen");
    que_div.classList.remove("screen");
    question(score , queno);
  })
}