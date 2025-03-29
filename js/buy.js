document.addEventListener("DOMContentLoaded", function() {
    const buyContainer = document.getElementById("buy-container");
    if (!buyContainer) return;
    
    const carData = sessionStorage.getItem("selectedCar");
    if (!carData) {
      buyContainer.innerHTML = '<p>Du måste välja en bil först.</p>';
    } else {
      const car = JSON.parse(carData);
      buyContainer.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="buy-image">
        <div class="text-container">
          <div class="description"><em>Köp ${car.name}</em></div>
          <div class="image-description"><em>Pris: ${car.price}</em></div>
        </div>
        <div class="column-footer">
          <button class="buy-button" id="confirm-button">Bekräfta köp</button>
        </div>
      `;
      
      const confirmButton = document.getElementById("confirm-button");
      confirmButton.addEventListener("click", function() {
        buyContainer.classList.add("animate-out");
        setTimeout(() => {
          buyContainer.innerHTML = `
            <h2 class="payment-header">Dags att betala hahahaha</h2>
            <form class="payment-form" id="payment-form">
              <input type="text" placeholder="Kortnummer" required>
              <input type="text" placeholder="Utgångsdatum (MM/YY)" required>
              <input type="text" placeholder="CVV" required>
              <button type="submit">Skicka betalning</button>
            </form>
          `;
          buyContainer.classList.remove("animate-out");
          const paymentForm = document.getElementById("payment-form");
          paymentForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const purchase = {
              car: car,
              date: new Date().toLocaleString()
            };
            const buyHistory = JSON.parse(localStorage.getItem("buyHistory")) || [];
            buyHistory.push(purchase);
            localStorage.setItem("buyHistory", JSON.stringify(buyHistory));
            alert("Tack för ditt köp!");
          });
        }, 500);
      });
    }
  });
  