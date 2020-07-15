import "./styles.css";
const container = document.querySelector(".calendar");
const thisMonthView = document.querySelector(".thisMonth");
const prevMonthBtn = document.querySelector("#prevMonth");
const nextMonthBtn = document.querySelector("#nextMonth");

//default date
const defaultDate = new Date();

//현재 일
let thisDate = new Date();

const printCalender = () => {
  //이번달의 마지막 날
  const lastDate = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 0);

  //이번달의 첫번째 일의 요일
  const thisMonthFirstDate = new Date(
    thisDate.getFullYear(),
    thisDate.getMonth(),
    1
  );
  //이전달
  const prevMonth = new Date(thisDate.getFullYear(), thisDate.getMonth(), 0);

  //다음달
  const nextMonth = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1);

  let days = 1; //일 수
  let prevMonthDate = prevMonth.getDate() - thisMonthFirstDate.getDay() + 1; //이전달
  let nextMonthDate = nextMonth.getDate(); //다음달
  let thisMonthNum = thisDate.getMonth() + 1; //이번달 값
  let thisYearNum = thisDate.getFullYear(); // 이번년도

  //이번년, 월 을 반환
  thisMonthView.innerText = `${thisYearNum} . ${thisMonthNum}`;

  //6개의 주를 출력
  for (let i = 0; i < 6; i++) {
    container.innerHTML += "<div class='week'></div>";
  }

  //각 주를 변수로
  const week = document.querySelectorAll(".week");

  for (let w = 0; w < week.length; w++) {
    //첫 주일경우
    if (w === 0) {
      for (let d = 0; d < 7; d++) {
        //생성하는 칸이 이번달 1일의 요일보다 클 경우 정상적으로 1일부터 출력
        if (d >= thisMonthFirstDate.getDay()) {
          if (
            defaultDate.getMonth() === thisDate.getMonth() &&
            days === defaultDate.getDate()
          ) {
            week[
              w
            ].innerHTML += `<div class='day today' data=${days}>${days}</div>`;
          } else {
            week[w].innerHTML += `<div class='day' data=${days}>${days}</div>`;
          }
          if (days < lastDate.getDate()) {
            days++;
          }

          //생성하는 칸이 이번달 1일의 요일보다 작을경우 이전달을 출력
        } else {
          week[w].innerHTML += `<div class='prevDate'>${prevMonthDate}</div>`;
          prevMonthDate++;
        }
      }
      //첫주가 아닌경우
    } else {
      for (let d = 0; d < 7; d++) {
        //일수가 요번달 마지막일보다 작거나 같을경우 일수를 늘려감
        if (days <= lastDate.getDate()) {
          if (
            defaultDate.getMonth() === thisDate.getMonth() &&
            days === defaultDate.getDate()
          ) {
            week[
              w
            ].innerHTML += `<div class='day today' data=${days}>${days}</div>`;
          } else {
            week[w].innerHTML += `<div class='day' data=${days}>${days}</div>`;
          }

          if (days <= lastDate.getDate()) {
            days++;
          }

          //일수가 요번달 마지막을 넘어서면 다음달을 출력
        } else {
          week[w].innerHTML += `<div class='nextDate'>${nextMonthDate}</div>`;
          nextMonthDate++;
        }
      }
    }
  }
};
printCalender();

nextMonthBtn.addEventListener("click", () => {
  container.innerHTML = "";

  thisDate = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1);
  printCalender();
});

prevMonthBtn.addEventListener("click", () => {
  container.innerHTML = "";
  thisDate = new Date(thisDate.getFullYear(), thisDate.getMonth() - 1);
  printCalender();
});

const day = document.querySelectorAll(".day");

let idx = false;
let selectArray = [];

for (var i = 0; i < day.length; i++) {
  day[i].addEventListener("mousedown", e => {
    for (var i = 0; i < day.length; i++) {
      day[i].classList.remove("highLight");
    }
    selectArray = [];
    idx = true;
    const selectedFirstDate = e.target.getAttribute("data");
    selectArray.push(Number(selectedFirstDate));
  });
  day[i].addEventListener("mouseup", e => {
    idx = false;
    const selectedLastDate = e.target.getAttribute("data");
    selectArray.push(Number(selectedLastDate));
    selectArray.sort((a, b) => a - b);
    paintDate(selectArray[0], selectArray[1]);
  });
}

const paintDate = (start, end) => {
  for (let idx = start - 1; idx < end; idx++) {
    day[idx].classList.add("highLight");
  }
};
