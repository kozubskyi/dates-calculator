const refs = {
  form: document.querySelector('form'),
  startDate: document.querySelector('#start-date'),
  endDate: document.querySelector('#end-date'),
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
  localStorage.setItem('startDate', refs.startDate.value);
  localStorage.setItem('endDate', refs.endDate.value);
  onSubmit();
};

function onSubmit() {
  //todo 1. Отображение allDays

  // Date.parse() реобразовывает дату из формата YYYY-MM-DD в число формата unix
  const unixStartDate = Date.parse(refs.startDate.value);
  const unixEndDate = Date.parse(refs.endDate.value);
  const unixDifference = unixEndDate - unixStartDate;

  if (unixDifference < 0) {
    refs.resultMore.innerHTML = `<span class="error">Ошибка! Начальная дата больше конечной.</span>`;
    return;
  }

  const allDays = Math.round(unixDifference / (24 * 60 * 60 * 1000));

  refs.allDays.innerHTML = allDays;

  //todo 2. Отображение years, months, days

  let days = 0;
  let months = 0;
  let years = 0;

  function daysInMonth(month, year) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
    if ([4, 6, 9, 11].includes(month)) return 30;
    if (month === 2 && year % 4 === 0) return 29;
    if (month === 2 && year % 4 !== 0) return 28;
  }

  const startDateArr = refs.startDate.value.split('-').map(el => Number(el));
  const endDateArr = refs.endDate.value.split('-').map(el => Number(el));

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

  if (years === 0 && months === 0) days = allDays;

  refs.resultMore.innerHTML = `(или <span class="years">${years}</span> лет, <span class="months">${months}</span> месяцев и <span class="days">${days}</span> дней)`;
}
