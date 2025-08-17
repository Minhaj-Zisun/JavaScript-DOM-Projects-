const monthName = document.querySelector('.month-name');

const dayName = document.querySelector('.day-name');

const dayNum = document.querySelector('.day-num');

const year = document.querySelector('.year');

const time = document.querySelector('.time');

const date = new Date();

monthName.innerHTML = date.toLocaleDateString('en',{
    month: 'long'
});

dayName.innerHTML = date.toLocaleDateString('en',{
    weekday: 'long'
});

dayNum.innerHTML = date.getDate()

 setInterval(() => {
    const date = new Date();
      time.textContent =
        date.toLocaleTimeString('en-US',{hour12: true});
    }, 1000);
year.innerHTML = date.getFullYear();





