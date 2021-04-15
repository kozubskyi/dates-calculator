const refs = {
  form: document.querySelector('form'),
  startDate: document.querySelector('#start-date'),
  endDate: document.querySelector('#end-date'),
  submitBtn: document.querySelector('.count-btn'),
  allDays: document.querySelector('.all-days'),
  resultMore: document.querySelector('.result-more'),
};

refs.form.onsubmit = event => {
  event.preventDefault();

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

  const startDateArr = refs.startDate.value.split('-').map(el => Number(el)); // [2020, 3, 13]
  const endDateArr = refs.endDate.value.split('-').map(el => Number(el)); // [2021, 4, 15]

  let days = 0;
  let months = 0;
  let years = 0;

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
    days = endDateArr[2] + 31 - startDateArr[2];

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
};
