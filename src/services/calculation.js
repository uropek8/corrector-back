const amounCalculate = (lang, length, type = false) => {
  const ratioFileType = 1.2;
  let amount = 0;

  if (lang === 'ru' || lang === 'uk') {
    amount = length * 0.05 > 50 ? length * 0.05 : 50;
  } else {
    amount = length * 0.12 > 120 ? length * 0.12 : 120;
  }

  return type ? Number(amount.toFixed(2)) : Number((amount * ratioFileType).toFixed(2));
};

const deadlineDurationCalculate = (lang, length) => {
  const fixedTime = 1800;
  const engFormula = (length / 333) * 3600;
  const cyrFormula = (length / 1333) * 3600;
  let time = 0;

  if (lang === 'ru' || lang === 'uk') {
    time = cyrFormula < 1800 ? 1800 : cyrFormula;
  } else {
    time = engFormula < 1800 ? 1800 : engFormula;
  }

  time = (time + fixedTime) / 60;

  return Number(time.toFixed());
};

const deadlineDateCalculate = (date, deadline) => {
  let orderDate = new Date(date);
  const openingDays = [1, 2, 3, 4, 5];
  const startWorkHour = 10;

  for (let i = 0; i < deadline; i++) {
    if (openingDays.includes(orderDate.getDay())) {
      if (!checkIsWorkTime(orderDate.getHours())) {
        if (orderDate.getHours() > startWorkHour) {
          orderDate.setDate(orderDate.getDate() + 1);

          while (!openingDays.includes(orderDate.getDay())) {
            orderDate.setDate(orderDate.getDate() + 1);
          }
        }

        orderDate.setHours(startWorkHour);
        orderDate.setMinutes(0);
      }
    } else {
      orderDate.setDate(orderDate.getDate() + 1);

      while (!openingDays.includes(orderDate.getDay())) {
        orderDate.setDate(orderDate.getDate() + 1);
      }

      orderDate.setHours(startWorkHour);
      orderDate.setMinutes(0);
    }

    orderDate.setMinutes(orderDate.getMinutes() + 1);
  }

  return orderDate;
};

const checkIsWorkTime = (hours) => {
  const startWorkHour = 10;
  const endWorkHour = 19;

  return hours >= startWorkHour && hours < endWorkHour ? true : false;
};

module.exports = {
  amounCalculate,
  deadlineDurationCalculate,
  deadlineDateCalculate,
};
