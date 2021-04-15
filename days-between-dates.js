const refs = {
  form: document.querySelector('form'),
  startDate: document.querySelector('#start-date'),
  endDate: document.querySelector('#end-date'),
  submitBtn: document.querySelector('.count-btn'),
  allDays: document.querySelector('.all-days'),
  resultMore: document.querySelector('.result-more'),
};

const startDate = localStorage.getItem('startDate');
const endDate = localStorage.getItem('endDate');

if (startDate && endDate) {
  refs.startDate.value = startDate;
  refs.endDate.value = endDate;
  onSubmit();
}

refs.form.onsubmit = event => {
  event.preventDefault();
  onSubmit();
};

function onSubmit() {
  //todo 1. Отображение allDays

  //* Не понадобились
  // const daysIn4Years = 1461; // 365 * 3 + 366
  // const avarageDaysInYear = daysIn4Years / 4; // 365.25
  // const avarageDaysInMonth = daysIn4Years / (4 * 12); // 30.4375

  const unix1Day = 24 * 60 * 60 * 1000; // 86 400 000 (ms)

  // Date.parse() реобразовывает дату из формата YYYY-MM-DD в число формата unix
  const unixStartDate = Date.parse(refs.startDate.value);
  const unixEndDate = Date.parse(refs.endDate.value);
  const unixDifference = unixEndDate - unixStartDate;

  if (unixDifference < 0) {
    refs.resultMore.innerHTML = `<span class="error">Ошибка! Начальная дата больше конечной.</span>`;
    return;
  }

  const allDays = unixDifference / unix1Day;

  refs.allDays.innerHTML = allDays;

  //todo 2. Отображение years, months, days

  localStorage.setItem('startDate', refs.startDate.value);
  localStorage.setItem('endDate', refs.endDate.value);

  const startDateArr = refs.startDate.value.split('-').map(el => Number(el));
  const endDateArr = refs.endDate.value.split('-').map(el => Number(el));

  let days = 0;
  let months = 0;
  let years = 0;

  function daysInMonth(month, year) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      return 31;
    }
    if ([4, 6, 9, 11].includes(month)) {
      return 30;
    }
    if (month === 2 && year % 4 === 0) {
      return 29;
    }
    if (month === 2 && year % 4 !== 0) {
      return 28;
    }
  }

  if (endDateArr[2] >= startDateArr[2]) {
    days = endDateArr[2] - startDateArr[2];

    if (endDateArr[1] >= startDateArr[1]) {
      months = endDateArr[1] - startDateArr[1];

      years = endDateArr[0] - startDateArr[0];
    } else {
      months = endDateArr[1] + 12 - startDateArr[1];

      years = endDateArr[0] - 1 - startDateArr[0];
    }
  } else {
    days = endDateArr[2] + daysInMonth(startDateArr[1], startDateArr[0]) - startDateArr[2];

    if (endDateArr[1] - 1 >= startDateArr[1]) {
      months = endDateArr[1] - 1 - startDateArr[1];

      years = endDateArr[0] - startDateArr[0];
    } else {
      months = endDateArr[1] - 1 + 12 - startDateArr[1];

      years = endDateArr[0] - 1 - startDateArr[0];
    }
  }

  if (years === 0 && months === 0) {
    days = allDays;
  }

  refs.resultMore.innerHTML = `(или <span class="years">${years}</span> лет, <span class="months">${months}</span> месяцев и <span class="days">${days}</span> дней)`;
}
