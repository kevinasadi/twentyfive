let slider = document.getElementById('myRange');
let output = document.getElementById('rangeValue');
const carGrid = document.getElementById('cargrid');

const cars = [
  { name: 'cybertruck', price: 200000, image: 'img/cybertruck.webp' },
  { name: 'model3', price: 150000, image: 'img/model3.webp' },
  { name: 'troc', price: 50000, image: 'img/troc.webp' },
  { name: 'v60', price: 15000, image: 'img/V60.webp' },
  { name: 'audiq6', price: 9000, image: 'img/audiq6.webp' }
];

function getRandomSundayTime() {
  let now = new Date();
  let target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4);
  let randomHour = Math.floor(Math.random() * 24);
  let randomMinute = Math.floor(Math.random() * 60);
  let randomSecond = Math.floor(Math.random() * 60);
  target.setHours(randomHour, randomMinute, randomSecond, 0);
  return target;
}

function startCountdown(timerElement, endTime) {
  function updateCountdown() {
    let now = new Date();
    let diff = endTime - now;
    if (diff < 0) {
      timerElement.innerHTML = "<em>Auktionen är slut!</em>";
      clearInterval(interval);
    } else {
      let hours = Math.floor(diff / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
      timerElement.innerHTML = `<em>Timer: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</em>`;
    }
  }
  updateCountdown();
  let interval = setInterval(updateCountdown, 1000);
}

function updateCarGrid() {
  const selectedPrice = parseInt(slider.value);
  output.textContent = selectedPrice;
  carGrid.innerHTML = '';

  cars
    .filter(car => car.price <= selectedPrice)
    .forEach(car => {
      const col = document.createElement('div');
      col.className = 'image-column';

      const img = document.createElement('img');
      img.src = car.image;
      img.alt = car.name;

      const textContainer = document.createElement('div');
      textContainer.className = 'text-container';

      const desc = document.createElement('div');
      desc.className = 'description';
      desc.innerHTML = `<em>${car.name}</em>`;

      const imgDesc = document.createElement('div');
      imgDesc.className = 'image-description';
      imgDesc.innerHTML = `<em>Price: ${car.price}</em>`;

      const imageDescription = document.createElement('div');
      imageDescription.className = 'image-description';
      imageDescription.innerHTML = `<em>Ett bra bil val är ${car.name} för studenter!</em>`;

      textContainer.appendChild(desc);
      textContainer.appendChild(imgDesc);
      textContainer.appendChild(imageDescription);

      const footer = document.createElement('div');
      footer.className = 'column-footer';

      const btn = document.createElement('button');
      btn.className = 'buy-button';
      btn.textContent = 'Köp';
      btn.onclick = () => {
        sessionStorage.setItem("selectedCar", JSON.stringify(car));
        location.href = 'buy.html';
      };

      const timerDiv = document.createElement('div');
      timerDiv.className = 'timer';
      let endTime = getRandomSundayTime();
      startCountdown(timerDiv, endTime);

      footer.appendChild(timerDiv);
      footer.appendChild(btn);
      col.appendChild(img);
      col.appendChild(textContainer);
      col.appendChild(footer);
      carGrid.appendChild(col);
    });
}

slider.addEventListener('input', updateCarGrid);
updateCarGrid();
