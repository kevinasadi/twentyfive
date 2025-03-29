document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("buyhistory-container");
    const buyHistory = JSON.parse(localStorage.getItem("buyHistory")) || [];
  
    if (buyHistory.length === 0) {
      container.innerHTML = "<p>Inga köp hittades.</p>";
      return;
    }
  
    container.innerHTML = "";
    buyHistory.forEach(purchase => {
      const div = document.createElement("div");
      div.className = "purchase-item";
      div.innerHTML = `
        <img src="${purchase.car.image}" alt="${purchase.car.name}">
        <div class="text-container">
          <div class="description"><em>${purchase.car.name}</em></div>
          <div class="image-description"><em>Pris: ${purchase.car.price}</em></div>
          <div class="image-description"><em>Köpt: ${purchase.date}</em></div>
        </div>
      `;
      container.appendChild(div);
    });
  });
  