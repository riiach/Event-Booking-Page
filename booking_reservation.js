const currentDate = document.querySelector('.current-date'),
      daysTag = document.querySelector('.days'),
      prevNextIcon = document.querySelectorAll('.months span'),
      timeTag = document.querySelector('.times'),
      dateLabel = document.querySelector('.date-label'),
      timeLabel = document.querySelector('.time-label'),
      totalHours = document.querySelector('.total-hours'),
      priceLabel = document.querySelector('.price-label'),
      countryCodeSel = document.getElementById('country-code');


//getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

console.log(currYear, currMonth);


// datas
const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
      months = ["January", "Feburary", "March", "April", "May", "June", "July", 
                "August", "Septemeber", "October", "Novemeber", "Decemeber"],
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let booked = [
  { id: "1", year: 2025, month: 9, date: 28, time: ["10:00", "11:00"], firstName: "Ria" },
  { id: "2", year: 2025, month: 9, date: 28, time: ["10:00"], firstName: "Bob" },
  { id: "3", year: 2025, month: 9, date: 29, time: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"], firstName: "Alice" },
  { id: "4", year: 2025, month: 9, date: 29, time: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"], firstName: "Sophia "} 
];

let time = [];


// returns array of reservations that match the date
function getReservationsForDate(year, month, day) {
  return booked.filter(r => Number(r.year) === Number(year) &&
                            Number(r.month) === Number(month) &&
                            Number(r.date) === Number(day));
}


// returns array of reservations that match the date
function getReservationsForDate(year, month, day) {
  return booked.filter(r => Number(r.year) === Number(year) &&
                            Number(r.month) === Number(month) &&
                            Number(r.date) === Number(day));
}


// returns new Set for reserved time set
function getReservedTimeSet(year, month, day) {
  const res = getReservationsForDate(year, month, day);
  const reservedTime = new Set();
  res.forEach(r => {
    if (Array.isArray(r.time)) { // check if r.time is an array - no string or no empty array
      r.time.forEach( // loops through each time slot
        t => reservedTime.add(t)); // add each booked time into a Set
    }
  });
  return reservedTime;
}


// true if every slot in timeSlots is reserved for the date
function isFullyBooked(year, month, day) {
  const reservedSet = getReservedTimeSet(year, month, day);
  return reservedSet.size >= timeSlots.length;
}


// returns array of available times (timeSlots minus reserved)
function getAvailableTimes(year, month, day) {
  const reservedSet = getReservedTimeSet(year, month, day);
  return timeSlots.filter(t => !reservedSet.has(t));
}


const isPassed = (year, month, day) => {
    const today = new Date(); // current date
    const compareDate = new Date(year, month, day);

    if (compareDate.toDateString() === today.toDateString()) {
        return 'today';
    } else if (compareDate < today) {
        return 'passed';
    } else {
        return ''; // future date
    }
}

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(), //getting first date of month;
    lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(), //getting last date of month;
    lastDayOfMonth = new Date(currYear, currMonth + 1, lastDateOfMonth).getDay(), //getting last day of month;
    lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(), //getting last date of previous month;
    liTag = '';

    for (let i = firstDayOfMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday = (i === date.getDate() && currMonth === new Date().getMonth()
                    && currYear === new Date().getFullYear()) ? "active" : "";

    let fully = isFullyBooked(currYear, currMonth, i);

    let reservedSet = getReservedTimeSet(currYear, currMonth, i);

    let partly = (!fully && reservedSet.size > 0); // some times taken

    let bookedClass = fully ? "inactive" : "";           // fully booked -> inactive (cannot book)

    let partialClass = partly ? "partly-booked" : "";    // partial -> visual indicator

    let passedClass = isPassed(currYear, currMonth, i) === "passed" ? "inactive" : "";

    liTag += `<li class="${isToday} ${bookedClass} ${partialClass} ${passedClass}" data-date="${i}">${i}</li>`;
    }


    for (let i = lastDayOfMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach((icon) => {
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth); 
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else { // else pass new Date as date value
            date = new Date();
        }
        renderCalendar();
    });
});


function renderTime(selectedYear, selectedMonth, selectedDate) {
  // get all booked times for this specific date
  const reservations = getReservationsForDate(selectedYear, selectedMonth, selectedDate);
    
  // collect booked times in a Set for fast lookup
  const bookedTimes = new Set();
  reservations.forEach(r => {
    if (Array.isArray(r.time)) {
      r.time.forEach(t => bookedTimes.add(t));
    } else {
      bookedTimes.add(r.time);
    }
  });

  console.log(bookedTimes);

  // build time slots
  let liTag = '';
  for (const str of timeSlots) {
    const isBooked = bookedTimes.has(str);
    console.log(isBooked);
    liTag += `<li class="timeline ${isBooked ? "booked" : ""}" data-time="${str}">${str} </li>`;
  }

  timeTag.innerHTML = liTag;
};

function formatTimeRanges(times) {
  const sorted = times.slice().sort((a, b) => parseInt(a.replace(':','')) - parseInt(b.replace(':','')));
  const result = [];
  let start = sorted[0];

  for (let i = 1; i <= sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];

    if (!curr || parseInt(curr.replace(':','')) !== parseInt(prev.replace(':','')) + 100) {
      // end range
      result.push(start === prev ? start : `${start} - ${prev}`);
      start = curr;
    }
  }

  return result.join(', ');
};

function renderCountryCode () {
  countryPhoneCodes.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.code;
    option.textContent = `${country.code} ${country.name}`;
    countryCodeSel.appendChild(option);
  })
};
renderCountryCode();


daysTag.addEventListener("click", (e) => { // adding click event on days list elements
    if (e.target.tagName === "LI" && !e.target.classList.contains("booked")) { // if the list element is clicked and is not booked already
        document.querySelectorAll('.days li').forEach(li => li.classList.remove("clicked")); // remove 'clicked from all days
        
        e.target.classList.add("clicked"); // add 'clicked' to the one that was clicked
        
        let dateNum = Number(e.target.textContent.trim()), // get the clicked date
            dayNum = new Date(currYear, currMonth, dateNum).getDay(); // get the clicked day
        console.log(dateNum, dayNum);

        dateLabel.textContent = `${currMonth + 1} . ${dateNum} ${days[dayNum]}`;
        renderTime(currYear, currMonth, dateNum);
    }
});

timeTag.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("clicked");
    const selectedTime = e.target.textContent;

    if (e.target.classList.contains("clicked")) {
      if (!time.includes(selectedTime)) time.push(selectedTime);
    } else {
      time = time.filter(t => t !== selectedTime);
    }

    timeLabel.textContent = time.length ? formatTimeRanges(time) : "";
    console.log(time);
  }

  if (time.length === 0) {
    totalHours.textContent = '';
    priceLabel.textContent = '';
  } else {
      let hoursInNum = [];
      hoursInNum = time.map((t) => parseInt(t.split(':')[0])); // get only the first two numbers of time in result and turn it into an integer
      totalHours.textContent = ` (${hoursInNum.length}h)`;
      priceLabel.textContent = `Total: $${hoursInNum.length * 120}($120 / h)`
  }
});

