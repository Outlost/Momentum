const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  weatherIcon = document.querySelector('.weather-icon');
  temperature = document.querySelector('.temperature');
  weatherDescription = document.querySelector('.weather-description');
  city = document.querySelector('.city');

const showAmPm = true;

function showTime() {
  let today = new Date(),
  hour = today.getHours(),
  min = today.getMinutes(),
  sec = today.getSeconds();
  weekday = today.getDay();
  dd = today.getDate();
  mm = today.getMonth();
  
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  date.innerHTML = `${getWeekDay(weekday)}<span> </span>${dd}<span> </span>${monthNames(mm)}`;
  
  setTimeout(showTime, 1000);
  }

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getWeekDay(n) {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return days[n];
  }
  
  function monthNames(n) {
  let mName = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  
  return mName[n];
  }

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
    
  if (hour > 6 && hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url(assets/images/morning/03.jpg)";
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'white';
  } 
  else if (hour > 12 && hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url(assets/images/afternoon/04.jpg)";
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } 
  else if (hour > 18 && hour < 24){
    // Evening
    document.body.style.backgroundImage = "url(assets/images/evening/07.jpg)";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
  else {
    // Night
    document.body.style.backgroundImage = "url(assets/images/night/02.jpg)";
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
    }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=28697744773ffdbc678c91f08c1e4509&units=metric`;  
  const res = await fetch(url);
  const data = await res.json(); 

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

/*
//Night
const base = 'assets/images/night/';
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg','06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg'];
let i = 0;

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}
function getImage() {
  const index = i % images.length;
  const imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
} 
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);

/////////////////////////////////////////////////////////////////////////
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
*/


showTime();
setBgGreet();
getName();
getFocus();
getWeather();