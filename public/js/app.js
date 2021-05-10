console.log('Client side javascript is loading!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const m1 = document.querySelector('#one');
const m2 = document.querySelector('#two');

m1.textContent = 'Loading..';
m2.textContent = '';
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        m1.textContent = data.error;
      } else {
        m1.textContent = data.location;
        m2.textContent = data.forcast;
      }
    });
  });
});
