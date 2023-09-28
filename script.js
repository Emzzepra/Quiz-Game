//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const rules_box = document.querySelector(".rules_box");
const exit_btn = rules_box.querySelector(".buttons .exit");
const continue_btn = rules_box.querySelector(".buttons .start");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".options");

//If Start Quiz Button Clicked
start_btn.onclick = () => {
  rules_box.classList.add("activeRules"); //shows the instructions box
};

//If Exit Button Clicked
exit_btn.onclick = () => {
  rules_box.classList.remove("activeRules"); //hides the instructions box
};

//If Continue Button Clicked
continue_btn.onclick = () => {
  rules_box.classList.remove("activeRules"); //hides the instructions box
  quiz_box.classList.add("activeQuiz"); //shows the quiz box
  showQuestions(0);
  startTimer(15);
  startTimerLine(0);
};

let que_count = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".nxt_que button");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  let que_count = 0;
  let timeValue = 15;
  let widthValue = 0;
  let userScore = 0;
  showQuestions(que_count);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  next_btn.style.display = "none";
  timeOff.textContent = "Time Left";
};

quit_quiz.onclick = () => {
  window.location.reload();
};

//If Next Button is Clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Questions completed");
    showResultBox();
  }
};

//getting questions and options from array

function showQuestions(index) {
  const que_text = document.querySelector(".txt_que");
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<li class="option_list"><input type="radio" id="shark" name="animal" value="Shark" /><label for="shark">' +
    questions[index].options[0] +
    "</label><br /></li>" +
    '<li class="option_list"> <input type="radio" id="blue whale" name="animal" value="Blue Whale" /><label for="blue whale">' +
    questions[index].options[1] +
    "</label><br /></li>" +
    '<li class="option_list"> <input type="radio" id="elephant" name="animal" value="Elephant /><label for="elephant">' +
    questions[index].options[2] +
    "</label><br /></li>" +
    '<li class="option_list"> <input type="radio" id="giraffe" name="animal" value="Giraffe" /><label for="giraffe">' +
    questions[index].options[3] +
    "</label><br /></li>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option_list");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is Correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is Wrong");

    //if answer is wrong then automatically select the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
      }
    }
  }

  //once user selected disabled all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "flex";
}

function showResultBox() {
  rules_box.classList.remove("activeRules"); //hides the instructions box
  quiz_box.classList.remove("activeQuiz"); //hides the quiz box
  result_box.classList.add("activeResult"); //shows the result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 7) {
    let scoreTag =
      "<p>and congrats!, You got  <span>" +
      userScore +
      "</span> out of <span>10</span> </p>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 5) {
    let scoreTag =
      "<p>and nice, You got  <span>" +
      userScore +
      "</span> out of <span>10</span> </p>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<p>and sorry, You got only  <span>" +
      userScore +
      "</span> out of <span>10</span> </p>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Up";

      let correctAns = questions[que_count].answer;
      let allOptions = option_list.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].setAttribute("class", "option correct");
        }
      }
      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "flex";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 25);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 690) {
      clearInterval(counterLine);
    }
  }
}
