const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}

quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}

function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
  info_box.classList.remove("activeInfo"); 
  quiz_box.classList.remove("activeQuiz"); 
  result_box.classList.add("activeResult"); 
  const scoreText = result_box.querySelector(".score_text");
  if (userScore >= 5){ 
      let scoreTag = '<span> Congrats! ,You passed, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;  
  }
  else if(userScore <= 4){ 
      let scoreTag = '<span> Gettat!! You Suck!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
  }
  else{ 
      let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
  }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}

let questions = [
  {
  numb: 1,
  question: "Which of the following is a vector quantity?",
  answer: "Momentum",
  options: [
    "Momentum",
    "Speed",
    "Time",
    "Speed"
  ]
},
  {
  numb: 2,
  question: "If a constant force of 16N acts on a body of 4kg for 2 seconds, what change in the velocity would be produced on the body?",
  answer: "8.0m/s",
  options: [
    "0.5m/s",
    "2.0m/s",
    "8.0m/s",
    "32.0m/s"
  ]
},
  {
  numb: 3,
  question: "Which of the following has the same unit as a force?",
  answer: "Force",
  options: [
    "Work",
    "Force",
    "Power",
    "Momentum"
  ]
},
  {
  numb: 4,
  question: "Which of the following colour of surface will radiate heat energy best?",
  answer: "Black",
  options: [
    "White",
    "Red",
    "Black",
    "Blue",
  ]
},
  {
  numb: 5,
  question: "Increase in the pressure of water",
  answer: "Lowers the melting point",
  options: [
    "Increases the melting point",
    "Lowers the melting point",
    "Has no effect on the melting point",
    "Has no effect on the boiling point",
  ]
},
  {
  numb: 6,
  question: "Which of the following radiation have the highest frequency?",
  answer: "X-rays",
  options: [
    "Radio waves",
    "Light waves",
    "X-rays",
    "Infra-red rays",
  ]
},
  {
  numb: 7,
  question: "An object is placed in front of a converging lens of focal lenght 10cm and the image is real and twice the size of the object. How far is the object from the lens?",
  answer: "15cm",
  options: [
    "5cm",
    "10cm",
    "15cm",
    "20cm",
  ]
},
  {
  numb: 8,
  question: "Calculate the frequency of a wave of wavellength 300m if the velocity of the wave is 3 x 10^8 m/s.",
  answer: "1 MHz",
  options: [
    "1 MHz",
    "9 MHz",
    "100 MHz",
    "900 MHz",
  ]
},
  {
  numb: 9,
  question: "Which of the following radiation have the highest frequency?",
  answer: "X-rays",
  options: [
    "Radio waves",
    "X-rays",
    "Light waves",
    "Ultraviolet rays"
  ]
},
  {
  numb: 10,
  question: "How far from a wall should a boy stand in order to hear thee echo of his clap 0.9s later?",
  answer: "148.5m",
  options: [
    "36.7m",
    "74.2m",
    "297.0m",
    "148.5m"
  ]
},

];